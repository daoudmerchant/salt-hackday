import styled from "styled-components";

const Label = styled.label`

`

const Input = styled.input`

`

const VariableInput = ({variable, update, value}) => {
    return (
        <Label>
            {variable}:
            <Input type="text" value={value} onChange={update}/>
        </Label>)
}

export default VariableInput;