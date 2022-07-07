import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux"
import { selectUser } from "../redux/user"

import SnippetCard from "../components/SnippetCard";

const UserContainer = styled.div`
    padding: 3em;
    max-width: 700px;
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
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
`

const UserHome = () => {
    const user = useSelector(selectUser);
    return (
        <UserContainer>
            <HeaderContainer>
                <h1>{user.username}</h1>
                <New to="/snippets/new">+ New snippet</New>
            </HeaderContainer>
            {user.snippets.map(snippet => <SnippetCard key={snippet._id} snippet={snippet}/>)}
        </UserContainer>
    )
};

export default UserHome;