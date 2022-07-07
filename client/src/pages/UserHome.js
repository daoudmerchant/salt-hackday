import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { selectUser } from "../redux/user"

const UserHome = () => {
    const user = useSelector(selectUser);
    console.log(user);
    return <Link to="/snippets/new">A snippet link</Link>
    // return (
    //     <>
    //         <p>{user.username}</p>
    //         {user.snippets.map(snippet => <p>{snippet}</p>)}
    //     </>
    // )
}

export default UserHome;