import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter, Routes, Route } from 'react-router-dom'/*configuracion de react router dom */
import store from './store/index.js';//configuracion de redux
import { Provider } from 'react-redux';//configuracion de redux

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter> {/*configuracion de react router dom */}
    <Provider store={store}>{/*configuracion de redux*/}
      <App />
    </Provider>
  </HashRouter>
)
