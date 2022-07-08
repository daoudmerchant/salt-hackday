import styled from "styled-components";

const Gem = styled.p`
    margin: .4em;
    padding: .7em 1.3em;
    border: 1px dashed gray;
    color: gray;
    background-color: white;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const VariableGem = ({variable}) => {
    return <Gem>{variable}</Gem>
}

export default VariableGem;