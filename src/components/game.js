import React, { Component } from 'react';
import vikings from '../vikings.json'
import CharacterCard from './CharacterCard'
import Navbar from './Navbar'


class Game extends Component {
    
    state = {
        score: 0,
        bestScore: 0,
        vikings: vikings,
        selectedVikings: [],
        unselectedVikings: vikings.map(vikings=> {
            return vikings.character
        })
    };

    // This function was written by wllm-chndlr, I could not figure this out
    shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    handleClick = id => {
        let score = this.state.score;
        this.setState({
            score: score,
        })
        if (score >= this.state.bestScore){
            this.setState({ bestScore: score});
        }
        if(this.state.score === 12){
            return false;
        }

        let clicked = this.state.selectedVikings.indexOf(id.target.id) > -1;

        if(clicked) {
            this.handleLoser(id.target.alt);
        } else {
            let index = this.state.unselectedVikings.indexOf(id.target.alt)
            this.setState({
                score: this.state.score +1,
                
                selectedVikings: this.state.selectedVikings.concat(id.target.id),
                unselectedVikings: this.state.unselectedVikings.splice(index,1)   
            }, 
            
            () => {
               if (this.state.score === 12) {
                    this.handleWinner();
            }   
            })
        }
    };

    // if you clicked the same viking twice call the loser alert
    handleLoser = character => {
        alert("You lose. You already guessed " + character )
        this.newGame()
        console.log("Loser alert")
    }

    // if you clicked all 12 vikings call the winner alert
    handleWinner = () => {
        alert("You Win! You clicked all the Vikings!")
        this.newGame()
        console.log("Winner alert")
    }

    newGame = () => {
        this.setState({
            score: 0,
            vikings: vikings,
            selectedVikings: [],
            unselectedvikings: vikings.map(vikings=> {
                return vikings.character
            })
        })
        console.log("new game");
    }
    // render the page
    render(){
        return (
            <div>
                <Navbar score={this.state.score} 
                 bestScore={this.state.bestScore} />
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