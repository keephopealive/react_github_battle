const React = require('react');
const ReactDOM = require('react-dom');

require('./index.css');

let App = require('./components/App');


ReactDOM.render(
    <App />,
    document.getElementById('app')
);