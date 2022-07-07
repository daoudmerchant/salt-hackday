import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIfSignedIn, selectSnippet, selectStatus, addNewSnippet, updateSnippet } from "../redux/user";
import { useFormField } from "../hooks";
import { getVariables } from "../helpers";
import styled, { css } from "styled-components";

import Variable from "../components/VariableGem";

const SnippetForm = styled.form`
    display: flex;
    flex-direction: column;
    width: calc(100% - 4em);
    margin: 3em auto;
    padding: 2em;
    max-width: 600px;
    background-color: white;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    margin-bottom: .8em;
    & > *:first-child {
        margin-top: .8em;
    }
`

const InputText = css`
    font-size: 1.2em;
    padding: .8em 1.2em;
`

const TitleInput = styled.input`
    ${InputText}
    padding: .8em 1.2em;
`

const TextInput = styled.textarea`
    ${InputText}
    resize: vertical;
    height: 10em;
    font-family: 'Oxygen', sans-serif;
`

const Container = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px) {
        justify-content: space-between;
        flex-direction: row;
        align-items: flex-end;
    }
`

const VariableInfo = styled.p`
    margin-inline: 0;
    margin-top: 1em;
    background-color: #F0F0F0;
    border-left: 4px solid darkgray;
    padding: 1.3em 2em;
`

const VariableContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: .5em;
    justify-content: center;
    @media (min-width: 600px) {
        justify-content: left;
    }
`

const This = styled.span`
    font-weight: bold;
`

const Submit = styled.button`
    border: 2px solid #3f96e8;
    background-color: #3f96e8;
    color: white;
    font-size: 1.8em;
    border-radius: 5px;
    padding: .5em 1.2em;
    margin-top: 1em;
    white-space: nowrap;
    &:disabled {
        border-color: silver;
        background-color: transparent;
        color: silver;
    }
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
            <VariableInfo>Don't forget, you can add variables using <This>{"${this}"}</This> syntax</VariableInfo>
            <Container>
                <VariableContainer>
                    {variables.map(variable => <Variable key={variable} variable={variable}/>)}
                </VariableContainer>
                <Submit disabled={!canSubmit}>{status === "loading" ? "Saving..." : isNew ? "Add snippet" : "Update snippet"}</Submit>
            </Container>
        </SnippetForm>
    )
}

export default SnippetEditor;