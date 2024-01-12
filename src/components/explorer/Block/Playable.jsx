import { isBlockPlayable, parseTitle } from "@/src/lib/helpers";
import styles from "@/src/styles/Playable.module.sass";
import Image from "next/image";
import { useState } from "react";
import { ConnectDialog, ConnectModal } from "./ConnectModal/ConnectModal";
import { arenaBase } from "@/src/config";

export default function Playable({ loadPlaylistFrom, block, i }) {
    const [focus, setFocus] = useState(false);
    const [showConnect, setShowConnectModal] = useState(false);
    const priority = i < 15 ? true : false;
    let imgsrc = block.image?.square.url;
    let title = parseTitle(block.title);

    const isBlockAText = block.class === "Text";

    return (
        <div
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            className={styles.container}>
            {focus && !showConnect && (
                <a
                    className={styles.blockLink}
                    href={`${arenaBase}/block/${block.id}`}
                    target="_blank">
                    block <span>{"\u2197"}</span>
                </a>
            )}
            {!isBlockAText && (
                <Image
                    unoptimized={true}
                    className={styles.image}
                    layout="fixed"
                    objectFit="cover"
                    width={styles.block_width}
                    height={styles.block_width}
                    alt={"image"}
                    priority={priority}
                    quality={50}
                    onClick={() => loadPlaylistFrom(i)}
                    src={imgsrc}></Image>
            )}
            {isBlockAText && (
                <div
                    className={styles.textForm}
                    dangerouslySetInnerHTML={{
                        __html: block.content_html,
                    }}></div>
            )}
            {focus && isBlockPlayable(block) && (
                <div className={styles.playButtonContainer}>
                    <div className={styles.playButton}>{"\u25B6"}</div>
                </div>
            )}
            <ConnectDialog
                focus={focus}
                setShowConnectModal={setShowConnectModal}
                showConnectModal={showConnect}
                block={block}
            />
            <div className={styles.blockTitle}>{title}</div>
        </div>
    );
}
