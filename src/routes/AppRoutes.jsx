import Router, { Route } from 'preact-router';

import { HomePage, NotFoundPage } from '../pages';
import { SettingsProvider } from '../providers/Settings';
import { MachineProvider } from '../providers/machine';


const AppRoutes = () => (
  <SettingsProvider>
    <MachineProvider>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route default component={NotFoundPage} />
      </Router>
    </MachineProvider>
  </SettingsProvider>
);

export default AppRoutes;
