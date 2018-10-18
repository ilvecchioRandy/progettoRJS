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
      jsonDescr: [
        {
          type: {
            name: "none"
          }
        },
        {
          type: {
            name: "none"
          }
        }
      ],
      jsonFlavor: [],
      jsonSprites: [],
      SpriteName: "",
      currentSelect: "",
      typeArray: {
        "bug": {
          backgroundPosition: "-13.5px -10px",
        },
        "dark": {
          backgroundPosition: "-110.5px -10px",
        },
        "dragon": {
          backgroundPosition: "-207.5px -10px",
        },
        "electric": {
          backgroundPosition: "-13.5px -60px",
        },
        "fairy": {
          backgroundPosition: "-110.5px -60px",
        },
        "fighting": {
          backgroundPosition: "-207.5px -60px",
        },
        "fire": {
          backgroundPosition: "-13.5px -108px",
        },
        "flying": {
          backgroundPosition: "-110.5px -108px",
        },
        "ghost": {
          backgroundPosition: "-207px -108px",
        },
        "grass": {
          backgroundPosition: "-13.5px -159px",
        },
        "ground": {
          backgroundPosition: "-110.5px -159px",
        },
        "ice": {
          backgroundPosition: "-207.5px -159px",
        },
        "normal": {
          backgroundPosition: "-13.5px -209px",
        },
        "poison": {
          backgroundPosition: "-110.5px -209px",
        },
        "psychic": {
          backgroundPosition: "-207.5px -209px",
        },
        "rock": {
          backgroundPosition: "-13.5px -259px",
        },
        "steel": {
          backgroundPosition: "-110.5px -259px",
        },
        "water": {
          backgroundPosition: "-207.5px -259px",
        },
        "none": {
          display: "none",
        },
      },
      jsonTraits: {
        height: "",
        weight: "",
        genus: "",
        abilities: ""
      }
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
    this.setState({
      jsonSprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + index + '.png',
      SpriteName: this.state.json.pokemon_entries[index - 1].pokemon_species.name
    })
    fetch('https://pokeapi.co/api/v2/pokemon/' + index + '/')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let x =
          [
            {
              type: {
                name: myJson.types[0].type.name
              }
            },
            {
              type: {
                name: "none"
              }
            }
          ];
        let y = this.state.jsonTraits;
        let y2 = [];
        if (myJson.types.length === 2) x[1].type.name = myJson.types[1].type.name;
        for(let i = 0; i< myJson.abilities.length;i++) {
          y2.push(myJson.abilities[i].ability.name)
        }
        y.height = myJson.height / 10 + " m";
        y.weight = myJson.weight / 10 + " kg";
        y.abilities = y2.join(" , ");
        console.log(y);
        this.setState({
          jsonDescr: x,
          jsonTratis: y
        });
      })
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + index + '/')
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        let vet = []
        let vet2 = [];
        let z;
        let i;
        let z2;
        let i2;
        vet = myJson.flavor_text_entries;
        vet2 = myJson.genera;
        console.log(vet2)
        for (i = 0; i < vet.length; i++) {
          if (myJson.flavor_text_entries[i].language.name === "en") {
            z = myJson.flavor_text_entries[i].flavor_text;
            i = vet.length;
          }
        }
        for (i2 = 0; i2 < vet2.length; i2++) {
          if (myJson.genera[i2].language.name === "en") {
            z2 = myJson.genera[i2].genus;
            i2 = vet.length;
          }
        }
        let x = this.state.jsonTraits;
        x.genus = z2;
        let y = {
          "flavor": z
        }
        this.setState({
          jsonFlavor: y,
          jsonTraits: x
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
          <div id="type"> <div id="type1" style={this.state.typeArray[this.state.jsonDescr[0].type.name]}></div> <div id="type2" style={this.state.typeArray[this.state.jsonDescr[1].type.name]}></div> </div>
          <div id="de">info:</div>
          <div id="description"><div id="flavor"><div id="head">description:</div><div id="fl">{this.state.jsonFlavor.flavor}</div></div>
            <div id="mis"><div id="head2">traits:</div><div id="miscellanea">
              <div id="abilities"><div id="headA">abilities:</div><div id="contentA">{this.state.jsonTraits.abilities}</div></div>
              <div id="altro">
                <div id="genus"><div id="headG">genus:</div><div id="contentG">{this.state.jsonTraits.genus}</div></div>
                <div id="measures">
                  <div id="headM">measures:</div>
                  <div id="contentM">
                    <table>
                      <tr><td>weight: </td><td><span>{this.state.jsonTraits.weight}</span></td></tr>
                      <tr><td>height: </td><td><span>{this.state.jsonTraits.height}</span></td></tr>
                    </table>
                  </div>
                </div>
              </div>
            </div></div></div>
        </div>
        <div id="lista">
          <ol id="list">
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
          <div title="scroll to the top" onClick={() => { $("#lista").animate({ scrollTop: 0 + "px" }, "fast") }}>
            <img id="pokeball" src={pokeball} alt="pokeball"></img>
            <div id="pokeD">POK&Eacute;DEX</div>
          </div>
          <div id="searchBar">Search a Pok&eacute;mon: &nbsp;
          <input type="text" id="ricerca" onChange={(event) => this.onChangeText(event.target.value)} />
          </div>
        </div>
      </div>
    )
  }



}


export default App;
