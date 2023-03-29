import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducer/rootReducer';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'persist',
  storage,
  transforms:[
    encryptTransform({
      secretKey:"Deneme",
      onError:function(error){
          localStorage.clear();
          persistor.purge();
          window.location.reload(true);
      },
    }),
  ],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer);
let persistor = persistStore(store)
ReactDOM.render(
   <Provider store = {store}> <PersistGate loading={null} persistor={persistor}><App /></PersistGate></Provider> 
  ,
  document.getElementById('root')
);

