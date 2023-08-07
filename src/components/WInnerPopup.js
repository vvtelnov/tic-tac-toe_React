function WinnerPopup(props) {
  const isDrow = (props.currentTurn === 5) && (!props.winnerPlayer);

  return (
    <div className="winner-popup">
      <div className="winner-popup__container">
        {isDrow ? (
          <h3 className="winner-popup__title">It is a Draw!</h3>
        ) : (
          <>
            <h3 className="winner-popup__title">
              Player <strong>{props.winnerPlayer}</strong> is a Winner!
            </h3>
            <p>Number of moves: {props.currentTurn}</p>
          </>
        )}
        <button className="winner-popup_play-again-btn" onClick={() => props.onPlayAgain()}>Play again</button>
      </div>
    </div>
  )
}

export default WinnerPopup;