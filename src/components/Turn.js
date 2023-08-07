import { useMemo } from 'react'

function Turn(props) {
  const boardPositionFreezed = useMemo(() => props.boardPlacement, []);
  const turnId = useMemo(() => props.turnId, []);

  let btnContent;
  if (props.turnNumb === 0) {
    btnContent = 'Go to game start';
  } else {
    btnContent = `Go to move #${props.turnNumb}`
  }
  
  return (
    <div className="turn">
      <p className="turn__number">{props.turnNumb + 1}.</p>
      <button 
        className="turn__btn"
        onClick={() => {
          props.onGoToPrevBoardPlacemen(turnId, boardPositionFreezed)
        }}
      >{btnContent}</button>
      
    </div>
  )
}

export default Turn;