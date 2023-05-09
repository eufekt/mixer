import styles from "@/src/styles/Loading.module.sass";
import { Grid } from "react-loader-spinner";

export function Loading({
  isLoading = false,
  what = "",
  text = "loading",
  hideText = false,
  type = "asLoader",
  style = {},
}: {
  isLoading: boolean;
  what?: string;
  text?: string;
  hideText?: boolean;
  type?: "fullScreen" | "inline" | "asLoader";
  style?: React.CSSProperties;
}) {
  let _className = styles[type];

  return isLoading ? (
    <div className={_className} style={style}>
      {!hideText && `${text} ${what}`}
      <Grid
        height="15"
        width="15"
        color={styles.color_contrast}
        ariaLabel="grid-loading"
        radius="12"
        wrapperStyle={{ marginLeft:  hideText? '0px' : '10px' }}
        visible={true}
      />
    </div>
  ) : null;
}
