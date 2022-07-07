import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectIfSignedIn } from "../redux/user";

const LinkList = styled.ul`
    display: flex;
`

const Nav = () => {
    const signedIn = useSelector(selectIfSignedIn);
    return (
        <header>
            <nav>
                <LinkList>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {signedIn
                        ? <li>
                            <NavLink to="/form/settings">Settings</NavLink>
                        </li>
                        : <>
                            <li>
                                <NavLink to="/form/login">Log in</NavLink>
                            </li>
                            <li>
                                <NavLink to="/form/signup">Sign up</NavLink>
                            </li>
                        </>}
                </LinkList>
            </nav>
        </header>
    )
}

export default Nav;