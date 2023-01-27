export default function Block({ block, selectTrack, i, currentTrack }) {
    return (
      <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
        <img
          alt={"image"}
          onClick={() => selectTrack(i)}
          style={{
            width: "40px",
            border: i == currentTrack ? "2px solid orange" : "none",
          }}
          src={block.image.square.url}
        ></img>
      </div>
    );
  }