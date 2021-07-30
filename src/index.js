import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './components/list/List';
import NotFound from './components/notFound/NotFound'
import Detail from './components/detail/Detail'
import './index.css';

import Header from './components/common/Header';
// import App from './components/App';
import * as serviceWorker from './serviceWorker';
// import { ReactComponent } from '*.svg';

require('bootstrap');

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />

                <Switch>
                    <Route path="/" component={List} exact/>
                    <Route path='/currency/:id' component={Detail} exact />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
