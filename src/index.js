import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './App';
import Board from './Components/Board';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'

ReactDOM.render((

    <Router>
        <div>
            <Route exact path = "/" component = {App} />
            <Route path = "/boards/:board" component = {Board} />
        </div>
    </Router>

), document.getElementById('root'));



registerServiceWorker();
