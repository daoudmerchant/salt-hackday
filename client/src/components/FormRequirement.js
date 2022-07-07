import styled from "styled-components";

import check from "../assets/check.png";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const Para = styled.p`
    flex-grow: 1;
    margin-right: 1em;
`

const Valid = styled(Para)`
    color: #89db63;
`

const Invalid = styled(Para)`
    color: lightgrey;
`

const Icon = styled.img`
    height: 20px;
    filter: invert(70%) sepia(60%) saturate(419%) hue-rotate(55deg) brightness(107%) contrast(76%);
`

const Check = () => <Icon src={check} alt="check icon"/>

const FormRequirement = ({valid, message}) => {
    const Text = valid ? Valid : Invalid;
    return (
        <Container>
            <Text>{message}</Text>
            {valid ? <Check/> : null}
        </Container>
    )
}

export default FormRequirement;