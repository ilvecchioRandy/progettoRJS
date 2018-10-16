import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      nome: "",
    }
  };

  update(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // Typical action to be performed when the document is ready:
        let json = JSON.parse(xhttp.responseText);
        document.getElementById("app").innerHTML = json.pokemon_entries[0].pokemon_species.name;
      }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokedex/1/", true);
    xhttp.send();
  };

  // this.update = this.update.bind(this);

  render() {
    return(
      <div>
      <p id="1" onClick = {this.update}>Ciao</p>
    </div>
    )
  }



}


export default App;
