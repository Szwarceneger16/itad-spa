import { createStore } from 'redux';

const itemName = 'userData';

const preloadedState = {
  [itemName]: undefined,
}

if ( sessionStorage.getItem(itemName) ) {
  try {

    preloadedState[itemName] = JSON.parse(sessionStorage.getItem(itemName))
  } catch (error) {

  } 
  sessionStorage.removeItem(itemName);
}

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

function rootReducer(state = preloadedState, action) {
  switch (action.type) {
      case 'setAuth':
          return {[itemName]: action.payload[itemName]};
      case 'unsetAuth':
          return {[itemName]: undefined};
      default:
          return state
  }
}

const store = createStore(rootReducer, preloadedState);
const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState(),'====')
)

window.addEventListener("beforeunload", () => {

  sessionStorage.setItem(itemName,JSON.stringify(store.getState()[itemName]) );
});

console.log('store',sessionStorage.getItem(itemName),store.getState())

export { store as sessionManager};