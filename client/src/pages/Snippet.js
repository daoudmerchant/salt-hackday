import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectSnippet } from "../redux/user";
import { useFormField } from "../hooks";
import styled from "styled-components";

const SnippetForm = styled.form`
    display: flex;
    flex-direction: column;
    padding-inline: 20%;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
`

const TitleInput = styled.input`

`

const TextInput = styled.textarea`

`


const Snippet = ({ isNew }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(selectUser);
    const thisSnippet = useSelector(selectSnippet(id))
    const [title, updateTitle] = useFormField(thisSnippet?.title)
    const [text, updateText] = useFormField(thisSnippet?.text);
    useEffect(() => {
        if (isNew) {
            return;
        }
        if (thisSnippet === false) {
            // no user
            navigate("/form/login");
        }
        if (thisSnippet === undefined) {
            // snippet id not found
            navigate("/");
        }
    }, [JSON.stringify(user)]);
    return (
        <SnippetForm>
            <Label>Title (optional): <TitleInput value={title} onChange={updateTitle}/></Label>
            <Label>Snippet: <TextInput value={text} onChange={updateText}/></Label>
        </SnippetForm>
    )
}

export default Snippet;