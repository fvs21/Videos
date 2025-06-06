import { SVGProps } from "@/types/globals";
import { memo } from "react";
import Svg, { Path } from "react-native-svg";

function ImageSVG({ width, color }: SVGProps) {
    const props = {
        width: width,
        height: width,
        fill: color || "currentColor"
    };

    return (
        <Svg {...props} viewBox="0 0 16 16">
            <Path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <Path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
        </Svg>
    );
}

export default memo(ImageSVG);
