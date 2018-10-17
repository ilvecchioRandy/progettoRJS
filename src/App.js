import React from 'react';
import $ from 'jquery';
import pokeball from './poke.png'

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
      SpriteName: "",
      currentSelect: "",
    }
  };
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          json: myJson,
        });
      })
  }

  seleziona(index) {
    if (document.getElementById("li" + index).style.backgroundColor === "gold") {
      document.getElementById("li" + index).style.backgroundColor = "gold";
    }
    else {
      $("#img").css({ display: "none" })
      document.getElementById("li" + index).style.backgroundColor = "gold";
      $("#li" + index).css({ fontSize: "16pt" });
      if (this.state.currentSelect !== "") {
        $('#' + this.state.currentSelect).css({ fontSize: "15pt" });
        document.getElementById(this.state.currentSelect).style.backgroundColor = "";
      }
    }

    this.setState({
      currentSelect: "li" + index
    })

  }

  showDescription(index) {
    console.log(" xx "+this.state.json.pokemon_entries[index].pokemon_species.name)
    this.setState({
      jsonSprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + index + '.png',
      SpriteName: this.state.json.pokemon_entries[index-1].pokemon_species.name
    })
    fetch('https://pokeapi.co/api/v2/pokemon/' + index + '/')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let x = {
          "types": myJson.types[0].type.name
        }
        if (myJson.types.length === 2) x.types += ' - ' + myJson.types[1].type.name
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
  }
  highlight(index) {
    if (document.getElementById("li" + index).style.backgroundColor !== "gold") {
      $("#li" + index).css("backgroundColor", "rgb(253, 90, 31)");
    }
  }
  dehighlight(index) {
    if (document.getElementById("li" + index).style.backgroundColor !== "gold") {
      $("#li" + index).css("backgroundColor", "coral");
    }
  }
  onChangeText(value) {
    console.log(this.state.json)
    let i;
    let vet = this.state.json.pokemon_entries;
    for (i = 0; i < vet.length; i++) {
      if (this.state.json.pokemon_entries[i].pokemon_species.name.includes(value.toLowerCase())) {
        $("#span" + i).stop(false, true).fadeIn();
      } else {
        $("#span" + i).stop(false, true).fadeOut();
      }
    }
  }

  render() {
    return (
      <div id="container">
        <div id="info">
          <div id="sprite"><div>{this.state.SpriteName.toUpperCase()}</div> <img id="img" src={this.state.jsonSprites} alt="" onLoad={() => { $("img").fadeIn() }} /> </div>
          <div id="ty">type:</div>
          <div id="type"><span>{this.state.jsonDescr.types}</span> </div>
          <div id="de">description:</div>
          <div id="description">{this.state.jsonFlavor.flavor}</div>
        </div>
        <div id="lista">
          <ol>
            <hr />
            {
              this.state.json.pokemon_entries.map((pokemon, index) =>
                <span id={"span" + index} key={index + 1}><li id={"li" + index} onMouseOver={() => { this.highlight(index) }} onMouseOut={() => { this.dehighlight(index) }}
                  onClick={() => { this.showDescription(index + 1); this.seleziona(index) }}>
                  <span id="sp">{index + 1}.&nbsp;&nbsp;{pokemon.pokemon_species.name.toUpperCase()}</span></li><hr></hr></span>
              )
            }
          </ol>
        </div>
        <div id="header">
          <img id="pokeball" src={pokeball} alt="pokeball"></img>
          <div id="pokeD">POK&Eacute;DEX</div>
          <div id="searchBar">Search a Pok&eacute;mon: &nbsp;
          <input type="text" id="ricerca" onChange={(event) => this.onChangeText(event.target.value)} />
          </div>
        </div>
      </div>
    )
  }



}


export default App;
