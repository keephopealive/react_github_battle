const React = require('react');
const ReactDOM = require('react-dom');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Switch = ReactRouter.Switch;
const Results = require('./Results');

class App extends React.Component {
    render() {
        return (
            <Router>
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
            </Router>
        )
    }
}

module.exports = App;