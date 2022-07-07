import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteSnippet } from "../redux/user"
import styled from "styled-components"
import { getVariables } from "../helpers"
import { useEditableKeys } from "../hooks"

import VariableInput from "./VariableInput"

const Card = styled.div`
    border: 2px solid blue;
    border-radius: 15px;
    display: flex;
    justify-content: center;
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

const DeleteButton = styled.button`

`

const ClearButton = styled.button`
`

export const SnippetCard = ({ snippet }) => {
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);
    const variables = getVariables(snippet.text);
    const [variableValues, updateVariableValues, resetVariableValues] = useEditableKeys(variables);
    const canBeCopied = !variables.length || Object.values(variableValues).every(Boolean);
    const handleCopy = async () => {
        const accessRights = await navigator.permissions.query({name: "clipboard-write"});
        if (accessRights.state === "granted" || accessRights.state === "prompt") {
            const textToCopy = variables.length
                ? variables.reduce((str, variable) => str.replace('${' + variable + '}', variableValues[variable]), snippet.text)
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
        <Card>
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
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            <CopyButton disabled={!canBeCopied} onClick={handleCopy}>{copied ? "Copied!" : "Copy to clipboard"}</CopyButton>
        </Card>

    )
}

export default SnippetCard;