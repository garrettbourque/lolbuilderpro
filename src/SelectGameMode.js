import { useHistory } from 'react-router-dom'

let SelectGameMode = ({ 
        highlightGameMode1v1, setHighlightGameMode1v1,
        highlightGameMode2v2, setHighlightGameMode2v2,
        highlightMapSR, setHighlightMapSR,
        highlightMapHA, setHighlightMapHA,
        selectedMap, setSelectedMap, 
        selectedGameMode, setSelectedGameMode }) => {
    const history = useHistory()

    let handleSelectMap = (e) => {
        setSelectedMap(e.target.textContent)
        if(e.target.textContent==="Summoner's Rift") {
            setHighlightMapHA(false)
            setHighlightMapSR(!highlightMapSR)
        } else {
            setHighlightMapSR(false)
            setHighlightMapHA(!highlightMapHA)
        }
    }

    let handleSelectGameMode = (e) => {
        setSelectedGameMode(e.target.id)
        if(e.target.id==="1v1") {
            setHighlightGameMode2v2(false)
            setHighlightGameMode1v1(!highlightGameMode1v1)
        } else {
            setHighlightGameMode1v1(false)
            setHighlightGameMode2v2(!highlightGameMode2v2)
        }
                
        // if(selectedMap!=="" && selectedGameMode!=="") {
        //     history.push('/')
        // }
    }

    let handleGoBack= () => {
        history.push('/')
    }

    return (
        <div className="action-container">
            <button 
                id="summoners-rift" 
                className='summoners-rift' 
                onClick={(e) => handleSelectMap(e)}
                style={highlightMapSR===true ? {border:"5px solid yellowgreen"} : {border:"none"}}>
                Summoner's Rift
            </button>
            <div className='select-game-mode-container'>
                <button 
                    id="1v1" 
                    className="select-game-mode-button" 
                    onClick={(e) => handleSelectGameMode(e)}
                    style={highlightGameMode1v1===true ? {border:"5px solid yellowgreen"} : {border:"none"}}
                        >1 v 1
                </button>
                <button 
                    id="2v2" 
                    className="select-game-mode-button" 
                    onClick={(e) => handleSelectGameMode(e)}
                    style={highlightGameMode2v2===true ? {border:"5px solid yellowgreen"} : {border:"none"}}
                        >2 v 2
                </button>
                <button className="go-back" onClick={()=> handleGoBack()}>Go back</button>
            </div>
            <button 
                id="Howling Abyss" 
                className='howling-abyss' 
                onClick={(e) => handleSelectMap(e)}
                style={highlightMapHA===true ? {border:"5px solid yellowgreen"} : {border:"none"}}
                >
                Howling Abyss
            </button>

        </div>)
}

export default SelectGameMode