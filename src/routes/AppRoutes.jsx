import Router, { Route } from 'preact-router';

import { HomePage, NotFoundPage } from '../pages';
import { WebSocketProvider } from '../providers/WebSocketContext';
import { SettingsProvider } from '../providers/Settings';


const AppRoutes = () => (
  <SettingsProvider>
    <WebSocketProvider>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route default component={NotFoundPage} />
      </Router>
    </WebSocketProvider>
  </SettingsProvider>
);

export default AppRoutes;
