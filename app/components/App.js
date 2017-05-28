import React from 'react';
import { 
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
const Popular = require('./Popular');
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Results = require('./Results');

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={()=>{
                            return (<h3>404 - Page not found...</h3>)
                        }} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

module.exports = App;