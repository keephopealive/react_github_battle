import React from 'react';
import { 
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

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

export default App;