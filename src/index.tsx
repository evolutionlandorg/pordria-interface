import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import Main from '@/main'
import Home from '@/pages/Home'
import { PROJECT_DETAIL, INDEX, NO_MATCH } from '@/config/routers'
import reportWebVitals from '@/reportWebVitals'
import Loading from '@/components/Loading'
import Provider from '@/Provider'

const ProjectDetail = React.lazy(() => import('@/pages/ProjectDetail'))

ReactDOM.render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path={INDEX} element={<Main />}>
            <Route index element={<Home />} />
            <Route
              path={PROJECT_DETAIL}
              element={
                <Suspense fallback={<Loading />}>
                  <ProjectDetail />
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
