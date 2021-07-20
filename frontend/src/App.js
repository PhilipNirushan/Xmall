import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Navbar/Header'
// import Footer from './Components/Footer/Footer'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import LoginScreen from './Screens/LoginScreen'
import ShopScreen from './Screens/ShopScreen'
import EachShopScreen from './Screens/EachShopScreen'
import ContactScreen from './Screens/ContactScreen'
import Home from './Screens/HomeScreen/Home'
import AboutScreen from './Screens/AboutScreen'
import EventScreen from './Screens/EventScreen'
import EachEventScreen from './Screens/EachEventScreen'
import CartScreen from './Screens/CartScreen'
import PaymentScreen from './Screens/PaymentScreen'
import MakeBookingScreen from './Screens/MakeBookingScreen'
import BookingScreen from './Screens/BookingScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ShopListScreen from './Screens/ShopListScreen'
import EventListScreen from './Screens/EventListScreen'
import ShopEditScreen from './Screens/ShopEditScreen'
import EventEditScreen from './Screens/EventEditScreen'
import BookingListScreen from './Screens/BookingListScreen'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Route path='/' component={Home} exact />
        <Route path='/about' component={AboutScreen} />
        <Route path='/shops' component={ShopScreen} exact />
        <Route path='/shops/:id' component={EachShopScreen} />
        <Route path='/contact' component={ContactScreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/events' component={EventScreen} exact />
        <Route path='/events/:id' component={EachEventScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/makebooking' component={MakeBookingScreen} />
        <Route path='/booking/:id' component={BookingScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/admin/shoplist' component={ShopListScreen} />
        <Route path='/admin/shop/:id/edit' component={ShopEditScreen} />
        <Route path='/admin/eventlist' component={EventListScreen} />
        <Route path='/admin/event/:id/edit' component={EventEditScreen} />
        <Route path='/admin/bookinglist' component={BookingListScreen} />
        {/* <Footer /> */}
      </div>
    </Router>
  )
}
export default App
