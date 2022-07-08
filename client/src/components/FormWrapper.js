import styled from "styled-components";
import { Outlet } from "react-router-dom";

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 800px;
    margin-inline: auto;
    margin-top: 2em;
    & > * {
        flex-grow: 1;
        padding: 2em;
        border: 1px solid grey;
        border-radius: 15px;
        h1 {
            margin-block: 0;
        }
    }
`;

const FormWrapper = () => {
    return (
        <FormContainer>
            <Outlet/>
        </FormContainer>
    )
}

export default FormWrapper;