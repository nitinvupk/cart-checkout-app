import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';
import ErrorBoundary from './ErrorBoundary';

function App (props: {}) {
  return (
    <div>
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route exact path='/' component={Cart} />
            <Route path='/payment' component={CheckoutForm} />
          </Switch>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;