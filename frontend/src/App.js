import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Components/Navbar/Header';
import Footer from './Components/Footer/Footer';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import ShopScreen from './Screens/ShopScreen';
import EachShopScreen from './Screens/EachShopScreen';
import ContactScreen from './Screens/ContactScreen';
import Home from './Screens/HomeScreen/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Route path='/' component={Home} exact/>
          <Route path='/shops' component={ShopScreen} exact/>
          <Route path='/shops/:id' component={EachShopScreen}/>
          <Route path='/contact' component={ContactScreen} exact/>
          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/register' component={RegisterScreen} exact/>
        <Footer/>
      </div>
    </Router>

  );
}
export default App;
