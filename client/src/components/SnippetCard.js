import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { deleteSnippet } from "../redux/user"
import { getVariables } from "../helpers"
import { useEditableKeys } from "../hooks"

import VariableInput from "./VariableInput"
import DeleteCard from "./DeleteCard"

import check from "../assets/check.png";
import copy from "../assets/copy.png";
import pencil from "../assets/pencil.png";
import bin from "../assets/bin.png";

const Card = styled.div`
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 15px;
    transition: .5s all;
    background-color: ${({$clicked}) => $clicked ? "#c7f0b4" : "white"};
    margin-top: 2em;
    position: relative;
    overflow: hidden;
`

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr repeat(3, 3em) 1.5em;
    align-items: center;
`

const SnippetName = styled.p`
    cursor: pointer;
    height: 100px;
    max-width: 500px;
    margin-block: 0;
    margin-left: 1.5em;
    font-size: 1.2em;
    text-overflow: ellipsis;
    overflow: hidden;
    whitespace: nowrap;
    display: flex;
    align-items: center;
`
    
    const SnippetContents = styled.div`
    margin-right: auto;
    width: 100%;
    padding-right: ${({$dummy}) => $dummy ? "1em" : "0"};
    ${({$dummy}) => $dummy ? "grid-column: 1 / -3;" : ""}
`

const VariableContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
    margin: 0 2em 2em;
`

const CopyButton = styled.button`
    grid-column: -3 / -2;
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
    grid-column: -4 / -3;
    margin-inline: auto;
`

const DeleteButton = styled.button`
    grid-column: -5 / -4;
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
    const [deleteOpen, setDeleteOpen] = useState(false);
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
    return (
        <Card $clicked={copied}>
            <DeleteCard remove={() => dispatch(deleteSnippet(snippet._id))} isOpen={deleteOpen} cancel={() => setDeleteOpen(false)}/>
            <MainContainer>
                <SnippetContents $dummy={dummy} onClick={handleCopy}>
                    <SnippetName>{snippet.title || snippet.text}</SnippetName>
                </SnippetContents>
                {dummy
                    ? null
                    : <>
                        <DeleteButton onClick={() => setDeleteOpen(true)}><SmallIcon src={bin} alt="delete"/></DeleteButton>
                        <Edit to={`/snippets/${snippet._id}`}><SmallIcon src={pencil} alt="edit"/></Edit>
                    </>}
                <CopyButton disabled={!canBeCopied} onClick={handleCopy}>{copied ? <Icon src={check} alt="checkmark"/> : <Icon src={copy} alt="copy to clipboard"/>}</CopyButton>
            </MainContainer>
            {variables.length
                    ? (
                    <>
                        <ClearButton disabled={!Object.values(variableValues).some(Boolean)}onClick={resetVariableValues}>Clear fields</ClearButton>
                        <VariableContainer>
                            {variables.map(variable => {
                                const update = e => updateVariableValues(variable, e.target.value);
                                return <VariableInput key={variable} variable={variable} update={update} value={variableValues[variable]} />
                            })}
                        </VariableContainer>
                    </>
                    ) : null
                }
        </Card>

    )
}

export default SnippetCard;