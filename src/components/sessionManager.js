import { createStore } from 'redux';

const sayHiOnDispatch = (createStore) => {
    return (rootReducer, preloadedState, enhancers) => {
      const store = createStore(rootReducer, preloadedState, enhancers)
  
      function newDispatch(action) {
        const result = store.dispatch(action)
        console.log('Hi!')
        return result
      }
  
      return { ...store, dispatch: newDispatch }
    }
  }

const preloadedState = {
    token: sessionStorage.getItem('userToken')
}

function rootReducer(state = preloadedState, action) {
    switch (action.type) {
        case 'setAuth':
            sessionStorage.setItem('userToken',action.payload);
            return {token: action.payload};
        case 'unsetAuth':
            return {token: undefined};
        default:
            return state
    }
}

const store = createStore(rootReducer, preloadedState, sayHiOnDispatch);
const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState(),'====')
)

export default store;