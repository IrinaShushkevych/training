import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, storePersist } from './redux/store'
import './index.scss'
import App from './App'
import './services/firebase'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate persistor={storePersist}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
