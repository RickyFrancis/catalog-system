import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components Import
import Header from './components/Header';
import Footer from './components/Footer';

// Screens import
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateCatalogScreen from './screens/CreateCatalogScreen';
import EditCatalogScreen from './screens/EditCatalogScreen';
import ViewCatalogScreen from './screens/ViewCatalogScreen';

import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Route path="/create-catalog" component={CreateCatalogScreen} />
          <Route path="/edit-catalog/:id" component={EditCatalogScreen} />
          <Route path="/view-catalog/:id" component={ViewCatalogScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
