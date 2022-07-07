import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { createGlobalStyle} from "styled-components";

import { selectIfSignedIn } from "./redux/user";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import UserHome from "./pages/UserHome";
import Footer from "./components/Footer";
import FormWrapper from "./components/FormWrapper";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import SnippetEditor from "./pages/SnippetEditor";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Oxygen', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    display: grid;
    grid-template-rows: 4em 1fr 40px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
  }

  button {
    background-color: transparent;
    border: none;
    transition: .1s all;
  }

  a, a:visited {
    text-decoration: none;
    color: black;
  }
`

const Main = styled.main`
  overflow-y: scroll;
  background-color: #f3fff1;
`

function App() {
  const signedIn = useSelector(selectIfSignedIn);
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Nav/>
        <Main>
          <Routes>
            <Route path="/" element={signedIn ? <UserHome/> : <Home/>}/>
            <Route path="form" element={<FormWrapper/>}>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<Signup/>}/>
              <Route path="settings" element={<Settings/>}/>
            </Route>
            <Route path="/snippets/new" element={<SnippetEditor isNew={true}/>}/>
            <Route path="/snippets/:id" element={<SnippetEditor/>}/>
          </Routes>
        </Main>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
