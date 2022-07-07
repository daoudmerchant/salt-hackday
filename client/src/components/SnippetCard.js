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

const Card = styled.div`
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    padding: .8em 1.2em;
    transition: .5s all;
    background-color: ${({$clicked}) => $clicked ? "#c7f0b4" : "transparent"};
`

const SnippetName = styled.p`
    text-overflow: ellipsis;
`

const SnippetContents = styled.div`
    margin-right: auto;
`

const VariableContainer = styled.div`

`

const CopyButton = styled.button`

`

const ClearButton = styled.button`
`

const Edit = styled(Link)`

`

const DeleteButton = styled.button`

`

const Icon = styled.img`
    height: 2.5em;
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
            <SnippetContents>
                <SnippetName>{snippet.title || snippet.text}</SnippetName>
                <VariableContainer>
                    {variables.map(variable => {
                        const update = e => updateVariableValues(variable, e.target.value);
                        return <VariableInput key={variable} variable={variable} update={update} value={variableValues[variable]} />
                    })}
                </VariableContainer>
            </SnippetContents>
            {variables.length
                ? <ClearButton disabled={!Object.values(variableValues).some(Boolean)}onClick={resetVariableValues}>Clear</ClearButton>
                : null
            }
            {dummy
                ? null
                : <>
                    <Edit to={`/snippets/${snippet._id}`}>Edit</Edit>
                    <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                  </>}
            <CopyButton disabled={!canBeCopied} onClick={handleCopy}>{copied ? <Icon src={check} alt="checkmark"/> : <Icon src={copy} alt="copy to clipboard"/>}</CopyButton>
        </Card>

    )
}

export default SnippetCard;