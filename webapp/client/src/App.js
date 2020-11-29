import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Menu from './Components/Menu'
import Home from './Components/Home'
import Photos from './Components/Photos'
import Schedule from './Components/Schedule'

function App() {
  return (
    <Router>      
      <Menu />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/photos' exact component={Photos} />
        <Route path='/schedule' exact component={Schedule} />
      </Switch>
    </Router>
  );
}

export default App;
