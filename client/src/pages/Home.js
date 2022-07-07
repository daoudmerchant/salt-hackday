import styled from "styled-components";
import { Link } from "react-router-dom";

import SnippetCard from "../components/SnippetCard";

import scissors from "../assets/scissor.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Logo = styled.h1`
    font-size: 4em;
    display: flex;
    align-items: center;
`

const ScissorImg = styled.img`
    transform: rotate(180deg);
    width: 1em;
    height: 1.7em;
    object-fit: cover;
`

const Subtitle = styled.h2`
    margin-top: 0;
`

const SnippetContainer = styled.div`
    width: 80%;
    max-width: 400px;
    margin-block: 2em;
`

const SignIn = styled(Link)`

`

const LogIn = styled(Link)`

`

const Invite = styled.p`

`

const Scissors = () => <ScissorImg src={scissors} alt="scissor icon"/>

const Home = () => {
    return (
        <Container>
            <Logo>S<Scissors/>ippets</Logo>
            <Subtitle>One-click copy text snippets</Subtitle>
            <SnippetContainer>
                <SnippetCard snippet={{text: "Click the button to copy this text ➜"}} dummy={true}/>
            </SnippetContainer>
            <SignIn to="/form/login">Log in</SignIn>
            <Invite>No account? <LogIn to="/form/signup">Sign up</LogIn></Invite>
        </Container>
    )
}

export default Home;