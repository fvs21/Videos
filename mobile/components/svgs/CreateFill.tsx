import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Path } from "react-native-svg";

function CreateFillSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        fill: color || "black",
        viewBox: "0 0 16 16"
    };

    return (
        <Svg {...props}>
            <Path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/>
        </Svg>
    );
}

export default memo(CreateFillSVG); 