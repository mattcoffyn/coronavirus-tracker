import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import Search from './Search';

const Navigation = styled.nav`
  width: 100vw;
  height: 75px;
  position: fixed;
  z-index: 100;
  background-color: var(--black);
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 4fr 1fr;
  box-shadow: var(--bs);
  padding: 0 1.5rem;

  img {
    max-height: 3.5rem;
    object-fit: cover;
  }
  .nav-section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    a {
      color: var(--offWhite);
    }
  }
  #logo {
    a {
      display: flex;
      align-items: center;
    }
  }
`;

const Header = () => {
  return (
    <Navigation role="navigation" aria-label="main navigation">
      <div id="logo" className="nav-section">
        <Link href="/">
          <a>{/* Image Logo */}</a>
        </Link>
      </div>

      <div className="nav-section">
        {/* Link Tag */}
        {/* Link Tag */}
        {/* Link Tag */}
        {/* Link Tag */}
        {/* Link Tag */}
      </div>

      <div className="nav-section">
        <Search />
        <Login />
      </div>
    </Navigation>
  );
};

export default Header;
