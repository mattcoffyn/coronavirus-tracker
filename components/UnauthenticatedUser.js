import React from 'react';
import styled from 'styled-components';
import Meta from './Meta';
import PropTypes from 'prop-types';
import { useUser } from '../lib/useUser';

const UnAuthStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UnauthenticatedUser = ({ loggedOut, admin, children }) => {
  const user = useUser();

  const userStates = {
    loggedOut: 'You must be logged in to see this page!',
    noAuth: 'You are not authourised to see this page!',
  };

  if (loggedOut && !user)
    return (
      <UnAuthStyles>
        <Meta pageName="Please Login" />
        <h2>Uh oh!</h2>
        <p>{userStates.loggedOut}</p>
      </UnAuthStyles>
    );

  if (admin && !user.isAdmin)
    return (
      <UnAuthStyles>
        <Meta pageName="Unauthorised Acccess" />
        <h2>Uh oh!</h2>
        <p>{userStates.noAuth}</p>
      </UnAuthStyles>
    );

  return <>{children}</>;
};

export default UnauthenticatedUser;

UnauthenticatedUser.propTypes = {
  loggedOut: PropTypes.bool,
  admin: PropTypes.bool,
  children: PropTypes.element,
};
