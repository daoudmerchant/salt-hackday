import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectIfSignedIn } from "../redux/user";

import scissors from "../assets/scissor.png";

const Header = styled.header`
    background-color: #F3F8F2;
    height: 100%;
`

const NavElem = styled.nav`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`


const LinkList = styled.ul`
    height: 100%;
    display: flex;
    align-items: center;
    li:first-child {
        margin-right: auto;
    }
`

const ListItem = styled.li`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Scissors = styled.img`
    height: 1.3em;
    width: .8em;
    object-fit: cover;
    transform: rotate(180deg);
`

const MyLink = styled(NavLink)`
    height: 100%;
    font-size: 1.5em;
    padding-inline: .8em;
    display: flex;
    align-items: center;
    &.active {
        background-color: white;
    }
`

const Logo = styled(MyLink)`
    font-size: 2em;
`

const Nav = () => {
    const signedIn = useSelector(selectIfSignedIn);
    return (
        <Header>
            <NavElem>
                <LinkList>
                    <ListItem>
                        <Logo to="/">S<Scissors src={scissors} alt="scissors icon"/>ippets</Logo>
                    </ListItem>
                    {signedIn
                        ? <ListItem>
                            <MyLink to="/form/settings">Settings</MyLink>
                        </ListItem>
                        : <>
                            <ListItem>
                                <MyLink to="/form/login">Log in</MyLink>
                            </ListItem>
                            <ListItem>
                                <MyLink to="/form/signup">Sign up</MyLink>
                            </ListItem>
                        </>}
                </LinkList>
            </NavElem>
        </Header>
    )
}

export default Nav;