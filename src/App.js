import React, { Component } from 'react'

import './App.css';

const GOAL = ['hello world react', 'mathieu besson', 'web developpement'];
const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

class App extends Component {

    state = {
        goal: GOAL[Math.floor(Math.random() * GOAL.length)],
        keys: ALPHABET,
        lettersFound: [],
        lettersTry: [],
        errors: 0,
        reTry: false,
        nbFound: 0
    }

    handleletters = touche => {
        const {lettersFound, goal, lettersTry, nbFound, errors} = this.state;
        if(goal.indexOf(touche) !== -1 ){
            if(lettersFound.indexOf(touche) === -1){
                this.setState({ lettersFound: [...lettersFound, ...touche], nbFound: nbFound + (goal.split(touche).length - 1) });
            }
        } else{
            if(lettersTry.indexOf(touche) === -1){
                this.setState({ lettersTry: [...lettersTry, ...touche], errors: errors+1 });
            }
        }
        console.log(this.state.errors);
        setTimeout(() => this.setState({ reTry: (this.state.nbFound === this.state.goal.replaceAll(" ", "").length) ? true : false }), 1000)
    }

    handleRetry = () => {
        this.setState({ lettersFound: [], lettersTry: [], errors:0, reTry: false, nbFound: 0, goal: GOAL[Math.floor(Math.random() * GOAL.length)] });
    }

    computeDisplay(phrase, usedletterss) {  
        console.log(usedletterss);
        return phrase.replace(/\w/g, (letters) => (usedletterss.includes(letters) ? letters : '_'))
    }

    toucheDisplay(touche){
        const {lettersTry, lettersFound} = this.state;
        if(lettersFound.indexOf(touche) !== -1){
            return 'found';
        } else if(lettersTry.indexOf(touche) !== -1){
            return 'error';
        } else{
            return 'hidden';
        }
    }


    render() {
        const { keys, errors, lettersFound, goal, reTry} = this.state;
        return (
            <div className="app">
                <h1>Jeu du pendu ! ({errors} mauvaises tentatives)</h1>
                <p className="letters">{this.computeDisplay(goal, lettersFound)}</p>
                <div className="keys">
                    {!reTry ? 
                        keys.map((touche, id) => (
                            <button className={this.toucheDisplay(touche)} key={id} onClick={() => this.handleletters(touche)}>{touche}</button>
                        )) : 
                        <p className="retry">
                            <strong>Bravo ! Vous avez trouvé !</strong>
                            <button className="hidden" onClick={() => this.handleRetry()}>Recommencer</button>
                        </p>
                    }
                </div>
            </div>
        )
    }
}

export default App;
