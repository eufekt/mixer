/* eslint-disable @next/next/no-img-element */
export function Preview({ block }) {
  const url = block?.source?.url;
  const image = block?.image?.square.url;
  //   console.log(block);

  const emptyBlock = (
    <div>{"no song selected"}</div>
  );
  const previewBlock = (
    <img src={image} style={{ height: "100%" }} alt={"preview"}></img>
  );

  return <div style={{ height: "100px" }}>{block ? previewBlock : emptyBlock}</div>;
}
