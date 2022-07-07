import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/form/signup">Sign up</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;