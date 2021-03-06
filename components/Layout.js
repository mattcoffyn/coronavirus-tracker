import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
// import Footer from "./Footer";

const GlobalStyle = createGlobalStyle`
  html {
    --orange: #F3B562;
    --brown: #5C4B51;
    --seafoam: #8CBEB2;
    --aqua: #1EE5CE;
    --cream: #F2EBBF;
    --red: #F06060;
    --magenta: #e6007e;
    --black: rgba(28, 27, 45, 1);
    --oldBlack: #393939;
    --grey: #4e4e4e;
    --lightGrey: hsl(0, 0%, 96%);
    --offWhite: #EDEDED;
    --maxWidth: 1000px;
    --bs: 0 1px 1px rgba(20,20,20,0.15),
          0 2px 2px rgba(20,20,20,0.15),
          0 4px 4px rgba(20,20,20,0.15),
          0 8px 8px rgba(20,20,20,0.15);
    --gradient: linear-gradient(
            150deg,
            rgba(28,27,45,1) 0%,
            rgba(28,27,45,1) 62%,
            rgba(42,19,78,1) 100%
          );


    box-sizing: border-box;
    font-size: 62.5%;
    color: var(--black);
    background: var(--offWhite);
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.7rem;
    line-height: 2;


  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  button {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  input {
    background: none;
    color: var(--black);
    font-size: 1.5rem;
  }

`;

const MainContent = styled.div`
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* background: var(--gradient); */

  main {
    flex: 1;
    padding: 20px;
    margin-top: 80px;
  }
`;

const Layout = (props) => {
  return (
    <>
      <GlobalStyle />
      <MainContent>
        <Header />
        <main>{props.children}</main>
        {/* <Footer /> */}
      </MainContent>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
