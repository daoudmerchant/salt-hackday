import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/user";

import { useNewUser } from "../hooks";

import FormRequirement from "../components/FormRequirement";

import styled from "styled-components";

const Form = styled.form`

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
    const canSubmit = Object.values(valid).every(Boolean);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createUser(userFromInput));
    }
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Create an account</h1>
            <label>Username:<input type="text" value={userFromInput.username} onChange={updateUsername} maxLength={20} required/></label>
            <label>Password:<input type="password" value={userFromInput.password} onChange={updatePassword} required/></label>
            <label>Confirm password:<input type="password" value={userFromInput.confirmedPassword} onChange={updateConfirmedPassword}/></label>
            {Object.entries(valid).map(([key, [validity, message]]) => <FormRequirement key={key} valid={validity} message={message}/>)}
            <button type="submit" disabled={!canSubmit}>Submit</button>
        </Form>
    )
}

export default Signup;