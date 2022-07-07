import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { useUserDetails } from "../hooks";
import { selectStatus, selectIfSignedIn, selectError, loginUser, resetError } from "../redux/user";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-block: 2em;
`

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    margin-block: .5em;
`

const Input = styled.input`
    margin-left: 2em;
`

const Error = styled.p`
    height: 2em;
    color: red;
`

const Submit = styled.button`
    border: 2px solid blue;
    color: blue;
    font-size: 1.5em;
    padding: .5em 1.2em;
    margin-block: 1em;
    &:disabled {
        border-color: grey;
        color: grey;
    }
`

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSignedIn = useSelector(selectIfSignedIn);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const [user, updateUsername, updatePassword] = useUserDetails();
    const canSubmit = user.username && user.password.length >= 6 && status === "idle";
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(user));
    }
    useEffect(() => {
        if (isSignedIn) {
            navigate('/');
        }
    }, [isSignedIn])
    useEffect(() => {
        if (error) {
            dispatch(resetError());
        }
    }, [JSON.stringify(user)])
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <p>No account yet? <Link to="/form/signup">Sign up</Link></p>
            <Inputs>
                <Label>Username<Input type="text" value={user.username} onChange={updateUsername} maxLength={20} required/></Label>
                <Label>Password<Input type="password" value={user.password} onChange={updatePassword} required/></Label>
            </Inputs>
            <Error>{error}</Error>
            <Submit type="submit" disabled={!canSubmit}>{status === "loading" ? "Submitting" : "Submit"}</Submit>
        </Form>
    )
}

export default Login;