import logo from './logo.svg';
import './App.css';
import { React, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

//import components
import NavBar from './NavBar'
import Login from './Login'
import CreateLogin from './CreateLogin'
import Home from './Home'
import SelectGameMode from './SelectGameMode'


function App() {
  const [loginValidated, setLoginValidated] = useState(false)
  const [selectedMap, setSelectedMap] = useState("")
  const [selectedChampion, setSelectedChampion] = useState([])
  const [selectedGameMode, setSelectedGameMode] = useState("")
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: ""
  })
  const history = useHistory()

  if (loginValidated===false) {
    history.push('/login')
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
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
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              loginValidated={loginValidated}
              setLoginValidated={setLoginValidated}
            />
          </Route>
          <Route exact path ="/createlogin">
            <CreateLogin />
          </Route>
          <Route exact path ="/selectgamemode">
            <SelectGameMode 
              selectedMap={selectedMap}
              setSelectedMap={setSelectedMap}
              selectedGameMode={selectedGameMode}
              setSelectedGameMode={setSelectedGameMode}
            />
          </Route>
          <Route exact path="/">
            <Home 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              selectedMap={selectedMap}
              setSelectedMap={setSelectedMap}
              selectedChampion={selectedChampion}
              setSelectedChampion={setSelectedChampion}
              selectedGameMode={selectedGameMode}
              setSelectedGameMode={setSelectedGameMode}
            />
          </Route>
        </Switch>
      </div>
    )
  }
  }

export default App;
