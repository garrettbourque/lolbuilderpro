import { React, useState, useEffect } from 'react'

let Home = () => {
    const [leagueData, setLeagueData] = useState([])
    const [selectedChampion, setSelectedChampion] = useState([])

    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
        .then(res => res.json())
        .then(data => {
            setLeagueData(data.data)
            setSelectedChampion(Object.values(data.data)[Math.floor(Math.random() * Object.values(data.data).length)])
            // console.log(leagueData.data)
            // console.log(leagueDataArray)
            //console.log(leagueDataArray)
            //leagueData.data.map(champion => console.log(champion))
        })
    },[])

    console.log(leagueData)
    console.log(selectedChampion)
   
    let handleSelectChampion = (champion) => {
        console.log('you clicked this champion')
        setSelectedChampion(champion)
    }

    // let renderChampion = (champion) => {
    //     return (
    //         <div>
    //             <h3>{champion.name}</h3>
    //             <h4>{champion.title}</h4>
    //             <img className="champion-sprite" src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champion.image.sprite}`} alt="broken"></img>
    //             <div className="champion-description">{champion.blurb}</div>
    //         </div>
    //     )
    // }

    return (<div className='home-container'>
        <div className='champion-viewer-container'
            style={{backgroundImage: `url(
            http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.name}_0.jpg)`}}
        >
            <h3>{selectedChampion.name}</h3>
            <h4>{selectedChampion.title}</h4>
            {/* <img className="champion-sprite" src={`
            http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.name}_0.jpg`} alt="broken"></img> */}
            <div className="champion-description">{selectedChampion.blurb}</div>
        </div>
        <div className='play-container'>
            <div className="select-game">
                <button className="select-game-button"><em>Select Game Mode</em></button>
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
