import React from 'react';
import './App.css';
import $ from 'jquery';

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
      currentSelect: ""
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

  seleziona(index){
    $("#img").hide()
    if(document.getElementById("li" + index).style.backgroundColor === "gold"){
      document.getElementById("li" + index).style.backgroundColor = "gold";
    }
    else{
      document.getElementById("li" + index).style.backgroundColor = "gold";
    $("#li" + index).css({fontSize: "16pt"});
    if(this.state.currentSelect !== ""){
      $('#' + this.state.currentSelect).css({fontSize: "15pt"});
      document.getElementById(this.state.currentSelect).style.backgroundColor = "";
    } 
    }
    
    this.setState({
      currentSelect: "li" + index
    })
    
  }

  showDescription(index) {
    this.setState({
      jsonSprites: ""
    })
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
          document.getElementById("type").style.paddingLeft = "48%";
          document.getElementById("type").style.textAlign = "left";
        }
        else{
          document.getElementById("type").style.paddingLeft = "0%";
          document.getElementById("type").style.textAlign = "center";
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
        $("#img").fadeIn("slow")
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
  highlight(index){
    if(document.getElementById("li" + index).style.backgroundColor !== "gold"){
      $("#li" + index).css("backgroundColor" , "rgb(253, 90, 31)");
    }
  }
  dehighlight(index){
    if(document.getElementById("li" + index).style.backgroundColor !== "gold"){
      $("#li" + index).css("backgroundColor" , "coral");
    }
    
  }

  render() {
    return (
      <div id="container">
        <div id="info">
          <div id="sprite"> <img id="img" src={this.state.jsonSprites} alt="" /> </div>
            <div id="ty">type:</div>
            <div id="type"><span>{this.state.jsonDescr.types}</span> </div>
            <div id="de">description:</div>
            <div id="description">{this.state.jsonFlavor.flavor}</div>
        </div>
        <div id="lista">
          <ol>
            {
              this.state.json.pokemon_entries.map((pokemon, index) =>
                <span><li id = {"li" + index} key={index + 1} onMouseOver = {() =>{ this.highlight(index) }} onMouseOut = {() =>{this.dehighlight(index)}} 
                onClick={() => { this.showDescription(index + 1); this.seleziona(index) }}>
                <span id="sp">{index + 1}. {pokemon.pokemon_species.name.toUpperCase()}</span></li><hr></hr></span>
              )
            }
          </ol>
        </div>
      </div>
    )
  }



}


export default App;
