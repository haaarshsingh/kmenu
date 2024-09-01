import createMDX from "@next/mdx";
import sectionize from "remark-sectionize";
import toc from "remark-toc";
import autolinkHeadings from "rehype-autolink-headings";
import minify from "rehype-preset-minify";
import slug from "rehype-slug";
import getImageSize from "image-size";
import gfm from "remark-gfm";
import codeTitles from "rehype-code-titles";
import prism from "@mapbox/rehype-prism";
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

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  transpilePackages: ["kmenu"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/haaarshsingh/kmenu/**",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [sectionize, toc, gfm],
    rehypePlugins: [
      autolinkHeadings,
      minify,
      slug,
      codeTitles,
      prism,
      [rehypeImageSize, { root: process.cwd() }],
    ],
  },
});

export default withMDX(config);
