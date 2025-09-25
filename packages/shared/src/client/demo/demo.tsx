"use client";

import { LiveEditor, LivePreview, LiveProvider } from "react-live";
import { svgToBlob } from "svg-fns";
import styles from "./demo.module.scss";

const code = ``;

/** React live demo */
export function Demo() {
  const dataUrl = svgToBlob("");
  return (
    <LiveProvider code={code} scope={{ svgToBlob }}>
      <div className={styles.demo}>
        <LiveEditor className={styles.code} />
        <LivePreview className={styles.preview} />
      </div>
    </LiveProvider>
  );
}
