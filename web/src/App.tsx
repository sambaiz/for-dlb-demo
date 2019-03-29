import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Chart from './components/Chart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Provider } from 'unstated';

class App extends Component {
  render() {
    return (
      <Provider>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">PMX投与判定器</Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <div className="Form"><Form></Form></div>
          <div className="Chart"><Chart></Chart></div>
        </div>
      </Provider>
    );
  }
}

export default App;
