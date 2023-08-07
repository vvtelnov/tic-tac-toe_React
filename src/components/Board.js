import Cell from './Cell.js';

function Board(props) {
  const board = Object.keys(props.boardPlacement).map(cellNumb => (
    <Cell
      onCellBtnClick={(cellClickedNumb) => props.onRegisterMove(cellClickedNumb)}
      key={cellNumb}
      cellId={cellNumb}
      placed={props.boardPlacement[cellNumb]}
      currentPlayer={props.boardPlacement[cellNumb]}
    ></Cell>
  ))
  // console.log(board)

  return (
    <div className="board">
      {board}
      <p className="next-player">
        Next player: 
        <span> {props.currentPlayer}</span>
      </p>
    </div>
  )
}

export default Board