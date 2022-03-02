import { combineReducers, createStore } from 'redux';

function reducer2(state = true, 액션) {
  if (액션.type === 'true로') {
    return true;
  }
  if (액션.type === 'false로') {
    return false;
  }
  return state;
}

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

let store = createStore(combineReducers({ reducer, reducer2 }));

export default store;
