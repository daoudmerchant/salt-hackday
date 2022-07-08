import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
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
    margin: 0;
`

const SnippetContainer = styled.div`
    width: 80%;
    max-width: 400px;
    margin-block: 2em;
`

const SignUp = styled(Link)`
    border-bottom: 2px dotted black;
    padding: 0 .3em .2em;
    &:hover {
        color: darkblue;
    }
`

const LogIn = styled(Link)`
    background-color: #7dc0ff;
    color: white;
    font-size: 1.8em;
    border-radius: 5px;
    padding: .5em 1em;
`

const Invite = styled.p`
    margin-block: 2em;
`

const Scissors = () => <ScissorImg src={scissors} alt="scissor icon"/>

const Home = () => {
    const noPointer = useMediaQuery({query: "(pointer: coarse)"});
    const noCursor = useMediaQuery({query: "(hover: none)"});
    return (
        <Container>
            <Logo>S<Scissors/>ippets</Logo>
            <Subtitle>One-click copy text snippets</Subtitle>
            <SnippetContainer>
                <SnippetCard snippet={{text: `${noPointer && noCursor ? "Tap" : "Click"} here to copy this text`}} dummy={true}/>
            </SnippetContainer>
            <LogIn to="/form/login">Log in</LogIn>
            <Invite>No account? <SignUp to="/form/signup">Sign up</SignUp></Invite>
        </Container>
    )
}

export default Home;