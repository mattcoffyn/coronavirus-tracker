import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { numberWithCommas } from '../../lib/formatNumbers';

const SingleCountryStyles = styled.div``;

const CountryDashboardStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const CountryStatsStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const GET_SINGLE_COUNTRY = gql`
  query GET_SINGLE_COUNTRY($code: String!) {
    country(code: $code) {
      name
      code
      timeline {
        date
        confirmed
        deceased
      }
      latest {
        confirmed
        deceased
      }
      region {
        name
      }
      subRegion {
        name
      }
    }
  }
`;

const Countries = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data, loading, error } = useQuery(GET_SINGLE_COUNTRY, {
    variables: {
      code: pid,
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <SingleCountryStyles>
      <CountryDashboardStyles>
        <h1 className="global-header">{data.country.name}</h1>
        <div>
          <h2>Confirmed Cases</h2>
          <p>{numberWithCommas(data.country.latest.confirmed)}</p>
        </div>
        <div>
          <h2>Deceased</h2>
          <p>{numberWithCommas(data.country.latest.deceased)}</p>
        </div>
      </CountryDashboardStyles>
      <CountryStatsStyles>
        <div>
          <h2>{data.country.region.name}</h2>
        </div>
        <div>
          <h2>{data.country.subRegion.name}</h2>
        </div>
      </CountryStatsStyles>
    </SingleCountryStyles>
  );
};

export default Countries;
