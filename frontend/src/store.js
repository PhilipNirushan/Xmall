import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { shopListReducer, shopDetailsReducer } from './reducers/shopReducer'
import { eventListReducer, eventDetailsReducer } from './reducers/eventReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
})

const cartItemsFormStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFormStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFormStorage },
  userLogin: { userInfo: userInfoFormStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
