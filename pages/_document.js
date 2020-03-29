import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import flush from 'styled-jsx/server';

class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const { html, head, errorHtml, chunks } = renderPage();
        const styles = flush();      
        return { html, head, errorHtml, chunks, styles };
    }
    render() {
        return (
            <html lang="en">
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no" />
                    <meta name="description" content="Login forms" />
                    <meta name="author" content="MatrixMMO" />
                    <link rel="shortcut icon" href="/images/favicon2.png"></link>

                    <link href="/css/bootstrap.min.css" rel="stylesheet" />
                    <link href="/css/common.css" rel="stylesheet" />
                    <link href="/css/css" rel="stylesheet" />
                    <link href="/css/theme-03.css" rel="stylesheet" />
                  
                    <script src="/js/jquery.min.js"></script>
                    <script src="/js/main.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />

                </body>
            </html>
        );
    }
}


export default MyDocument;
