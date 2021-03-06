import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import MainDashboard from '../components/MainDashboard';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';

const HomePageStyles = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr;
  gap: 2rem;
  width: 100%;
  margin-top: 5rem;
`;

const MainContentStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 6rem;
`;

export default function Home() {
  return (
    <HomePageStyles>
      <Head>
        <title>Coronavirus Tracker</title>
      </Head>
      <Sidebar />
      <MainContentStyles>
        <MainDashboard />
        <Map />
        {/* <Timeline /> */}
      </MainContentStyles>
    </HomePageStyles>
  );
}
