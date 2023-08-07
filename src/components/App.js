import { useState, useEffect } from 'react';
import Board from './Board.js';
import TurnsHistory from './TurnsHistory.js';
import WinnerPopup from './WInnerPopup.js';

function App() {
  const [isPlayerWinner, toggleIsPlayerWinner] = useState(false);
  const [currPlayer, setCurrPlayer] = useState('X');
  const [currTurn, setCurrTurn] = useState(0);
  const [boardPlacement, setBoardPlacement] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  })

  useEffect(() => {
    function checkIfIsWinner() {
      console.log('*checkIfIsWinner funct() is called*')
      console.log(boardPlacement);
      let prevPlayer;
      currPlayer === 'X'
      ? prevPlayer = 'O'
      : prevPlayer = 'X';
      const firstCellTaken = (boardPlacement[1] === prevPlayer);
      const fifthCellTaken = (boardPlacement[5] === prevPlayer);
      const ninthCellTaken = (boardPlacement[9] === prevPlayer);
      console.log('curr player', currPlayer);
      console.log(`prev player: ${prevPlayer} | (1:${firstCellTaken}, 2:${fifthCellTaken}, 3:${ninthCellTaken})`)
      if (!(firstCellTaken || fifthCellTaken || ninthCellTaken)) {
        console.log('condition: 1');
        console.log(firstCellTaken)
        return false
      }
      if (firstCellTaken && fifthCellTaken && ninthCellTaken) {
        console.log('condition: 2');
        return true
      }
  
      if (fifthCellTaken) {
        if (boardPlacement[7] === prevPlayer && boardPlacement[3] === prevPlayer) {
          console.log('condition: 3');
          return true
        } 
        if (boardPlacement[4] === prevPlayer && boardPlacement[6] === prevPlayer) {
          console.log('condition: 4');
          return true
        }
        if (boardPlacement[2] === prevPlayer && boardPlacement[8] === prevPlayer) {
          console.log('condition: 5');
          return true
        }
      } 
      if (firstCellTaken) {
        if (boardPlacement[4] === prevPlayer && boardPlacement[7] === prevPlayer) {
          console.log('condition: 6');
          return true
        }
        if (boardPlacement[2] === prevPlayer && boardPlacement[3] === prevPlayer) {
          console.log('condition: 7');
          return true
        }
      } 
      if (ninthCellTaken) { 
        console.log('7 and 8', (boardPlacement[7] === prevPlayer && boardPlacement[8] === prevPlayer))
        console.log('3 and 6', (boardPlacement[7] === prevPlayer && boardPlacement[8] === prevPlayer))

        if (boardPlacement[7] === prevPlayer && boardPlacement[8] === prevPlayer) {
          console.log('condition: 8');
          return true
        }
        if (boardPlacement[3] === prevPlayer && boardPlacement[6] === prevPlayer) {
          console.log('condition: 9');
          return true
        }
      }
      return false
    }

    console.log('_component app is rerender_');
    const isWinner = checkIfIsWinner();
    console.log('isWinner', isWinner);
    if (isWinner) {
      console.log('player is winner')
      toggleIsPlayerWinner(() => true);
    }
    
  }, [boardPlacement, currPlayer, isPlayerWinner])

  function handlePlayerMoves(cellNumb) {
    console.log('handlePlayerMoves (isPlayerWinner)', isPlayerWinner)
    if (updBoardPlacement(cellNumb)) {
      toggleCurrentPlayer()
      setCurrTurn((prevTurn) => {
        return prevTurn + 1
      })
    }
  }

  function toggleCurrentPlayer() {
    console.log('player toggled')
    currPlayer === 'X'
    ? setCurrPlayer('O')
    : setCurrPlayer('X');
  }

  function updBoardPlacement(cellNumb) { 
    if (!boardPlacement[cellNumb]) {
      setBoardPlacement({
        ...boardPlacement,
        [cellNumb]: currPlayer,
      })
      return true
    }
    return false
  }

  function restartGame() {
    console.log('onPlayAgin')
    toggleIsPlayerWinner(false);
    setCurrPlayer('X');
    setCurrTurn(0);
    setBoardPlacement({
      ...boardPlacement,
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
    })
  }

  function changeToPrevBoardPlacement(turnNumb, histBordPlacemet) {
    toggleIsPlayerWinner(false);
    setCurrPlayer('X')
    setCurrTurn(turnNumb)
    setBoardPlacement({
      ...boardPlacement,
      ...histBordPlacemet,
    })
  }

  function getPrevPlayer() {
    let prevPlayer;
    currPlayer === 'X'
    ? prevPlayer = 'O'
    : prevPlayer = 'X'
    return prevPlayer
  }


  return (
    <div className="app">
      <h1 className="app__header">Tic Tac Toe</h1>
      <div className="app__container">
        {(isPlayerWinner || (currTurn === 9)) ? (
          <WinnerPopup
            winnerPlayer={isPlayerWinner && getPrevPlayer()}
            currentTurn={Math.ceil(currTurn / 2)}
            onPlayAgain={() => restartGame()}
          />
        ) : (
          <Board
            onRegisterMove={(cellNumb) => handlePlayerMoves(cellNumb)}
            currentPlayer={currPlayer}
            boardPlacement={boardPlacement}
          />
        )}
        
        <TurnsHistory
          currTurn={currTurn}
          currBoardPlacement={boardPlacement}
          changeToPrevBoardPlacement={changeToPrevBoardPlacement}
          restartGame={() => restartGame()}
        />
      </div>
    </div>
  )
}

export default App;
