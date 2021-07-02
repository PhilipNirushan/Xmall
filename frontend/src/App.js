import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css' 
// import ImageSlider from './Components/ImageSlider';
import Header from './Components/Navbar/Header';
// import AboutSection from './Screens/HomeScreen/AboutSection';
import Footer from './Components/Footer/Footer';
import RegisterScreen from './Screens/RegisterScreen';
// import Rough from './Screens/HomeScreen/Rough';
// import ProductScreen from './Screens/ProductScreen';
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
