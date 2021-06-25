import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

let Battle = ({ itemData, currentUser, setCurrentUser, selectedMap, selectedChampion, opponentChampion, selectedGameMode, selectedItems }) => {
    const history = useHistory();   
    const [healthState, setHealthState] = useState(selectedChampion.stats.hp)
    const [magicState, setMagicState] = useState(selectedChampion.stats.mp)
    const [attackState, setAttackState] = useState(selectedChampion.stats.attackdamage)
    const [defendState, setDefendState] = useState(selectedChampion.stats.armor)
    const [defenseModeOn, setDefenseModeOn] = useState(false)
    const [healthStateOpp, setHealthStateOpp] = useState("")
    const [magicStateOpp, setMagicStateOpp] = useState("")
    const [attackStateOpp, setAttackStateOpp] = useState("")
    const [defendStateOpp, setDefendStateOpp] = useState("")
    const [defenseModeOnOpp, setDefenseModeOnOpp] = useState(false)
    const [oppWepArray, setOppWepArray] = useState([])
    const [oppWep0, setOppWep0] = useState("")
    const [oppWep1, setOppWep1] = useState("")
    const [oppWep2, setOppWep2] = useState("")
    const [oppWep3, setOppWep3] = useState("")
    const [oppWep4, setOppWep4] = useState("")
    const [oppWep5, setOppWep5] = useState("")

    useEffect(()=> {
        setHealthStateOpp(opponentChampion.stats.hp)
        setMagicStateOpp(opponentChampion.stats.mp)
        setAttackStateOpp(opponentChampion.stats.attackdamage)
        setDefendStateOpp(opponentChampion.stats.armor)
        setOppWepArray(Object.values(itemData).map(item => item))

    },[opponentChampion])

    let handleAttack = (e) => {
        if((healthStateOpp-attackState)<0) {
            setHealthStateOpp(healthStateOpp-(healthStateOpp-0))
            alert('You won the battle. Returning to the Home Screen to start your next battle')
            history.push('/')
        } else if (defenseModeOnOpp===true) {
            if(defendStateOpp>=attackState) {
                alert(`Your opponent's defense completely blunted your attack. Luckily their armor needs to recharge`)
                setHealthStateOpp(healthStateOpp-attackState+defendStateOpp)
                setMagicState(magicState-(attackState/2))
                setDefendStateOpp(defendStateOpp/2)
                setDefenseModeOnOpp(true)
                randomMove()
            } else {
                alert(`Your opponent's defense blunted your attack. You attacked for ${attackState-defendStateOpp} damage!`)
                setHealthStateOpp(healthStateOpp-attackState+defendStateOpp)
                setMagicState(magicState-(attackState/2))
                setDefendStateOpp(defendStateOpp/2)
                setDefenseModeOnOpp(false)
                randomMove()
            }
        } else {
            alert(`You attacked for ${attackState-defendStateOpp} damage!`)
            setHealthStateOpp(healthStateOpp-attackState+defendStateOpp)
            setMagicState(magicState-(attackState/2))
            randomMove()
        }
    }
 
    let handleDefend = (e) => {
        if((healthState-attackStateOpp+(defendState*2))<0){
            alert('You lost the battle. Returning to the Home Screen to start your next battle')
            history.push('/')
        } else {
            alert(`You increased your defense by 2x until your opponent's next attack. Your defense is now ${defendState*2}!`)
            setDefendState(defendState*2)
            setDefenseModeOn(true)
            randomMove()
        }
    }

    let handleUseItem = (e) => {
        console.log(e.target.parentElement.parentElement)
    }

    let handleFlee = (e) => {
        alert('You fled the battle. Returning to the Home Screen to select a champion!')
        history.push('/')
    }

    let oppMoveArray = ["handleAttack", "handleDefend"]

    let randomMove = () => {
        let randomOppMove = oppMoveArray[Math.floor(Math.random()*oppMoveArray.length)]
        console.log(randomOppMove)
        switch(randomOppMove) {
            case "handleAttack":
                console.log('opp attack')
                if(healthState-attackStateOpp<0) {
                    alert('You lost the battle. Returning to the home page to start your next battle!')
                    history.push('/')
                } else if (defenseModeOn===true) {
                    if(defendState>attackStateOpp) {
                        alert('Your defense completely stopped their attack! Unfortunately, your armor needs to be fixed and your defense has been cut in half!')
                        setMagicStateOpp(magicStateOpp-(attackStateOpp/2))
                        setDefendState(defendState/2)
                        setDefenseModeOn(false)
                    } else if (defendState>attackStateOpp){
                        alert('Your defense completely stopped their attack! Unfortunately, your armor needs to be fixed and your defense has been cut in half!')
                        setMagicStateOpp(magicStateOpp-(attackStateOpp/2))
                        setDefendState(defendState/2)
                        setDefenseModeOn(false)
                    } else {
                        alert(`Your defense worked! You reduced the damage of your opponent's attack! Your opponent attacked for ${attackStateOpp-defendState} damage!`)
                        setHealthState(healthState-attackStateOpp+defendState)
                        console.log(healthState)
                        setMagicStateOpp(magicStateOpp-(attackStateOpp/2))
                        setDefendState(defendState/2)
                        setDefenseModeOn(false)
                    }
                } else {
                    alert(`Your opponent attacked for ${attackStateOpp-defendState} damage!`)
                    setHealthState(healthState-attackStateOpp+defendState)
                    console.log(healthState)
                    setMagicStateOpp(magicStateOpp-(attackStateOpp/2))
                }
                break;
            case "handleDefend":
                if((healthStateOpp-attackState+(defendStateOpp*2))<0){
                    alert('You won the battle! Returning to the Home Screen to start your next battle')
                    history.push('/')
                } else {
                    setDefendStateOpp(defendStateOpp*2)
                    alert(`Your opponent increased their defense by 2x until your next attack!`)
                    setDefenseModeOnOpp(true)
                }
                break;
        }
    }

    let handleImportItems = () => {
        setOppWepArray(Object.values(itemData).map(item => item))
        setOppWep0(oppWepArray[Math.floor(Math.random()*oppWepArray.length)])
        setOppWep1(oppWepArray[Math.floor(Math.random()*oppWepArray.length)])
        setOppWep2(oppWepArray[Math.floor(Math.random()*oppWepArray.length)])
        setOppWep3(oppWepArray[Math.floor(Math.random()*oppWepArray.length)])
        setOppWep4(oppWepArray[Math.floor(Math.random()*oppWepArray.length)])
        setOppWep5(oppWepArray[Math.floor(Math.random()*oppWepArray.length)])

    }

    return (
        <div className="main-container" id={selectedChampion.name}>
            <div className="game-setup-container">
                <div><b>Map:</b> {selectedMap}</div>
                <div><b>Champion:</b> {selectedChampion.name} {selectedChampion.title}</div>
                <div><b>Game Mode:</b> {selectedGameMode}</div>
            </div>
            <div className="action-container">
                <div className="player-container">
                    <b>Name: {selectedChampion.name}</b>
                    <div 
                        className="champion-battle-image"
                        style={{backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChampion.name}_0.jpg)`}}>
                    </div>
                    <div className="items-stats-container">
                        <div className="stats">
                            <div className="health-stats">
                                <h5>HP: {healthState}</h5>
                                <h5>MP: {magicState}</h5>
                            </div>
                            <div className="fight-stats">
                                <h5>ATK: {attackState}</h5>
                                <h5>DEF: {defendState}</h5>
                            </div>
                        </div>
                        <div className="items">
                            <img className='battle-item-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[0].image.full}`} alt="Pick an Item"/>
                            <img className='battle-item-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[1].image.full}`} alt="Pick an Item"/>
                            <img className='battle-item-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[2].image.full}`} alt="Pick an Item"/>
                            <img className='battle-item-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[3].image.full}`} alt="Pick an Item"/>
                            <img className='battle-item-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[4].image.full}`} alt="Pick an Item"/>
                            <img className='battle-item-image' src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[5].image.full}`} alt="Pick an Item"/>
                        </div>
                    </div>
                    <div className="movelist">
                        <button className="move-button" onClick={(e) => handleAttack(e)}>Attack</button>
                        <button className="move-button" onClick={(e) => handleDefend(e)}>Defend</button>
                        <button className="move-button" onClick={(e) => handleUseItem(e)}>Use Item</button>
                        <button className="move-button" onClick={(e) => handleFlee(e)}>Flee</button>
                    </div>
                </div>
                <div className="versus-container">
                    <h2 className="versus">VS</h2>
                </div>
                <div className="player-container">
                    <b>Name: {opponentChampion.name} </b> 
                    <div 
                        className="champion-battle-image" 
                        style={{backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${opponentChampion.name}_0.jpg)`}}
                        >

                    </div>
                    <div className="items-stats-container">
                        <div className="stats">
                            <div className="health-stats">
                                <h5>HP: {healthStateOpp}</h5>
                                <h5>MP: {magicStateOpp}</h5>
                            </div>
                            <div className="fight-stats">
                                <h5>ATK: {attackStateOpp}</h5>
                                <h5>DEF: {defendStateOpp}</h5>
                            </div>
                        </div>
                        <div className="items">
                            <img className='battle-item-image' src={oppWep0 !=="" ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${oppWep0.image.full}` : null } alt="Pick an Item"/> 
                            <img className='battle-item-image' src={oppWep1 !=="" ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${oppWep1.image.full}` : null } alt="Pick an Item"/>
                            <img className='battle-item-image' src={oppWep2 !=="" ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${oppWep2.image.full}` : null } alt="Pick an Item"/>
                            <img className='battle-item-image' src={oppWep3 !=="" ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${oppWep3.image.full}` : null } alt="Pick an Item"/>
                            <img className='battle-item-image' src={oppWep4 !=="" ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${oppWep4.image.full}` : null } alt="Pick an Item"/>
                            <img className='battle-item-image' src={oppWep5 !=="" ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${oppWep5.image.full}` : null } alt="Pick an Item"/>
                        </div>
                        <div>
                            <button onClick={()=> handleImportItems()}>Import Items</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-information">
                <b>Current User: {currentUser.username} </b>
                <button className="go-back" onClick={() => { history.push('/')}}>Go back</button>
                <button 
                    className="logout-button" 
                    onClick={() => {
                    history.push('/login')
                    setCurrentUser({
                        username: "",
                        password: ""
                    })
                    }}
                >Logout</button>
            </div>
        </div>
    )
}

export default Battle