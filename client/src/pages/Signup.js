import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/user";

import { useNewUser } from "../hooks";

import FormRequirement from "../components/FormRequirement";

import styled from "styled-components";

const Form = styled.form`

`

const validityCheck = {
    special: true,
    number: true,
    uppercase: true,
    min: 6
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
            <label>Password:<input type="text" value={userFromInput.password} onChange={updatePassword} required/></label>
            <label>Confirm password:<input type="text" value={userFromInput.confirmedPassword} onChange={updateConfirmedPassword}/></label>
            {Object.entries(valid).map(([key, validity]) => <FormRequirement key={key} requirement={key} valid={validity}/>)}
            <button type="submit" disabled={!canSubmit}>Submit</button>
        </Form>
    )
}

export default Signup;