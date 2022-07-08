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
    display: grid;
    column-gap: 1em;
    grid-template-columns: 1fr;
    @media (min-width: 600px) {
        grid-template-columns: 2fr 1fr;
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
    overflow-y: auto;
    margin-top: .1em;
    min-height: 2.8em;
    justify-content: center;
    align-items: center;
    background-color: #F8F8F8;
    grid-column: 1 / 2;
    @media (min-width: 600px) {
        grid-row: 2 / 3;
        justify-content: left;
    }
`

const VariableHeader = styled.p`
    margin-block: 0;
    margin-left: 1em;
    font-size: .8em;
    grid-column: 1 / 2;
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
    padding-block: .5em;
    width: 200px;
    align-self: end;
    margin-inline: auto;
    white-space: nowrap;
    margin-top: .8em;
    @media (min-width: 600px) {
        margin-top: 0;
        grid-column: -2 / -1;
        grid-row: 2 / 3;
    }
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
            <Label>Title (optional): <TitleInput value={title} onChange={updateTitle} maxLength={20}/></Label>
            <Label>Snippet: <TextInput value={text} onChange={updateText}/></Label>
            <VariableInfo>Don't forget, you can add variables using <This>{"${this}"}</This> syntax</VariableInfo>
            <Container>
                <VariableHeader>Declared variables (scrollable):</VariableHeader>
                <VariableContainer>
                    {variables.map(variable => <Variable key={variable} variable={variable}/>)}
                </VariableContainer>
                <Submit disabled={!canSubmit}>{status === "loading" ? "Saving..." : isNew ? "Add" : "Update"}</Submit>
            </Container>
        </SnippetForm>
    )
}

export default SnippetEditor;