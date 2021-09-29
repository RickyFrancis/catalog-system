import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components Import
import Header from './components/Header';
import Footer from './components/Footer';

// Screens import
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
