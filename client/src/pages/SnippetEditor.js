import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIfSignedIn, selectSnippet, selectStatus, addNewSnippet, updateSnippet } from "../redux/user";
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
    resize: vertical;
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
    const foundSnippet = useSelector(selectSnippet(id));
    const thisSnippet = {
        title: '',
        ...foundSnippet
    }
    const [title, updateTitle] = useFormField(thisSnippet?.title)
    const [text, updateText] = useFormField(thisSnippet?.text);
    const variables = getVariables(text);
    const isChanged = isNew
        || thisSnippet.text !== text
        || thisSnippet.title !== title
    const canSubmit = Boolean(text) && isChanged && status === "idle";
    const handleSubmit = async e => {
        e.preventDefault()
        const snippetToSubmit = title ? {title, text} : {text}
        if (isNew) {
            await dispatch(addNewSnippet(snippetToSubmit));
        } else {
            await dispatch(updateSnippet({...thisSnippet, ...snippetToSubmit}))
        }
        navigate("/")
    }
    useEffect(() => {
        if (!signedIn) {
            navigate("/");
        }
        if (isNew) {
            return;
        }
        if (foundSnippet === false) {
            // no user
            navigate("/form/login");
        }
        if (foundSnippet === undefined) {
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
                {variables.map(variable => <Variable key={variable} variable={variable}/>)}
            </VariableContainer>
            <Submit disabled={!canSubmit}>{status === "loading" ? "Saving..." : isNew ? "Add snippet" : "Update snippet"}</Submit>
        </SnippetForm>
    )
}

export default SnippetEditor;