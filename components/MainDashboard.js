import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../lib/formatNumbers';

const MainDashboardStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  gap: 2rem;
  margin: 0 auto;
  width: 100%;
  height: 400px;
  max-width: var(--maxWidth);
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--aqua);

  .global-header {
    grid-column: 1/4;
    text-align: center;
    color: var(--orange);
    font-size: 6rem;
    margin: 0;
    padding: 0;
  }
  div {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    h2 {
      margin: 0;
      font-size: 3rem;
      color: var(--orange);
    }
    p {
      font-size: 4rem;
      margin: 0;
      color: var(--red);
    }
  }
`;

const GET_CONFIRMED = gql`
  query GET_CONFIRMED {
    latest {
      confirmed
      deceased
      recovered
      lastUpdated
    }
  }
`;
const MainDashboard = () => {
  const { data, loading, error } = useQuery(GET_CONFIRMED);

  if (loading) return <p>Loading...</p>;
  return (
    <MainDashboardStyles>
      <h1 className="global-header">Global Data</h1>
      <div>
        <h2>Confirmed Cases</h2>
        <p>{numberWithCommas(data.latest.confirmed)}</p>
      </div>
      <div>
        <h2>Deceased</h2>
        <p>{numberWithCommas(data.latest.deceased)}</p>
      </div>
      <div>
        <h2>Recovered</h2>
        <p>{numberWithCommas(data.latest.recovered)}</p>
      </div>
    </MainDashboardStyles>
  );
};

export default MainDashboard;
