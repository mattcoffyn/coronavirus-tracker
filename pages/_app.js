import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import Layout from '../components/Layout';
import withData from '../lib/withData';
import '../static/nprogress.css';
import '../components/styles/Switch.css';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

MyApp.getInitalProps = async function ({ component, ctx }) {
  let pageProps = {};
  if (component.getInitalProps) {
    pageProps = await component.getInitalProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
