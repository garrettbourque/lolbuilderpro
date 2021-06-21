import { React, useState, useEffect } from 'react'
import {useHistory} from "react-router-dom"
import Search from './Search'
import Item from './Item'

let Play = ({ itemData, setItemData, selectedItems, setSelectedItems, currentUser,setCurrentUser,selectedChampion, selectedGameMode, selectedMap}) => {
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("");
    const [hasItem2, setHasItem2]=useState([false,false,false,false,false,false])
    
    const iCanHas=(item)=>{
            let testCase=hasItem2.filter((checking)=>checking===false)
               if(testCase.length>0){
                let result= (hasItem2.indexOf(false))
                hasItem2[result]=true
                selectedItems[result]=(item)
                console.log(selectedItems[1])
            }
            else{alert('You already have enough items!')}
       
    } 
    const handleSelectedItem=(item)=>{
        console.log(item)
        iCanHas(item)
        console.log(hasItem2)
       
     }

    //Select a filtered list of champs when entering a search
    const itemsToDisplay = Object.values(itemData).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) 

    const displayStats=()=>{
        return (
            <div>
                <h3>{selectedChampion.name} stats</h3>
                <div>HP: {selectedChampion.stats.hp}</div>
                <div>MP: {selectedChampion.stats.mp}</div>
                <div>ATK: {selectedChampion.stats.attackdamage}</div>
                <div>ATK SPD: {selectedChampion.stats.attackspeed}</div>
                <div>DEF: {selectedChampion.stats.armor}</div>
                <div>MG DEF: {selectedChampion.stats.spellblock}</div>
                <div>HP RGN: {selectedChampion.stats.hpregen}</div>
                <div>MP RGN: {selectedChampion.stats.mpregen}</div>
                <div>CRT: {selectedChampion.stats.crt}</div>
            </div>
        )
        }
 
    return (
        <div className='main-container'>
            <div className="game-setup-container">
                <div><b>Map:</b> {selectedMap}</div>
                <div><b>Champion:</b> {selectedChampion.name} {selectedChampion.title}</div>
                <div><b>Game Mode:</b> {selectedGameMode}</div>
            </div>
 
            <div className='action-container'>
                <div className='champion-viewer-container' style={{backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.name}_0.jpg)`}}>
                    <h3 className="selected-champion-info">{selectedChampion.name} {selectedChampion.title}</h3>
                    <div className="champion-description">{displayStats()}</div>
                </div>
                <div className='play-container'>
                    <Item 
                        selectedItems={selectedItems}
                        hasItem2={hasItem2}
                    />
                </div>
                <div className='new-builds-container'>
                    <b>Select your Item</b>
                    <Search searchTerm={searchTerm} onChangeSearch={setSearchTerm}/>
                    {Object.values(itemsToDisplay).map(item => {
                    return (
                        <div className="champion-container" key={item.id} onClick={() => handleSelectedItem(item)}>
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

