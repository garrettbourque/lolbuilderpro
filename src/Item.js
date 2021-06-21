let Item = ({ selectedItems, hasItem2 }) => {

    const removeItem=(space)=>{
        console.log(hasItem2[0])
        selectedItems[space]=null
        hasItem2[space]=false
    }

    return (
        <div className="select-game">    
            <div id='item1'className="item-selector" onClick={() => removeItem(0)}>
                <img className='item-image' src={hasItem2[0] ? `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[0].image.full}`: ""} alt="Pick an Item"/>
            </div>
            <div id='item2'className="item-selector" onClick={() => removeItem(1)}>
                <img className='item-image' src={hasItem2[1] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[1].image.full}`:""} alt="Pick an Item"/>
            </div>
            <div id='item3'className="item-selector" onClick={() => removeItem(2)}>
                <img className='item-image' src={hasItem2[2] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[2].image.full}`:""} alt="Pick an Item"/>
            </div>
            <div id='item4'className="item-selector" onClick={() => removeItem(3)}>
                <img className='item-image' src={hasItem2[3] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[3].image.full}`:""} alt="Pick an Item"/>
            </div>
            <div id='item5'className="item-selector" onClick={() => removeItem(4)}>
                <img className='item-image' src={hasItem2[4] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[4].image.full}`:""} alt="Pick an Item"/>
            </div>
            <div id='item6'className="item-selector" onClick={() => removeItem(5)}>
                <img className='item-image' src={hasItem2[5] ?`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/item/${selectedItems[5].image.full}`:""} alt="Pick an Item"/>
            </div>
        </div>
    )
}

export default Item 