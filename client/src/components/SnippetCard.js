import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteSnippet } from "../redux/user"
import styled from "styled-components"
import { getVariables } from "../helpers"
import { useEditableKeys } from "../hooks"

import VariableInput from "./VariableInput"

import check from "../assets/check.png";
import copy from "../assets/copy.png";
import pencil from "../assets/pencil.png";
import bin from "../assets/bin.png";

const Card = styled.div`
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 15px;
    transition: .5s all;
    background-color: ${({$clicked}) => $clicked ? "#c7f0b4" : "white"};
    padding: 2em;
    margin-top: 2em;
`

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr repeat(3, 3em);
    align-items: center;
`

const SnippetName = styled.p`
    height: 100px;
    max-width: 500px;
    margin: 0;
    font-size: 1.2em;
    text-overflow: ellipsis;
    overflow: hidden;
    whitespace: nowrap;
    padding-right: 1em;
    display: flex;
    align-items: center;
`

const SnippetContents = styled.div`
    margin-right: auto;
    width: 100%;
`

const VariableContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
`

const CopyButton = styled.button`
    grid-column: -2 / -1;
    &:disabled {
        opacity: .2;
    }
`

const ClearButton = styled.button`
    display: block;
    border: 2px solid tomato;
    background-color: tomato;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    padding: .5em 1.2em;
    margin-top: 1em;
    margin-inline: auto;
    &:disabled {
        border-color: silver;
        background-color: transparent;
        color: silver;
    }
`

const Edit = styled(Link)`
    grid-column: -3 / -2;
    margin-inline: auto;
`

const DeleteButton = styled.button`
grid-column: -4 / -3;
`

const Icon = styled.img`
    height: 2.5em;
`

const SmallIcon = styled.img`
    height: 1.6em;
`

export const SnippetCard = ({ snippet, dummy }) => {
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);
    const variables = getVariables(snippet.text);
    const [variableValues, updateVariableValues, resetVariableValues] = useEditableKeys(variables);
    const canBeCopied = !variables.length || Object.values(variableValues).every(Boolean);
    const handleCopy = async () => {
        const accessRights = await navigator.permissions.query({name: "clipboard-write"});
        if (accessRights.state === "granted" || accessRights.state === "prompt") {
            const textToCopy = variables.length
                ? variables.reduce((str, variable) => str.replace(new RegExp('\\$\\{' + variable + '\\}', 'g'), variableValues[variable]), snippet.text)
                : snippet.text;
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    }
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete " + (snippet.title || "this snippet") + "?")) { // eslint-disable-line
            dispatch(deleteSnippet(snippet._id))
        }
    }
    return (
        <Card $clicked={copied}>
            <MainContainer>
                <SnippetContents>
                    <SnippetName>{snippet.title || snippet.text}</SnippetName>
                </SnippetContents>
                {dummy
                    ? null
                    : <>
                        <DeleteButton onClick={handleDelete}><SmallIcon src={bin} alt="delete"/></DeleteButton>
                        <Edit to={`/snippets/${snippet._id}`}><SmallIcon src={pencil} alt="edit"/></Edit>
                    </>}
                <CopyButton disabled={!canBeCopied} onClick={handleCopy}>{copied ? <Icon src={check} alt="checkmark"/> : <Icon src={copy} alt="copy to clipboard"/>}</CopyButton>
            </MainContainer>
            {variables.length
                    ? <ClearButton disabled={!Object.values(variableValues).some(Boolean)}onClick={resetVariableValues}>Clear fields</ClearButton>
                    : null
                }
            <VariableContainer>
                {variables.map(variable => {
                    const update = e => updateVariableValues(variable, e.target.value);
                    return <VariableInput key={variable} variable={variable} update={update} value={variableValues[variable]} />
                })}
            </VariableContainer>
        </Card>

    )
}

export default SnippetCard;