import type { MDXComponents } from "mdx/types";
import Image from "./components/MDX/Image";
import { ImageProps } from "next/image";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "./components/MDX/Headings";

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  img: (props) => <Image {...(props as ImageProps)} />,
  h1: (props) => <Heading1 {...props} />,
  h2: (props) => <Heading2 {...props} />,
  h3: (props) => <Heading3 {...props} />,
  h4: (props) => <Heading4 {...props} />,
  ...components,
});
