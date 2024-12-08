import { render } from 'preact';

import Home from './routes/home';

import './style.css';

export function App() {

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Home/>
			
		</div>	
	);
}

render(<App />, document.getElementById('app'));
