import styled from "styled-components";

const ValidSpan = styled.span`
    color: green;
`

const InvalidSpan = styled.span`
    color: red;
`


const FormRequirement = ({valid, message}) => {
    const Span = valid ? ValidSpan : InvalidSpan;
    return (
        <p><Span>{message}</Span></p>
    )
}

export default FormRequirement;