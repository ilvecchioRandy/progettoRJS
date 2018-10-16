import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      json: "",
    }
    // this.update = this.update.bind(this);
    this.fetching = this.fetching.bind(this);
  };

  fetching(){
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
    .then((response) => {
      return response.json();
    })
    .then((myJson) =>{
      this.setState({
        json: JSON.stringify(myJson)
      });
    })
  }

  // update(){
  //   var j;
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState === 4 && this.status === 200) {
  //       // Typical action to be performed when the document is ready:
  //       j = JSON.parse(xhttp.responseText);
  //       document.getElementById("app").innerHTML = j.pokemon_entries[0].pokemon_species.name;
  //     }
  //   };
  //   xhttp.open("GET", "https://pokeapi.co/api/v2/pokedex/1/", true);
  //   xhttp.send();
  //   setTimeout(() =>{
  //     this.setState({
  //       json: j,
  //     })
  //     alert(JSON.stringify(this.state.json));
  //   }, 6000);
  // };
  // this.update = this.update.bind(this);

  render() {
    return(
      <div>
      <p id="1" onClick = {this.fetching}>Ciao</p>
    </div>
    )
  }



}


export default App;
