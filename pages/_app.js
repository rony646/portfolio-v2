import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #161616;
    color: #cdcfd1;
    font-family: 'Urbanist', Impact;
    padding: 0;
    margin: 0;
  }
`

const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;400;500&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default MyApp
