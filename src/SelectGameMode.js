let SelectGameMode = () => {
    return (<div className="home-container">
        <div className='summoners-rift'>
            <h1>Summoner's Rift</h1>
        </div>
        <div className='select-game-mode-container'>
             <button className="select-game-mode-button">1 v 1</button>
             <button className="select-game-mode-button">2 v 2</button>
        </div>
        <div className='howling-abyss'>
            <h1>Howling Abyss</h1>
        </div>

    </div>)
}

export default SelectGameMode