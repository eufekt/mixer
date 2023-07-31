import { PlaylistContextInterface, usePlaylistContext } from "../contexts/PlaylistContext";
import { ArenaBlock } from "arena-ts";
import styles from "../styles/TrackHistory.module.sass";
export default function TrackHistory() {
    const { playlist } = usePlaylistContext() as PlaylistContextInterface;

    return (
        <div className={styles.container}>

            <div className={styles.columnleft}>
                history
                {playlist?.history.map((block) => (
                    <BlockElement key={block.id} block={block} />
                ))}
            </div>
            <div className={styles.columnright}>
                next
                {playlist?.list.map((block) => (
                    <BlockElement key={block.id} block={block} />
                ))}
            </div>
        </div>
    );
}

export function BlockElement({ block }: { block: ArenaBlock }) {
    return (
        <div className={styles.block}>
            <img className={styles.image} alt={"small image"} src={block.image.square.url}/>
            <div>{block.title}</div>
        </div>
    );
}
