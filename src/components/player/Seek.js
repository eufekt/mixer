export default function Seek({
  played,
  loaded,
  handleSeekMouseUp,
  handleSeekMouseDown,
  handleSeekChange,
}) {
  return (
    <div>
      <div>
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
      </div>

      <div>
        <progress max={1} value={loaded}></progress>
      </div>
    </div>
  );
}
