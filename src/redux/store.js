import { createStore } from 'redux'
import rootReducer from './reducers/index'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'numbers',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/* eslint-disable no-underscore-dangle */
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

const persistor = persistStore(store)
if (window.Cypress) {
  window.store = store
}

export { store, persistor }
