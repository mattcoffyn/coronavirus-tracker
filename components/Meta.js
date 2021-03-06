import Head from 'next/head';
import Proptypes from 'prop-types';
import React from 'react';

const Meta = ({ pageName }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <title>{pageName} | Print Factory</title>
  </Head>
);

export default Meta;

Meta.propTypes = {
  pageName: Proptypes.string,
};
