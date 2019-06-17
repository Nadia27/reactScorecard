

{/*React components require a uppercase letter*/}

const Header = (props) => {
  console.log(props);
  return (
    <header>
      <h1>{ props.title }</h1>
      <span className="stats">Players: { props.totalPlayers }</span>
    </header>
  );
}

{/* Components that contain other components are call composition */}

{/* Player (parent) conmponent controls how Player (child) component are rendered */}

const Player = (props) => {
  return (
    <div className="player">
      <span className="player-name">
      <button className="remove-player" onClick={() => props.removePlayer(props.id) }>x</button>{ props.name }</span>
        <Counter />
    </div>
  );
}


class Counter extends React.Component {

  state = {
    score: 0
  };

  incrementScore = () => {
    {/*setState updates value of score setState
      and tells React that this component need to be rerender*/}
    this.setState( prevState => ({
            score: prevState.score + 1
      }));
  }

  decrementScore = () => {
    {/*prevState function is recommended when updating state based on previous state*/}
    this.setState( prevState => ({
          score: prevState.score - 1

    }));
  }

  render() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <span className="counter-score">{ this.state.score }</span>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
}

{/* Top level component wraps entire application and composes all the components together*/}
class App extends React.Component {
  state = {
    players: [
      {
        name: "Nadia",
        id: 1
      },
      {
        name: "Andre",
        id: 2
      },
      {
        name: "Xavier",
        id: 3
      },
      {
        name: "Nyomi",
        id: 4
      },
      {
        name: "Micah",
        id: 5
      }
    ]
  }


  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id )
      };
    });
  }

  render() {
    return (
      <div className="scoreboard">
        <Header
          title="Scorecard"
          totalPlayers={this.state.players.length}
        />

        {/*Players List*/}
        {this.state.players.map( player =>
          <Player
            name={player.name}
            id={player.id}
            key={player.id.toString()}
            removePlayer={this.handleRemovePlayer}
          />
        )}
      </div>
    );
  }
}

{/*Renders react elements to DOM*/}
{/*Connects React to the DOM*/}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
