import { useDispatch, useSelector } from "react-redux";
import { selectUser, addText } from "../redux/user";

const Home = () => {
    const { userData } = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleAddDocument = () => {
        dispatch(addText({id: userData._id.toString(), snippet: {
            text: "This is a little test"
        }}))
    }
    return (
        <div>
            <button onClick={handleAddDocument}>Add Document</button>
            <p>{userData && JSON.stringify(userData)}</p>
        </div>
    )
}

export default Home;