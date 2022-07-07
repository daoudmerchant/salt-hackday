import styled from "styled-components";
import github from "../assets/github.png";

const FooterElem = styled.footer`
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Icon = styled.img`
    height: 1.5em;
    margin-left: .6em;
`

const IconLink = styled.a`
    display: flex;
    align-items: center;
`

const GitHub = () => <Icon src={github} alt="github logo"/>

const Footer = () => {
    return (
        <FooterElem>
            <p>Daoud Merchant</p>
            <IconLink href="https://github.com/daoudmerchant/salt-hackday"><GitHub/></IconLink>
        </FooterElem>
    )
}

export default Footer;