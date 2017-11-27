import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    const formatName = function (user) {
      return user.firstName + ' ' + user.lastName;
    }

    const user = {
      firstName: 'Harper',
      lastName: 'Perez'
    }

    const elem = (
      <h1>hello, {formatName(user)}</h1>
    )

    return elem

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //       hello world
    //     </p>
    //   </div>
    // );
  }
}

export default App;
