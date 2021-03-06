import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const VectorMap = dynamic(
  () => import('react-jvectormap').then((m) => m.VectorMap),
  { ssr: false }
);

const MapBoxStyles = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: var(--maxWidth);
`;

const LoadingMap = () => {
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
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: '#e4e4e4',
            'fill-opacity': 0.2,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 0,
          },
        }}
      />
    </MapBoxStyles>
  );
};
export default LoadingMap;
