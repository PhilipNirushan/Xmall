import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Components/Navbar/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Container>
          <h1>Welcome To Xmall</h1>
        </Container>
      </main> 
    </div>
  );
}

export default App;
