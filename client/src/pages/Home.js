import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUser, addText } from "../redux/user";

const Home = () => {
    const { userData } = useSelector(selectUser);
    const dispatch = useDispatch();
    // const handleLogin = () => {
    //     dispatch(createUser({ username: "bimble", password: "bamble"}));
    // }
    const handleAddDocument = () => {
        dispatch(addText({id: userData._id.toString(), snippet: {
            text: "This is a little test"
        }}))
    }
    return (
        <div>
            {/* <button onClick={handleLogin}>Create user</button> */}
            <button onClick={handleAddDocument}>Add Document</button>
            <p>{userData && JSON.stringify(userData)}</p>
        </div>
    )
}

export default Home;