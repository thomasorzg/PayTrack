import React, { Suspense } from 'react'
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Loader from "./utils/loader/loader.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
