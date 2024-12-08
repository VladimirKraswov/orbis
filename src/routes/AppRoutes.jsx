import { h } from 'preact';
import Router, { Route } from 'preact-router';
import { HomePage, NotFoundPage } from '../pages';

const AppRoutes = () => (
  <Router>
    <Route path="/" component={HomePage} />
    <Route path="/home" component={HomePage} />
    <Route default component={NotFoundPage} />
  </Router>
);

export default AppRoutes;
