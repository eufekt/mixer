/* eslint-disable @next/next/no-img-element */
export default function Block({ block, selectTrack, i, currentTrack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 10,
      }}
    >
      <img
        alt={"image"}
        onClick={() => selectTrack(i)}
        style={{
          height: "200px",
          border: i == currentTrack ? "10px solid orange" : "none",
        }}
        src={block.image.square.url}
      ></img>
    </div>
  );
}
