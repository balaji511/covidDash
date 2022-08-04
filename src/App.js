import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateDetailedView from './components/StateDetailedView'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={StateDetailedView} />
    <Route path="/not-found" component={NotFound} />

    <Redirect to="/not-found" />
  </Switch>
)

export default App
