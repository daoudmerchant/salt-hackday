import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux"
import { selectUser } from "../redux/user"

import SnippetCard from "../components/SnippetCard";

const UserContainer = styled.div`

`

const UserHome = () => {
    const user = useSelector(selectUser);
    return (
        <UserContainer>
            <Link to="/snippets/new">+ New snippet</Link>
            {user.snippets.map(snippet => <SnippetCard key={snippet._id} snippet={snippet}/>)}
        </UserContainer>
    )
};

export default UserHome;