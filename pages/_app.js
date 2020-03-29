import App from 'next/app'
import React from 'react'
import Head from "next/head";
class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }
    render() {
        const { Component, pageProps } = this.props
        return (
            <React.Fragment>
                <Head>
                    <title>Demo NextJs And Custom Express</title>
                </Head>
                <Component {...pageProps} />
            </React.Fragment>
        )
    }
}

export default MyApp
