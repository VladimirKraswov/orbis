import { render } from 'preact';
import AppRoutes from './routes/AppRoutes';
import './style.css';

const rootElement = document.getElementById('app');
render(<AppRoutes />, rootElement);
