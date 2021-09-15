
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
      <GlobalStyle />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default MyApp
