import styled from "styled-components";
import { Outlet } from "react-router-dom";

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10%;
    position: relative;
    & > * {
        flex-grow: 1;
        padding: 2em;
        border: 2px solid black;
        border-radius: 15px;
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