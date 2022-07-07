import styled from "styled-components";

const Gem = styled.p`
    margin-block: 0;
    padding-inline: 1.3em;
    height: 2em;
    border: 1px solid black;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const VariableGem = ({variable}) => {
    return <Gem>{variable}</Gem>
}

export default VariableGem;