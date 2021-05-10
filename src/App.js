import React,{Component} from 'react';
import Lay from './Lay';
import Home from './Home';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
class App extends Component {
  render(){
    return (
     
      <div>
        <Lay />
      </div>
      

    );
  }
}

export default App;
