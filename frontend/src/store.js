import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { shopListReducer, shopDetailsReducer } from './reducers/shopReducer'
import { eventListReducer, eventDetailsReducer } from './reducers/eventReducer'

const reducer = combineReducers({
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
})

const initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
