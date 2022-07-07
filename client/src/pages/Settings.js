import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIfSignedIn, signOut } from "../redux/user";
import styled from "styled-components";

const SettingsContainer = styled.div`
    margin: 3em auto;
    max-width: 600px;
`

const SignOut = styled.button`
    padding: 1em 2em;
    border: 2px solid black;
`

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSignedIn = useSelector(selectIfSignedIn);
    const handleSignOut = () => dispatch(signOut());
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn])
    return (
        <SettingsContainer>
            <p>(Imagine a bunch of awesome settings here)</p>
            <SignOut onClick={handleSignOut}>Sign out</SignOut>
        </SettingsContainer>
    )
}

export default Settings;