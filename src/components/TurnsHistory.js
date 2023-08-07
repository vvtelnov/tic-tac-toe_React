import Turn from './Turn.js';

function TurnsHistory(props) {
  return (
    <div className="turns-history">
      <h3 className="turns-history__title" >Turns:</h3>
      {props.currTurn !== 0 ? (
        <>
          <Turn
            turnNumb={0}
            onGoToPrevBoardPlacemen={() => {
              props.restartGame();
            }}
          />
            {Array.from(Array(Math.floor(props.currTurn / 2)).keys()).map( turnNumb => (
              <Turn
                key={turnNumb}
                turnNumb={turnNumb + 1}
                turnId={props.currTurn}
                boardPlacement={props.currBoardPlacement}
                onGoToPrevBoardPlacemen={(turn, prevBoardPlacement) => {
                  props.changeToPrevBoardPlacement(turn, prevBoardPlacement);
                }}
              />
            ))}
        </>) : (
          <p className="turns-history__empty">
            <strong>No turns:</strong>
            <em>(play a game to see logs)</em>
          </p>
        )
      } 
    </div>
  )
}

export default TurnsHistory;