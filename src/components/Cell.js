function Cell(props) {
  return (
    <button
      className="cell"
      onClick={() => props.onCellBtnClick(props.cellId)}
    >
      {props.placed}
    </button>
  )
}

export default Cell;