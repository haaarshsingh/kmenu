// @ts-nocheck

import getImageSize from "image-size";
import { visit } from "unist-util-visit";

/**
 * Get image size of local files
 * @link https://mmazzarolo.com/blog/2023-07-29-nextjs-mdx-image-size/
 */
export const rehypeImageSize = (options) => {
  return (tree) => {
    visit(tree, { type: "element", tagName: "img" }, (node) => {
      if (node.properties.width || node.properties.height) {
        return;
      }
      const imagePath = `${options?.root ?? ""}${node.properties.src}`;
      const imageSize = getImageSize(imagePath);
      node.properties.width = imageSize.width;
      node.properties.height = imageSize.height;
    });

    visit(tree, { type: "mdxJsxFlowElement", name: "Image" }, (node) => {
      const srcAttr = node.attributes?.find((attr) => attr.name === "src");
      const imagePath = `${options?.root ?? ""}${srcAttr.value}`;
      const imageSize = getImageSize(imagePath);
      const widthAttr = node.attributes?.find((attr) => attr.name === "width");
      const heightAttr = node.attributes?.find(
        (attr) => attr.name === "height",
      );

      if (widthAttr || heightAttr) return;

      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "width",
        value: imageSize.width,
      });

      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "height",
        value: imageSize.height,
      });
    });
  };
};
