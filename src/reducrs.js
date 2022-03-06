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
  { id: 0, name: 'White and Black', quan: 2 },
  { id: 1, name: 'Red Knit', quan: 1 },
];

function reducer(state = 초기값, 액션) {
  if (액션.type === '항목추가') {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id == 액션.payload.id) {
        let copy = [...state];
        copy[i].quan += Number(액션.payload.quan);
        return copy;
      }
    }
    let copy = [...state];
    copy.push(액션.payload);
    return copy;
  }
  if (액션.type === '수량증가') {
    let copy = [...state];
    copy[액션.payload.id].quan++;
    return copy;
  }
  if (액션.type === '수량감소') {
    let copy = [...state];
    if (copy[액션.payload.id].quan === 0) {
      return copy;
    }
    copy[액션.payload.id].quan--;
    return copy;
  }
  return state;
}

let store = createStore(combineReducers({ reducer, reducer2 }));

export default store;
