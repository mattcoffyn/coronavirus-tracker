import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import Proptypes from 'prop-types';
import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import styled from 'styled-components';
import { CURRENT_USER_QUERY, useUser } from '../lib/useUser';

const SigninStyles = styled.div`
  .signin-button {
    padding: 0.5rem;
    margin: 0 0 0 1rem;
    background: none;
    border: none;
    color: var(--offWhite);
  }
  form,
  div {
    position: absolute;
    top: 75px;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 120;
    width: 300px;
    padding: 1.5rem;
    background: var(--offWhite);
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09);
    input {
      width: 100%;
    }
  }
`;

const AUTHENTICATE_USER = gql`
  mutation AUTHENTICATE_USER($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        id
        name
        isAdmin
      }
    }
  }
`;

const UNAUTHENTICATE_USER = gql`
  mutation UNAUTHENTICATE_USER {
    unauthenticateUser {
      success
    }
  }
`;

const Signin = () => {
  const user = useUser();
  const [inputDropdown, setInputDropdown] = useState(false);

  const [inputs, setInputs] = useState({ email: '', password: '' });

  const [signin, { error }] = useMutation(AUTHENTICATE_USER, {
    variables: {
      email: inputs?.email,
      password: inputs?.password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [signout] = useMutation(UNAUTHENTICATE_USER, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleInputs(e) {
    setInputs({
      ...inputs,
      [e.name]: e.value,
    });
  }

  async function handleSignin(e) {
    e.preventDefault();
    await signin();
    setInputDropdown(false);
  }

  function handleSignout() {
    signout();
    Router.push({
      pathname: `/`,
    });
    setInputDropdown(false);
  }

  function openInputs() {
    if (!inputDropdown) {
      setInputDropdown(true);
    } else {
      setInputDropdown(false);
    }
  }

  if (error) {
    console.log(`👽: ${error}`);
  }

  if (user)
    return (
      <SigninStyles>
        <button className="signin-button" onClick={openInputs}>
          <BiUser size={30} />
        </button>
        {inputDropdown && (
          <div>
            <p>Welcome {user.name}</p>
            <button onClick={() => handleSignout()}>Sign Out</button>
          </div>
        )}
      </SigninStyles>
    );

  return (
    <SigninStyles>
      <button className="signin-button" onClick={openInputs}>
        <BiUser size={30} />
      </button>
      {inputDropdown && (
        <form method="POST" onSubmit={(e) => handleSignin(e)}>
          {error && <p>{error}</p>}
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleInputs(e.target)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleInputs(e.target)}
            />
          </label>
          <button type="submit">Signin</button>
        </form>
      )}
    </SigninStyles>
  );
};

export default Signin;

Signin.propTypes = {
  handleInputs: Proptypes.func,
  handleSignin: Proptypes.func,
  user: Proptypes.string,
};
