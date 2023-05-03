import styles, { color_base } from "@/src/styles/Loading.module.sass";
import { Grid } from "react-loader-spinner";

export function Loading({
  isLoading,
  what = "",
  text = "loading",
  hideText = false,
  type = "asLoader", // types: fullScreen, inline, asLoader
  style = {},
}) {
  let _className = styles[type];

  return isLoading ? (
    <div className={_className} style={style}>
      {!hideText && `${text} ${what}`}
      <Grid
        height="15"
        width="15"
        color="#eee"
        ariaLabel="grid-loading"
        radius="12"
        wrapperStyle={{ marginLeft: !hideText && 10 }}
        visible={true}
      />
    </div>
  ) : null;
}
