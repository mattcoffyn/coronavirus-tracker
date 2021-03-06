import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../lib/formatNumbers';

const SideBarStyles = styled.aside`
  border-right: 1px solid var(--aqua);
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  min-width: 350px;

  h2 {
    margin: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    margin-top: 2rem;
    padding: 0;
    li {
      margin: 1rem 0;
      padding: 0 1rem 0 0;
      background: rgba(255, 255, 255, 0.1);
      font-size: 1.2rem;
    }
  }
`;

const SideBarButtonStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  button {
    background: none;
    cursor: pointer;
    border: 1px solid var(--orange);
    color: var(--offWhite);
    margin: 0 0.5rem;
    border-radius: 10px;
    padding: 5px 10px;
  }
  .active {
    background: var(--orange);
    color: var(--offWhite);
  }
`;

const GET_COUNTRY_TOTALS = gql`
  query GET_COUNTRY_TOTALS($CountrySort: CountrySort) {
    countries(count: 10, sortBy: $CountrySort, sortOrder: DESCENDING) {
      results {
        code
        name
        latest {
          confirmed
          deceased
        }
      }
    }
    regions {
      name
      latest {
        confirmed
        deceased
      }
    }
    subRegions {
      name
      latest {
        confirmed
        deceased
      }
    }
  }
`;

const Sidebar = () => {
  const [activeCountry, setActiveCountry] = useState('confirmed');
  const [activeRegion, setActiveRegion] = useState('confirmed');
  const [activeSubRegion, setActiveSubRegion] = useState('confirmed');
  const { data, loading, error } = useQuery(GET_COUNTRY_TOTALS, {
    variables: {
      CountrySort: activeCountry.toUpperCase(),
    },
  });

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  function handleCountryButton(e) {
    setActiveCountry(e.target.id);
  }

  function handleRegionButton(e) {
    setActiveRegion(e.target.id);
  }

  function handleSubRegionButton(e) {
    setActiveSubRegion(e.target.id);
  }
  console.log(data);

  function abbrvCountry(country) {
    if (country.code === 'GB') {
      return 'United Kingdom';
    } else {
      return country.name;
    }
  }
  return (
    <SideBarStyles>
      <div>
        <h2>By Country</h2>
        <SideBarButtonStyles>
          <button
            id="confirmed"
            className={activeCountry === 'confirmed' ? 'active' : ''}
            type="button"
            onClick={(e) => handleCountryButton(e)}
          >
            Confirmed
          </button>
          <button
            id="deceased"
            className={activeCountry === 'deceased' ? 'active' : ''}
            type="button"
            onClick={(e) => handleCountryButton(e)}
          >
            Deceased
          </button>
        </SideBarButtonStyles>
        <ul>
          {data.countries.results.map((country) => (
            <li key={country.code}>
              {abbrvCountry(country)} -{' '}
              {activeCountry === 'confirmed'
                ? numberWithCommas(country.latest.confirmed)
                : numberWithCommas(country.latest.deceased)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>By Region</h2>
        <SideBarButtonStyles>
          <button
            id="confirmed"
            className={activeRegion === 'confirmed' ? 'active' : ''}
            type="button"
            onClick={(e) => handleRegionButton(e)}
          >
            Confirmed
          </button>
          <button
            id="deceased"
            className={activeRegion === 'deceased' ? 'active' : ''}
            type="button"
            onClick={(e) => handleRegionButton(e)}
          >
            Deceased
          </button>
        </SideBarButtonStyles>
        <ul>
          {data.regions.map((region) => (
            <li key={region.name}>
              {region.name} -{' '}
              {activeRegion === 'confirmed'
                ? numberWithCommas(region.latest.confirmed)
                : numberWithCommas(region.latest.deceased)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>By Sub Region</h2>
        <SideBarButtonStyles>
          <button
            id="confirmed"
            className={activeSubRegion === 'confirmed' ? 'active' : ''}
            type="button"
            onClick={(e) => handleSubRegionButton(e)}
          >
            Confirmed
          </button>
          <button
            id="deceased"
            className={activeSubRegion === 'deceased' ? 'active' : ''}
            type="button"
            onClick={(e) => handleSubRegionButton(e)}
          >
            Deceased
          </button>
        </SideBarButtonStyles>
        <ul>
          {data.subRegions.map((subRegion) => (
            <li key={subRegion.name}>
              {subRegion.name} -{' '}
              {activeSubRegion === 'confirmed'
                ? numberWithCommas(subRegion.latest.confirmed)
                : numberWithCommas(subRegion.latest.deceased)}
            </li>
          ))}
        </ul>
      </div>
    </SideBarStyles>
  );
};

export default Sidebar;
