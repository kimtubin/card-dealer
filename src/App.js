import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
import Card from "./Card";
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  getCard = async () => {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardURL = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardURL);
      if (!cardRes.data.success) {
        throw new Error("No card remaining!!!");
      }
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));

    return (
      <div className="App">
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
        <div className="deck-cards">{cards}</div>
      </div>
    );
  }
}

export default App;
