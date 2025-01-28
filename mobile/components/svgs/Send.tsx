import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Path } from "react-native-svg";

function SendSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        stroke: color || "black",
        fill: "none",
        viewBox: "0 0 24 24"
    };

    return (
        <Svg {...props}>
            <Path 
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
        </Svg>
    );
}

export default memo(SendSVG);
