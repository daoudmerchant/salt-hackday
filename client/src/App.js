import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle} from "styled-components";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #root {
    display: grid;
    grid-template-rows: 40px 1fr 40px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
  }

  button {
    background-color: transparent;
    border: none;
  }
`

const Main = styled.main`
  overflow-y: scroll;
`

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Nav/>
        <Main>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </Main>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
