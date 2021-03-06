import { gql, useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingMap from './LoadingMap';
const VectorMap = dynamic(
  () => import('react-jvectormap').then((m) => m.VectorMap),
  { ssr: false }
);

const MapBoxStyles = styled.section`
  margin: 0 auto;
  width: 100%;
  min-width: 500px;
  max-width: var(--maxWidth);
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--aqua);
`;

const GET_COUNTRY_TOTAL_CONFIRMED = gql`
  query GET_COUNTRY_TOTAL_CONFIRMED {
    countries(count: 1000) {
      results {
        code
        latest {
          confirmed
        }
      }
    }
  }
`;

const Map = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_COUNTRY_TOTAL_CONFIRMED);
  // const [mapData, setMapData] = useState({});

  if (loading) return <LoadingMap />;

  const findRoute = (item) => {
    return `/countries/${item}`;
  };

  let mapData = {};

  data.countries.results.map((country) => {
    mapData[country.code] = country.latest.confirmed;
  });

  return (
    <MapBoxStyles>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css"
          type="text/css"
          media="screen"
        />
      </Head>
      <VectorMap
        map={'world_mill'}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: '100%',
          height: '520px',
        }}
        onRegionClick={(e, countryCode) =>
          router.push({
            pathname: findRoute(countryCode),
          })
        } //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: '#e4e4e4',
            'fill-opacity': 0.9,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 0,
          },
          hover: {
            'fill-opacity': 0.8,
            cursor: 'pointer',
          },
          selected: {
            fill: '#2938bc', //color for the clicked country
          },
          selectedHover: {},
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ['#e4e4e4', '#ff0000'], //your color game's here
              normalizeFunction: 'polynomial',
            },
          ],
        }}
      />
    </MapBoxStyles>
  );
};
export default Map;
