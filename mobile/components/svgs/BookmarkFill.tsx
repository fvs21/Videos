import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Path } from "react-native-svg";

function BookmarkFillSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        fill: color || "black",
        viewBox: "0 0 16 16"
    };

    return (
        <Svg {...props}>
            <Path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
        </Svg>
    );
}

export default memo(BookmarkFillSVG);
