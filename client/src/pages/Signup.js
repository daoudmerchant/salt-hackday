import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectIfSignedIn, selectStatus,selectUser, selectError, resetError } from "../redux/user";

import { useNewUser } from "../hooks";

import FormRequirement from "../components/FormRequirement";

import styled from "styled-components";

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

const Validities = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-inline: 2em;
`

const Submit = styled.button`
    border: 2px solid blue;
    color: blue;
    font-size: 1.5em;
    padding: .5em 1.2em;
    margin-top: 1em;
    &:disabled {
        border-color: grey;
        color: grey;
    }
`

const validityCheck = {
    special: [true,"At least 1 special character"],
    number: [true, "At least 1 number"],
    uppercase: [true, "At least 1 uppercase letter"],
    min: [6, "At least 6 characters"]
}

const Signup = () => {
    const [userFromInput, updateUsername, updatePassword, updateConfirmedPassword, valid] = useNewUser(validityCheck);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signedIn = useSelector(selectIfSignedIn);
    const status = useSelector(selectStatus);
    const user = useSelector(selectUser);
    const error = useSelector(selectError);
    const canSubmit = Object.values(valid).every(([isValid]) => isValid) && status === "idle";
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createUser(userFromInput));
    }
    useEffect(() => {
        if (signedIn) {
            navigate("/")
        }
    }, [signedIn])
    useEffect(() => {
        if (error) {
            dispatch(resetError());
        }
    }, [JSON.stringify(user)])
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <p>Got an account already? <Link to="/form/login">Log in</Link></p>
            <Inputs>
                <Label>Username<Input type="text" value={userFromInput.username} onChange={updateUsername} maxLength={20} required/></Label>
                <Label>Password<Input type="password" value={userFromInput.password} onChange={updatePassword} required/></Label>
                <Label>Confirm password<Input type="password" value={userFromInput.confirmedPassword} onChange={updateConfirmedPassword}/></Label>
            </Inputs>
            <Validities>
                {Object.entries(valid).map(([key, [validity, message]]) => <FormRequirement key={key} valid={validity} message={message}/>)}
            </Validities>
            <Submit type="submit" disabled={!canSubmit}>{status === "loading" ? "Submitting" : "Submit"}</Submit>
        </Form>
    )
}

export default Signup;