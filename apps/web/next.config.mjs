/** @type {import('next').NextConfig} */
export default {
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
