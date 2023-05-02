import Link from "next/link";
import styles, {
  color_border,
  color_text,
  color_green,
} from "@/src/styles/Channel.module.sass";

export default function Channel({ block }) {
  const {
    title,
    owner_slug,
    length,
    status,
    base_class,
    class: _class,
  } = block;

  let borderColor = color_border;
  let color = color_text;

  if (status === "public") {
    borderColor = color_green;
    color = color_green;
  }

  const border = base_class === "Channel" ? `1px solid ${borderColor}` : "none";
  return (
    <Link href={`/${block.slug}`}>
      <a>
        <div className={styles.container} style={{ border, color }}>
          <div className={styles.channelDesc}>
            <div className={styles.title}>{title}</div>
            <div className={styles.misc}>
              {`by  ${owner_slug}`}
              <br />
              {`${length} blocks • some time ago`}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
