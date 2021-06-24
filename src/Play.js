import { React, useState, useEffect } from 'react'
import {useParams} from "react-router-dom"
let Play = () => {
    const [itemData, setItemData] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [championData, setChampionData] = useState([])
    const params = useParams()
    
    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/item.json')
        .then(res => res.json())
        .then(data => {
            setItemData(data.data)
        })
    },[])
    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        .then(res => res.json())
        .then(data => {
            setChampionData(data.data)
        })
    },[])
    
    console.log("on play")


    return (<div className='home-container'>
    <div className='champion-viewer-container'
        style={{backgroundImage: `url(
        http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg)`}}
    >
        <h3 className="selected-champion-info">{selectedItem.name} {selectedItem.title}</h3>
        <div className="champion-description">{selectedItem.blurb}</div>
    </div>
    <div className='play-container'>
        <div className="select-game">
            <button className="select-game-button" >Select Game Mode</button>
        </div>
        <div className="play-card">
            <button className="play-button"> Play</button>
        </div>
    </div>
    <div className='new-builds-container'>
        <b>Select your Items</b>
        
        {Object.values(itemData).map(champion => {
        return (
            <div className="champion-container" key={champion.id} >
                <h3 className='champion-name'>{champion.name}</h3>
                <img className='champion-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${champion.image.full}`} alt="broken"/>
            </div>
        )
        })}
    </div>
</div>)
}

export default Play