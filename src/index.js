import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

let 초기값 = [
  { id: 0, name: '멋진신발1', quan: 2 },
  { id: 1, name: '멋진신발2', quan: 1 },
  { id: 2, name: '멋진신발3', quan: 4 },
  { id: 3, name: '멋진신발4', quan: 5 },
  { id: 4, name: '멋진신발5', quan: 1 },
  { id: 5, name: '멋진신발6', quan: 3 },
  { id: 6, name: '멋진신발7', quan: 2 },
];

function reducer(state = 초기값, 액션) {
  if (액션.type === '수량증가') {
    let copy = [...state];
    copy[0].quan++;
    return copy;
  }
  if (액션.type === '수량감소') {
    let copy = [...state];
    if (copy[0].quan === 0) {
      return copy;
    }
    copy[0].quan--;
    return copy;
  }
  return state;
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
