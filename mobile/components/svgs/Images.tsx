import { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@/types/globals";

function ImagesSVG({ width, color }: SVGProps) {
  const props = {
    width: width,
    height: width,
    fill: color || "currentColor",
    viewBox: "0 0 16 16"
  };

  return (
    <Svg {...props}>
      <Path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      <Path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"/>
    </Svg>
  );
}

export default memo(ImagesSVG);
