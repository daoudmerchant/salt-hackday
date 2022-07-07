import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIfSignedIn, selectSnippet, selectStatus, addNewSnippet } from "../redux/user";
import { useFormField } from "../hooks";
import { getVariables } from "../helpers";
import styled from "styled-components";

import Variable from "../components/VariableGem";

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

const VariableInfo = styled.a`

`

const VariableContainer = styled.div`
    display: flex;
`

const Submit = styled.button`

`

const SnippetEditor = ({ isNew }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const signedIn = useSelector(selectIfSignedIn);
    const thisSnippet = useSelector(selectSnippet(id))
    const [title, updateTitle] = useFormField(thisSnippet?.title)
    const [text, updateText] = useFormField(thisSnippet?.text);
    const variables = getVariables(text);
    const canSubmit = Boolean(text) && status === "idle";
    const handleSubmit = async e => {
        e.preventDefault()
        await dispatch(addNewSnippet(title ? {title, text} : {text}));
        navigate("/")
    }
    useEffect(() => {
        if (!signedIn) {
            navigate("/");
        }
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
        <SnippetForm onSubmit={handleSubmit}>
            <Label>Title (optional): <TitleInput value={title} onChange={updateTitle}/></Label>
            <Label>Snippet: <TextInput value={text} onChange={updateText}/></Label>
            <VariableInfo>Don't forget, you can add variables using {"${this}"} syntax</VariableInfo>
            <VariableContainer>
                {variables.map(variable => <Variable variable={variable}/>)}
            </VariableContainer>
            <Submit disabled={!canSubmit}>{status === "loading" ? "Saving..." : isNew ? "Add snippet" : "Update snippet"}</Submit>
        </SnippetForm>
    )
}

export default SnippetEditor;