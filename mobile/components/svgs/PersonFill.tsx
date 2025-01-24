import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Path } from "react-native-svg";

function PersonFillSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        fill: color || "black",
        viewBox: "0 0 16 16"
    };

    return (
        <Svg {...props}>
            <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </Svg>
    );
}

export default memo(PersonFillSVG);
