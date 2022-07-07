import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux"
import { selectUser } from "../redux/user"

import SnippetCard from "../components/SnippetCard";

const UserContainer = styled.div`
    padding: 3em;
    max-width: 600px;
    margin-inline: auto;
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const New = styled(Link)`
    background-color: white;
    display: flex;
    align-items: center;
    height: min-content;
    padding: 1em 1.5em;
    border-radius: .5em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`

const Username = styled.h1`

`

const UserHome = () => {
    const user = useSelector(selectUser);
    return (
        <UserContainer>
            <HeaderContainer>
                <Username>{user.username}</Username>
                <New to="/snippets/new">+ New snippet</New>
            </HeaderContainer>
            {user.snippets.map(snippet => <SnippetCard key={snippet._id} snippet={snippet}/>)}
        </UserContainer>
    )
};

export default UserHome;