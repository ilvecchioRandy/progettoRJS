import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      json: {},
    }
    
  };
  componentWillMount(){
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then((response) => {
        return response.json();
      })
      .then((myJson) =>{
        this.setState({
          json: myJson      
        });
        console.log(this.state.json.pokemon_entries)
      })
  }
      

  render() {
    return(
      <div id="container">
        <ul>
          {
            this.state.json.pokemon_entries.map((pokemon, index) => 
              <li>{pokemon.name}</li>
            )
          }
        </ul>
      </div>
    )
  }



}


export default App;
