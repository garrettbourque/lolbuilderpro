import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

let Home = () => {
    const [leagueData, setLeagueData] = useState([])
    const [selectedChampion, setSelectedChampion] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        .then(res => res.json())
        .then(data => {
            setLeagueData(data.data)
            setSelectedChampion(Object.values(data.data)[Math.floor(Math.random() * Object.values(data.data).length)])
        })
    },[])
   
    let handleSelectChampion = (champion) => {
        console.log('you clicked this champion')
        setSelectedChampion(champion)
    }

    let handleSelectGameMode = () => {
        history.push('/selectgamemode')
    }

    return (<div className='home-container'>
        <div className='champion-viewer-container'
            style={{backgroundImage: `url(
            http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.name}_0.jpg)`}}
        >
            <h3 className="selected-champion-info">{selectedChampion.name} {selectedChampion.title}</h3>
            <div className="champion-description">{selectedChampion.blurb}</div>
        </div>
        <div className='play-container'>
            <div className="select-game">
                <button className="select-game-button" onClick={() => handleSelectGameMode()}><em>Select Game Mode</em></button>
            </div>
            <div className="play-card">
                <button className="play-button">Play</button>
            </div>
        </div>
        <div className='new-builds-container'>
            <b>Select your Champion</b>
            {Object.values(leagueData).map(champion => {
            return (
                <div className="champion-container" key={champion.id} onClick={() => handleSelectChampion(champion)}>
                    <h3 className='champion-name'>{champion.name}</h3>
                    <img className='champion-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champion.image.full}`} alt="broken"/>
                </div>
            )
            })}
        </div>
    </div>)
}


export default Home
