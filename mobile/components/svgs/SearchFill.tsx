import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Path } from "react-native-svg";

function SearchFillSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        fill: "none",
        stroke: color || "black",
        viewBox: "-1 -1 18 18"
    };

    return (
        <Svg {...props}>
            <Path 
                strokeWidth={1.5}
                strokeLinecap="round"
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" 
            />
        </Svg>
    );
}

export default memo(SearchFillSVG); 