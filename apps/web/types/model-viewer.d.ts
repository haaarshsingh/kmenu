declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      exposure?: string | number;
      "camera-target"?: string;
      "camera-orbit"?: string;
      "min-camera-orbit"?: string;
      "max-camera-orbit"?: string;
      "disable-zoom"?: boolean;
      autoplay?: boolean;
      orientation?: string;
      style?: React.CSSProperties;
      id?: string;
    };
  }
}
