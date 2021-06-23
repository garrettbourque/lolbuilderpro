import logo from './logo.svg';
import './App.css';
import { React, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

//import components
import NavBar from './NavBar'
import Home from './Home'
import Login from './Login'
import CreateLogin from './CreateLogin'

function App() {
  const [loginValidated, setLoginValidated] = useState(true)
  const history = useHistory()

  if (loginValidated===false) {
    history.push('/login')
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login 
            loginValidated={loginValidated}
            setLoginValidated={setLoginValidated}
            />
          </Route>
          <Route exact path="/createlogin">
            <CreateLogin />
          </Route>
        </Switch>
      </div>
    )

  } else {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login 
              loginValidated={loginValidated}
              setLoginValidated={setLoginValidated}
            />
          </Route>
          <Route exact path ="/createlogin">
            <CreateLogin />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    )
  }
  }

export default App;