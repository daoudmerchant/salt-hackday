import styled from "styled-components";

const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 1.1em;
`

const Input = styled.input`
    font-size: 1em;
    padding: .6em 1em;
    margin-top: .4em;
`

const Italic = styled.span`
    font-style: italic;
    letter-spacing: 1px;
`

const VariableInput = ({variable, update, value}) => {
    return (
        <Label>
            <Italic>"{variable}"</Italic>
            <Input type="text" value={value} onChange={update}/>
        </Label>)
}

export default VariableInput;