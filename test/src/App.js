import React from 'react';
import './App.css';
import Root from './Root';
import { AuthProvider } from './Auth/AuthService';

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Root />
			</AuthProvider>
		</div>
	);
}

export default App;
