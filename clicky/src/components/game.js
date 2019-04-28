import React, { Component } from 'react';
import vikings from '../vikings.json'
import CharacterCard from './CharacterCard'
import Navbar from './Navbar'

const style = {
    backgroundColor: 'black'
}

class Game extends Component {
    
    state = {
        score: 0,
        vikings: vikings,
        clickedVikings: [],
        unselectedViking: vikings.map(vikings=> {
            return vikings.character
        })
    };

    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    handleClick = event => {
        if(this.state.score === 12){
            return false;
        }

        let checkIfClicked = this.state.clickedVikings.indexOf(event.target.id) > -1;

        if(checkIfClicked) {
            this.handleLoss(event.target.alt);
        } else {
            let index = this.state.unselectedVikings.indexOf(event.target.alt)
            this.setState({
                score: this.state.score +1,
                clickedVikings: this.state.clickedVikings.concat(event.target.id),
                unselectedVikings: this.state.unselectedVikings.splice(index,1)
            }, () => {
                if (this.state.score === 12) {
                    this.handleWin();
            }
            })
        }
    };

    handleLoss = character => {
        alert('You lose.\nYou already guessed ' + character + '\nYou missed ' + this.state.unselectedVikings.join(', '))
        this.resetGame()
    }

    handleWin = () => {
        alert('You Win! You picked all the Vikings!')
        this.resetGame()
    }

    resetGame = () => {
        this.setState({
            score: 0,
            vikings: vikings,
            clickedVikings: [],
            unselectedvikings: vikings.map(vikings=> {
                return vikings.character
            })
        })
    }

    render(){
        return (
            <div style={style}>
                <Navbar score={this.state.score} />
                <div className='container'> 
                    {this.shuffle(this.state.vikings).map(vikings => {
                    return <CharacterCard id={vikings.id} key={vikings.id} image={vikings.image} character={vikings.character} handleClick={this.handleClick} />
                })}
                </div>
            </div>
        )
    }
}

export default Game;