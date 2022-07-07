import styled from "styled-components";

const ValidSpan = styled.span`
    color: green;
`

const InvalidSpan = styled.span`
    color: red;
`


const FormRequirement = ({requirement, valid}) => {
    const Span = valid ? ValidSpan : InvalidSpan;
    return (
        <p><Span>{requirement}</Span></p>
    )
}

export default FormRequirement;