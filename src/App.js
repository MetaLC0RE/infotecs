import React from 'react';
import Users from './components/Users';
import './css/main.css'

class App extends React.Component {
  render() {
    return (<div>
      <main>
        <Users />
      </main>
    </div>)
  }
}

export default App