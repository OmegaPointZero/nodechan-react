import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './App';
import Board from './Components/Board';
import Thread from './Components/Thread';
import Catalog from './Components/Catalog';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';


ReactDOM.render((

    <Router>
        <div>
            <Route exact path = "/" component = {App} />
            <Route path = "/catalog/:board/" component = {Catalog} />
            <Route path = "/boards/:board/:page?" component = {Board} />
            <Route path = "/:board/thread/:thread" component = {Thread} /> 
        </div>
    </Router>

), document.getElementById('root'));



registerServiceWorker();
