import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Navbar/Header'
import Footer from './Components/Footer/Footer'
import RegisterScreen from './Screens/RegisterScreen'
import LoginScreen from './Screens/LoginScreen'
import ShopScreen from './Screens/ShopScreen'
import EachShopScreen from './Screens/EachShopScreen'
import ContactScreen from './Screens/ContactScreen'
import Home from './Screens/HomeScreen/Home'
import EventScreen from './Screens/EventScreen'
import EachEventScreen from './Screens/EachEventScreen'
import CartScreen from './Screens/CartScreen'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Route path='/' component={Home} exact />
        <Route path='/shops' component={ShopScreen} exact />
        <Route path='/shops/:id' component={EachShopScreen} />
        <Route path='/contact' component={ContactScreen} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/events' component={EventScreen} exact />
        <Route path='/events/:id' component={EachEventScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Footer />
      </div>
    </Router>
  )
}
export default App
