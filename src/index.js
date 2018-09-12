import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import { fetchImagesAction } from './actions/imageActions';


const store = configureStore();

store.dispatch(fetchImagesAction());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
