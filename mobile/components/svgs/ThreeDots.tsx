import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Circle } from "react-native-svg";

function ThreeDotsSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        fill: color || "black",
        viewBox: "0 0 16 16"
    };

    return (
        <Svg {...props}>
            <Circle cx="8" cy="8" r="1.5" />
            <Circle cx="2" cy="8" r="1.5" />
            <Circle cx="14" cy="8" r="1.5" />
        </Svg>
    );
}

export default memo(ThreeDotsSVG); 