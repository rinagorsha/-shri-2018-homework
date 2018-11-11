import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppDesktop from './App/App@desktop';
import AppTouch from './App/App@touch';
import './store/eventsStore';
import './store/locationStore';
import './types';

let isTouchDevice: boolean = false;

if (('ontouchstart' in window) || navigator.msMaxTouchPoints) {
  isTouchDevice = true;
}

ReactDOM.render(
  isTouchDevice ? <AppTouch /> : <AppDesktop />,
  document.getElementById('root') as HTMLElement,
);
