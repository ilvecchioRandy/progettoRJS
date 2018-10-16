import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      json: {
        pokemon_entries: [
          // {"pokemon_species": {
          //   "name":"",
          // }}
        ]
      },
      jsonDescr: []
    }

  };
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          json: myJson
        });
      })
  }

  showDescription(index) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + index + '/')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let x = {
          "types": myJson.types[0].type.name
        }
        if( myJson.types.length === 1){
          x.types += ' - '+myJson.types[1].type.name
        }
        this.setState({
          jsonDescr: x
        });
      })
  }

  render() {
    return (
      <div id="container">
        <div id="sas">
          <ul>
            <li> {this.state.jsonDescr.types} </li>
            <li> </li>
            <li> </li>
          </ul>
        </div>
      <ul>
        {
          this.state.json.pokemon_entries.map((pokemon, index) =>
            <li key={index + 1} onClick={() => { this.showDescription(index + 1) }}>{pokemon.pokemon_species.name} --- {pokemon.pokemon_species.url}</li>
          )
        }
      </ul>
      </div>
    )
  }



}


export default App;
