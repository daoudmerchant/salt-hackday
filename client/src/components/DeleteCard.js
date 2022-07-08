import styled from "styled-components"

import bin from "../assets/bin.png";
import arrowBack from "../assets/return.png";

const Card = styled.div`
    position: absolute;
    z-index: 300;
    left: 1em;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7dada;
    border-radius: 15px;
    transition: .4s all;
    left: ${({$isOpen}) => $isOpen ? "0" : "100%"};
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    margin-inline: .5em;
    padding: .4em .6em;
    border-radius: 10px;
`

const Delete = styled(Button)`
    color: white;
    background-color: tomato;
`

const Icon = styled.img`
    height: 1.6em;
`


const DeleteIcon = styled(Icon)`
    filter: invert(1);
`

const DeleteCard = ({ remove, isOpen, cancel}) => {
    return (
        <Card $isOpen={isOpen}>
            <Button onClick={cancel}><Icon src={arrowBack} alt="cancel"/></Button>
            <Delete onClick={remove}><DeleteIcon src={bin} alt="delete"/></Delete>
        </Card>
    )
}

export default DeleteCard;