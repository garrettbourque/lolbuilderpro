import { useHistory } from 'react-router-dom'

let SelectGameMode = ({ selectedMap, setSelectedMap, selectedGameMode, setSelectedGameMode }) => {
    const history = useHistory()

    let handleSelectMap = (e) => {
        setSelectedMap(e.target.textContent)
        history.push('/')
    }

    let handleSelectGameMode = (e) => {
        setSelectedGameMode(e.target.id)
        console.log(selectedGameMode)
    }

    return (
        <div className="action-container">
            <button id="summoners-rift" className='summoners-rift' onClick={(e) => handleSelectMap(e)}>
                Summoner's Rift
            </button>
            <div className='select-game-mode-container'>
                <button id="1v1" className="select-game-mode-button" onClick={(e) => handleSelectGameMode(e)}>1 v 1</button>
                <button id="2v2" className="select-game-mode-button" onClick={(e) => handleSelectGameMode(e)}>2 v 2</button>
            </div>
            <button id="Howling Abyss" className='howling-abyss' onClick={(e) => handleSelectMap(e)}>
                Howling Abyss
            </button>

        </div>)
}

export default SelectGameMode