"use client";

import Image, { ImageProps } from "next/image";
import { FC } from "react";

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default ((props) => (
  <div className="relative my-8 w-full overflow-hidden rounded-lg dark:border dark:border-neutral-800">
    <Image
      placeholder="blur"
      blurDataURL={rgbDataURL(255, 255, 255)}
      draggable={false}
      {...(props as ImageProps)}
      src={props.src.toString().replace("/public", "")}
    />
  </div>
)) as FC<ImageProps>;
