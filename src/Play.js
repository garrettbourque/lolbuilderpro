import { React, useState, useEffect } from 'react'
import {useParams, useHistory} from "react-router-dom"
import Search from './Search'
let Play = ({currentUser,setCurrentUser,selectedChampion,setSelectedChampion}) => {
    const [itemData, setItemData] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [championData, setChampionData] = useState([])
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("");
    
    const [champStat, setChampStat] = useState([
        {hp:''},
        {hpperlevel:''},
        {mp:''},
        {mpperlevel:''},
        {movespeed:''  },
        {armor:''},{armorperlevel:''},{spellblock:''},
        {spellblockperlevel:''},{attackrange:''},{hpregen:''},
        {hpregenperlevel:''},{mpregen:''},{mpregenperlevel:''},
        {crit:''},{critperlevel:''},{attackdamage:''},
        {attackdamageperlevel:''},{attackspeedperlevel:''},{attackspeed:''}
        
    ])
     
    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/item.json')
        .then(res => res.json())
        .then(data => {
            setItemData(data.data)
        })
    },[])
 
    const handleSelectedItem=()=>{
       // console.log("you selected"+selectedItem.name)
     }
     //Select a filtered list of champs when entering a search
     const itemsToDisplay = Object.values(itemData).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
     ); 

     const displayStats=()=>{
         let number=0
        Object.values(selectedChampion.stats).map(status=>{
            console.log(status)
            //console.log(Object.values(selectedChampion.stats[status]))
            console.log(champStat[number])
           // setChampStat({...champStat})
           number++
        })
       
       // console.log("stat "+champStat)


       //  console.log("stat"+Object.values(selectedChampion.stats)[0])
        // console.log("stat"+Object.keys(selectedChampion.stats)[0])
        return  <div>
                    <div>{selectedChampion.name} Stats</div>
                    {Object.keys(selectedChampion.stats).map(element => {
                            //console.log(element)
                          return  (<div>{element+" "}</div>)
                   
                        
                     })}
                </div> 
     }
 
    return (
        <div className='main-container'>
            <div className="game-setup-container">
                <div><b>Map:</b> {}</div>
                <div><b>Champion:</b> {selectedChampion.name} {selectedChampion.title}</div>
                <div><b>Game Mode:</b> </div>
            </div>
 
            <div className='action-container'>
                <div className='champion-viewer-container'
                    style={{backgroundImage: `url(
                    http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.name}_0.jpg)`}}
                >
                    <h3 className="selected-champion-info">{selectedChampion.name} {selectedChampion.title}</h3>
                    <div className="champion-description">{displayStats()}</div>
                </div>
                <div className='play-container'>
                    <div className="select-game">
                        <button className="select-game-button" >Select your Items</button>
                    </div>
                    <div className="play-card">
                        <button className="play-button">Play</button>
                    </div>
 
                </div>
                <div className='new-builds-container'>
                    <b>Select your Item</b>
                    <Search  searchTerm={searchTerm} onChangeSearch={setSearchTerm}/>
                    {Object.values(itemsToDisplay).map(item => {
                    return (
                        <div className="champion-container" key={item.id} onClick={() => handleSelectedItem(selectedChampion)}>
                            <h3 className='champion-name'>{item.name}</h3>
                            <img className='champion-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${item.image.full}`} alt="broken"/>
                        </div>
                    )
                    })}
                </div>
            </div>
            <div className="return-home" >
                <button className ="back-button" onClick={()=>history.push('/')}>Home</button>
            </div>
            <div className="user-information">
                <b>Current User: {currentUser.username} </b>
                <button className="logout-button" onClick={() => {
                    history.push('/login')
                    setCurrentUser({
                        username: "",
                        password: ""
                    })
                    }}>Logout</button>
            </div>
        </div>)
}
 
export default Play

