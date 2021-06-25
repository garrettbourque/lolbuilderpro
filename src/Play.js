import { React, useState, useEffect } from 'react'
import {useParams, useHistory} from "react-router-dom"
import Search from './Search'
import Item from './Item'
let Play = ({currentUser,setCurrentUser,selectedChampion,setSelectedChampion}) => {
    const [itemData, setItemData] = useState([])
    const [selectedItems, setSelectedItems] = useState([null,null,null,null,null,null])
    const [championData, setChampionData] = useState([])
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("");
    const tempStat=[]

    const [hasItem2, setHasItem2]=useState([false,false,false,false,false,false])
    const [champStat, setChampStat] = useState({
        hp:'',
        hpperlevel:'',
        mp:'',
        mpperlevel:'',
        movespeed:''  ,
        armor:'',armorperlevel:'',spellblock:'',
        spellblockperlevel:'',attackrange:'',hpregen:'',
        hpregenperlevel:'',mpregen:'',mpregenperlevel:'',
        crit:'',critperlevel:'',attackdamage:'',
        attackdamageperlevel:'',attackspeedperlevel:'',attackspeed:''
        
});
     let statList=['hp','hpperlevel','mp','mpperlevel','movespeed','armor','armorperlevel','spellblock','spellblockperlevel','attackrange','hpregen','hpregenperlevel','mpregen','mpregenperlevel','crit','critperlevel','attackdamage','attackdamageperlevel','attackspeedperlevel','attackspeed']
    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/item.json')
        .then(res => res.json())
        .then(data => {
            setItemData(data.data)
        })
    },[])
    const iCanHas=(item)=>{
            let testCase=hasItem2.filter((checking)=>checking===false)
               if(testCase.length>0){
                let result= (hasItem2.indexOf(false))
                hasItem2[result]=true
                selectedItems[result]=(item)
                console.log(selectedItems)
            }
            else{alert('You already have enough many items!')}
       
    } 
    const handleSelectedItem=(item)=>{
        //console.log("you selected"+item.name)
        iCanHas(item)
        console.log(hasItem2)
     }
     //Select a filtered list of champs when entering a search
    const itemsToDisplay = Object.values(itemData).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
     ); 
    const displayStats=()=>{
        let number=-1
        Object.values(selectedChampion.stats).map(status=>{
           tempStat.push(status)
           
        })



        return  <div>
                    <div>{selectedChampion.name} Stats</div>
                    {Object.keys(selectedChampion.stats).map(element => {
                            number=number+1
                            //console.log(element)
                          return  (<div className='stat-list'>{element+" "+tempStat[number]}</div>)
                   
                        
                     })}
                </div> 
     }

    const removeItem=(space)=>{
        selectedItems[space]=null
        hasItem2[space]=false
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
                    
                        <div id='item1'className="item-selector" onClick={removeItem(0)}>
                            <img className='champion-image' src={hasItem2[0] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[0].image.full}`:""} alt="Pick an Item"/>
                        </div>
                        <div id='item2'className="item-selector" onClick={removeItem(1)}>
                            <img className='champion-image' src={hasItem2[1] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[1].image.full}`:""} alt="Pick an Item"/>
                        </div>
                        <div id='item3'className="item-selector" onClick={removeItem(2)}>
                            <img className='champion-image' src={hasItem2[2] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[2].image.full}`:""} alt="Pick an Item"/>
                        </div>
                        <div id='item4'className="item-selector" onClick={removeItem(3)}>
                            <img className='champion-image' src={hasItem2[3] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[3].image.full}`:""} alt="Pick an Item"/>
                        </div>
                        <div id='item5'className="item-selector" onClick={removeItem(4)}>
                            <img className='champion-image' src={hasItem2[4] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[4].image.full}`:""} alt="Pick an Item"/>
                        </div>
                        <div id='item6'className="item-selector" onClick={removeItem(5)}>
                            <img className='champion-image' src={hasItem2[5] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[5].image.full}`:""} alt="Pick an Item"/>
                        </div>
                        
                    </div>
                 
 
                </div>
                <div className='new-builds-container'>
                    <b>Select your Item</b>
                    <Search  searchTerm={searchTerm} onChangeSearch={setSearchTerm}/>
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

