import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Map from './components/Map.jsx'

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Map />
      </div>
    </Provider>
  );
}

export default App;
