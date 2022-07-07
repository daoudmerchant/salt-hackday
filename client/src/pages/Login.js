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
    padding-inline: 2em;
    padding-bottom: 2em;
    background-color: white;
`

const SignupLink = styled(Link)`
    border-bottom: 2px dotted black;
    padding: 0 .3em .2em;
    &:hover {
        color: darkblue;
    }
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-block: 2em;
    width: 100%;
    max-width: 400px;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-block: .5em;
`

const Input = styled.input`
    font-size: 1.2em;
    padding: .7em 1.2em;
    margin-top: .2em;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px) {
        justify-content: space-between;
        flex-direction: row;
        align-items: baseline;
    }
`

const Error = styled.p`
    color: firebrick;
    background-color: #f7dada;
    border-left: 4px solid firebrick;
    padding: 1.3em 2em;
    margin-block: 0;
`

const Submit = styled.button`
    border: 2px solid #3f96e8;
    background-color: #3f96e8;
    color: white;
    font-size: 1.8em;
    border-radius: 5px;
    padding-block: .5em;
    width: 8em;
    margin-top: 1em;
    &:disabled {
        border-color: silver;
        background-color: transparent;
        color: silver;
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
            <p>No account yet? <SignupLink to="/form/signup">Sign up</SignupLink></p>
            <Inputs>
                <Label>Username<Input type="text" value={user.username} onChange={updateUsername} maxLength={20} required/></Label>
                <Label>Password<Input type="password" value={user.password} onChange={updatePassword} required/></Label>
            </Inputs>
            <Container>
                {error ? <Error>{error}</Error> : <div/>}
                <Submit type="submit" disabled={!canSubmit}>{status === "loading" ? "Submitting" : "Submit"}</Submit>
            </Container>
        </Form>
    )
}

export default Login;