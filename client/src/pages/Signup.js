import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectIfSignedIn, selectStatus,selectUser, selectError, resetError } from "../redux/user";

import { useNewUser } from "../hooks";

import FormRequirement from "../components/FormRequirement";

import styled from "styled-components";

const Form = styled.form`
    display: grid;
    background-color: white;
    grid-template-columns: 1fr;
    @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
    align-items: center;
    padding-inline: 2em;
    padding-bottom: 2em;
`

const LoginLink = styled(Link)`
    border-bottom: 2px dotted black;
    padding: 0 .3em .2em;
    &:hover {
        color: darkblue;
    }
`

const Container = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BottomContainer = styled(Container)`
align-items: baseline;
@media (min-width: 600px) {
    flex-direction: row;
}
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-block: 2em;
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

const Validities = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-inline: auto;
    padding-inline: 2em;
    max-width: 300px;
`

const Submit = styled.button`
    border: 2px solid #3f96e8;
    background-color: #3f96e8;
    color: white;
    font-size: 1.8em;
    border-radius: 5px;
    padding: .5em 1.2em;
    margin-top: 1em;
    &:disabled {
        border-color: silver;
        background-color: transparent;
        color: silver;
    }
    @media (min-width: 600px) {
        margin-left: auto;
    }
`

const Error = styled.p`
    color: firebrick;
    background-color: #f7dada;
    border-left: 4px solid firebrick;
    padding: 1.3em 2em;
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
            <Container>
                <h1>Sign up</h1>
                <p>Got an account already? <LoginLink to="/form/login">Log in</LoginLink></p>
            </Container>
            <Inputs>
                <Label>Username<Input type="text" value={userFromInput.username} onChange={updateUsername} maxLength={20} required/></Label>
                <Label>Password<Input type="password" value={userFromInput.password} onChange={updatePassword} required/></Label>
                <Label>Confirm password<Input type="password" value={userFromInput.confirmedPassword} onChange={updateConfirmedPassword}/></Label>
            </Inputs>
            <Validities>
                <p>Your password must have:</p>
                {Object.entries(valid).map(([key, [validity, message]]) => <FormRequirement key={key} valid={validity} message={message}/>)}
            </Validities>
            <BottomContainer>
                {error ? <Error>{error}</Error> : <div/>}
                <Submit type="submit" disabled={!canSubmit}>{status === "loading" ? "Submitting" : "Submit"}</Submit>
            </BottomContainer>
        </Form>
    )
}

export default Signup;