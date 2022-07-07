import styled from "styled-components";

const Para = styled.p`
    margin: 1em 2em;
`

const Valid = styled(Para)`
    color: green;
`

const Invalid = styled(Para)`
    color: red;
`


const FormRequirement = ({valid, message}) => {
    const Text = valid ? Valid : Invalid;
    return (
        <Text>{message}</Text>
    )
}

export default FormRequirement;