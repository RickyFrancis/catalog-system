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
import RegisterUserScreen from './screens/RegisterUserScreen';
import LinkEmailVerifyScreen from './screens/LinkEmailVerifyScreen';

import { Container } from 'react-bootstrap';
import PrivateRoute from './routing/PrivateRoute';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <PrivateRoute exact path="/" component={HomeScreen} />

          <PrivateRoute
            path="/create-catalog"
            component={CreateCatalogScreen}
          />
          <PrivateRoute
            path="/edit-catalog/:id"
            component={EditCatalogScreen}
          />
          <PrivateRoute
            path="/view-catalog/:id"
            component={ViewCatalogScreen}
          />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterUserScreen} />
          <Route
            path="/verify/:id/:code"
            component={LinkEmailVerifyScreen}
            exact
          />
          <Route path="/reset" component={ResetPasswordScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
