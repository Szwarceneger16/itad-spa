import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
  return (
    <button 
      className={"square " + (props.highlight ? 'winnerState' : '')}
      // style={ props.highLight ? '' }
      onClick={ props.onClick }
      >
      { props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        key={i}
        highlight={ this.props.highlight ? this.props.highlight.includes(i) : false }
        value={ this.props.squares[i] }
        onClick={ () => this.props.onClick(i) } 
      />
    );
  }

  render() {
    let arr = [];

    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(i*3+j));
      }
      arr.push(<div className="board-row">{row}</div> )
    }

    return (
      <div>
        {arr}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {      
      history: [{        
        squares: Array(9).fill(null),  
        clicked: 0    
      }],      
      stepNumber: 0,
      xIsNext: true,    
      isFinal: false,
      actualSelectedMove: null,
      reverseOrder: false,
    };  

    // bindings
    this.reversOrder = this.reversOrder.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    if ( this.state.isFinal ) return;

    const history = this.state.history.slice(0, this.state.stepNumber + 1);   
    const current = history[history.length - 1];    
    const squares = current.squares.slice();
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{        
        squares: squares, 
        clicked: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      actualSelectedMove: history.length,
    });
  }

  jumpTo(step) {    
    this.setState({      
      stepNumber: step,     
      xIsNext: (step % 2) === 0,
      isFinal: false ,
      actualSelectedMove: step,    
    });  
  }

  reversOrder() {
    this.setState({
      reverseOrder: !this.state.reverseOrder,
    })
  }

  render() {
    const history = this.state.history;    
    const current = history[this.state.stepNumber]; 

    let moves = history.map((step, move) => {      
      const desc = move ? 
        'Go to move #' + move+ ' => (' + Math.floor(step.clicked/3) + ',' + step.clicked%3 + ')' :
        'Go to game start';      
      return (        
        <li key={move}>          
          <button 
            style={ move === this.state.actualSelectedMove ? {'fontWeight': 'bold'}: {'fontWeight': 'normal'}}
            onClick={ () => {
                this.jumpTo(move);
              }}
            >
              { desc}
          </button>        
        </li>      
        );    
      });

    const winner = calculateWinner(current.squares);    
    let status;    
    if (winner && typeof winner !== 'string') {

      status = 'Winner: ' + current.squares[winner[0]];
      if (!this.state.isFinal) {
        this.setState({
          isFinal: true
        });
      }
    } else if (winner) {
      status = 'It\'s a draw';
    } else {      
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
    }

    if (this.state.reverseOrder) {
      let copyFrist = [moves.shift()];
      moves.reverse();
      moves = copyFrist.concat(moves);
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            highlight={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button
              onClick= { this.reversOrder }
            >
              Toogle
            </button>
          </div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares, xIsNext) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let drawCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    } else {
      let comp1,comp2,comp3;
      if (xIsNext) {
        comp1 = squares[a] ? squares[a] : 'X';
        comp2 = squares[b] ? squares[b] : 'X';
        comp3 = squares[c] ? squares[c] : 'X';
      } else {
        comp1 = squares[a] ? squares[a] : 'O';
        comp2 = squares[b] ? squares[b] : 'O';
        comp3 = squares[c] ? squares[c] : 'O'; 
      }
        
      if ( !(comp1 === comp2 && comp1 === comp3 && comp2 === comp3 )) {
        drawCount++;
      } 
    }
  }
  return drawCount === 8 ? 'draw': null;
}