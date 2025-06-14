// import './wdyr';
import * as serviceWorker from './serviceWorker';
import './i18n';
import {retry} from './utils/commonFunctions';

import {Suspense, lazy, StrictMode} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

const App = lazy(() => retry(() => import('./app')));
const rootElement = document.getElementById('root');

const main = () =>
  render(
    <Suspense fallback={<div />}>
      <Router>
        <StrictMode>
          <App />
        </StrictMode>
      </Router>
    </Suspense>,
    rootElement
  );

const browserSupportsAllFeatures = () => {
  return window.requestIdleCallback && window.IntersectionObserver;
};

const loadScript = (src, done) => {
  const js = document.createElement('script');
  js.src = src;
  js.onload = function () {
    done();
  };
  js.onerror = function () {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
};

if (browserSupportsAllFeatures()) {
  main();
} else {
  loadScript(
    'https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=requestIdleCallback%2CIntersectionObserver',
    main
  );
}

serviceWorker.register();
