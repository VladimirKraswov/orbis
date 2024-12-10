import { h } from 'preact';
import Router, { Route } from 'preact-router';
import { HomePage, NotFoundPage } from '../pages';
import { WebSocketProvider } from '../providers/WebSocketContext';


const AppRoutes = () => (
  <WebSocketProvider>
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route default component={NotFoundPage} />
    </Router>
  </WebSocketProvider>
);

export default AppRoutes;
