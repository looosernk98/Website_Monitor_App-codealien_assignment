import './App.css';
import Home from './Home'
import Page from './Page'
import {BrowserRouter, Switch,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/report" component={Page}/>
       </Switch>
    </div>
  );
}

export default App;
