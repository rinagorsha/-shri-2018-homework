import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/App';
import './store/eventsStore';
import './store/locationStore';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
