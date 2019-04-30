import React from 'react'
import './characterCard.css'

const characterCard = props => {
    return (
    <div className="card">
        <img 
        className="card-img-top" 
        src={props.image} 
        alt={props.character} 
        id={props.id}
        onClick={props.handleClick}
        />
    </div>
    )
}

export default characterCard;