import './App.css';
import { React, useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

//import components
import Login from './Login'
import CreateLogin from './CreateLogin'
import Home from './Home'
import SelectGameMode from './SelectGameMode'

import Play from './Play'

import Battle from './Battle'


function App() {
  const [loginValidated, setLoginValidated] = useState(true)
  const [selectedMap, setSelectedMap] = useState("")
  const [opponentChampion, setOpponent] = useState("")
  const [selectedChampion, setSelectedChampion] = useState([])
  const [selectedGameMode, setSelectedGameMode] = useState("")
  const [highlightGameMode1v1, setHighlightGameMode1v1] = useState("false")
  const [highlightGameMode2v2, setHighlightGameMode2v2] = useState("false")
  const [highlightMapSR, setHighlightMapSR] = useState("false")
  const [highlightMapHA, setHighlightMapHA] = useState("false")
  const [itemData, setItemData] = useState([])
  const [selectedItems, setSelectedItems] = useState([null,null,null,null,null,null])
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: ""
  })
  const history = useHistory()

  useEffect(() => {
    fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/item.json')
    .then(res => res.json())
    .then(data => {
        setItemData(data.data)
    })
  },[])

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
              itemData={itemData}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              selectedMap={selectedMap}
              opponentChampion={opponentChampion}
              selectedChampion={selectedChampion}
              selectedGameMode={selectedGameMode}
              selectedItems={selectedItems}
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
              opponentChampion={opponentChampion}
              setOpponent={setOpponent}
              selectedGameMode={selectedGameMode}
              setSelectedGameMode={setSelectedGameMode}
            />
          </Route>
          <Route exact path="/play/:id">
            <Play 
              itemData={itemData}
              setItemData={setItemData}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              selectedChampion={selectedChampion}
              selectedGameMode={selectedGameMode}
              selectedMap={selectedMap}
              setSelectedChampion={setSelectedChampion}

            />
          </Route>
        </Switch>
      </div>
    )
  }
  }

export default App;