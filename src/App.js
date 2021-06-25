import './App.css';
import { React, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

//import components
import NavBar from './NavBar'
import Login from './Login'
import CreateLogin from './CreateLogin'
import Home from './Home'
import SelectGameMode from './SelectGameMode'

import Play from './Play'

import Battle from './Battle'


function App() {
  const [loginValidated, setLoginValidated] = useState(false)
  const [selectedMap, setSelectedMap] = useState("")
  const [selectedChampion, setSelectedChampion] = useState([])
  const [selectedGameMode, setSelectedGameMode] = useState("")
  const [highlightGameMode1v1, setHighlightGameMode1v1] = useState("false")
  const [highlightGameMode2v2, setHighlightGameMode2v2] = useState("false")
  const [highlightMapSR, setHighlightMapSR] = useState("false")
  const [highlightMapHA, setHighlightMapHA] = useState("false")
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
              highlightGameMode1v1={highlightGameMode1v1}
              setHighlightGameMode1v1={setHighlightGameMode1v1}
              highlightGameMode2v2={highlightGameMode2v2}
              setHighlightGameMode2v2={setHighlightGameMode2v2}
              highlightMapSR={highlightMapSR}
              setHighlightMapSR={setHighlightMapSR}
              highlightMapHA={highlightMapHA}
              setHighlightMapHA={setHighlightMapHA}
              selectedMap={selectedMap}
              setSelectedMap={setSelectedMap}
              selectedGameMode={selectedGameMode}
              setSelectedGameMode={setSelectedGameMode}
            />
          </Route>
          <Route exact path ="/battle">
            <Battle 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              selectedMap={selectedMap}
              selectedChampion={selectedChampion}
              selectedGameMode={selectedGameMode}
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
          <Route exact path="/play/:id">
            <Play 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              selectedChampion={selectedChampion}
              setSelectedChampion={setSelectedChampion}

            />
          </Route>
        </Switch>
      </div>
    )
  }
  }

export default App;