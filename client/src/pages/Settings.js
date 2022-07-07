import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIfSignedIn, signOut } from "../redux/user";
import styled from "styled-components";

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    padding: 2em;
`

const Text = styled.p`
    margin: 0 0 2em;
    font-size: 1.2em;
`

const SignOut = styled.button`
    border: 2px solid #3f96e8;
    color: #3f96e8;
    font-size: 1.8em;
    border-radius: 5px;
    padding: .5em 1em;

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
            <Text>(Imagine a bunch of awesome settings here)</Text>
            <SignOut onClick={handleSignOut}>Sign out</SignOut>
        </SettingsContainer>
    )
}

export default Settings;