import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import { PROJECT_DETAIL, INDEX, NO_MATCH } from '@/config/routers'
import reportWebVitals from '@/reportWebVitals'
import Loading from '@/components/Loading'
import Provider from '@/Provider'
import { createGlobalStyle } from 'styled-components'

const EventList = React.lazy(() => import('@/pages/ProjectDetail'))

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    margin: 0;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    word-break: break-word;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path={INDEX} element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path={PROJECT_DETAIL}
              element={
                <Suspense fallback={<Loading />}>
                  <EventList />
                </Suspense>
              }
            />
            <Route path={NO_MATCH} element={<Navigate to={INDEX} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
