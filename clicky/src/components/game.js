import React, { Component } from 'react';
import vikings from '../vikings.json'
import CharacterCard from './CharacterCard'
import Navbar from './Navbar'


class Game extends Component {
    
    state = {
        score: 0,
        vikings: vikings,
        selectedVikings: [],
        unselectedVikings: vikings.map(vikings=> {
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

        let checkIfClicked = this.state.selectedVikings.indexOf(event.target.id) > -1;

        if(checkIfClicked) {
            this.handleLoss(event.target.alt);
        } else {
            let index = this.state.unselectedVikings.indexOf(event.target.alt)
            this.setState({
                score: this.state.score +1,
                selectedVikings: this.state.selectedVikings.concat(event.target.id),
                unselectedVikings: this.state.unselectedVikings.splice(index,1)
            }, () => {
                if (this.state.score === 12) {
                    this.handleWin();
            }
            })
        }
    };

    handleLoss = character => {
        alert('You lose.\nYou already guessed ' + character )
        this.resetGame()
    }

    handleWin = () => {
        alert('You Win! You clicked all the Vikings!')

        this.resetGame()
    }

    resetGame = () => {
        this.setState({
            score: 0,
            vikings: vikings,
            selectedVikings: [],
            unselectedvikings: vikings.map(vikings=> {
                return vikings.character
            })
        })
    }

    render(){
        return (
            <div>
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