import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      json: {
        pokemon_entries: [
        ]
      },
      jsonDescr: [],
      jsonFlavor: [],
      jsonSprites: [],
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
        if (myJson.types.length === 2) {
          x.types += ' - ' + myJson.types[1].type.name
        }
        this.setState({
          jsonDescr: x
        });
      })
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + index + '/')
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        let vet = []
        let z;
        let i;
        vet = myJson.flavor_text_entries;

        for (i = 0; i < vet.length; i++) {
          if (myJson.flavor_text_entries[i].language.name === "en") {
            z = myJson.flavor_text_entries[i].flavor_text;
            i = vet.length;
          }
        }
        let y = {
          "flavor": z
        }
        this.setState({
          jsonFlavor: y
        })
      })
    this.setState({
      jsonSprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + index + ".png"
    })
  }

  render() {
    return (
      <div id="container">
        <div id="info">
          <div id="sprite"> <img id="img" src={this.state.jsonSprites} alt="" /> </div>
            <div id="type"> {this.state.jsonDescr.types} </div>
            <div id="description">Description: {this.state.jsonFlavor.flavor}</div>
        </div>
        <div id="lista">
          <ol>
            {
              this.state.json.pokemon_entries.map((pokemon, index) =>
                <li key={index + 1} onClick={() => { this.showDescription(index + 1) }}>{pokemon.pokemon_species.name.toUpperCase()}</li>
              )
            }
          </ol>
        </div>
      </div>
    )
  }



}


export default App;
