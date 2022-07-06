import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;