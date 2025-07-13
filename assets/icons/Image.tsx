import * as React from "react"
import { ColorValue } from "react-native"
import Svg, { SvgProps, Path } from "react-native-svg"
const Image = ({ fill2, ...props }: SvgProps & { fill2?: ColorValue }) => (
    <Svg
        width={props.width ?? 20}
        height={typeof props.width === "number" ? props.width : 20}
        {...props}
        viewBox="0 0 20 20"
    >
        <Path
            fill={props.fill}
            d="M2.687.517c5.488-.687 9.214-.69 14.7-.003 1.088.136 1.943 1 2.075 2.088.692 5.688.735 9.42.019 14.75a2.37 2.37 0 0 1-2.016 2.033c-5.184.735-8.932.717-14.834-.033a2.378 2.378 0 0 1-2.054-1.988C-.23 12.157-.166 8.385.614 2.576A2.395 2.395 0 0 1 2.687.517Zm11.351 2.637a1.464 1.464 0 1 0 0 2.928 1.464 1.464 0 0 0 0-2.928Z"
        />
        <Path
            fill={fill2 || props.fill}
            d="M15.061 16.323H5.134a.817.817 0 0 1-.694-1.248l2.964-4.76a.817.817 0 0 1 1.36-.041l1.621 2.285a.817.817 0 0 0 1.276.07l.735-.827a.817.817 0 0 1 1.295.098l2.055 3.161a.817.817 0 0 1-.685 1.262Z"
        />
    </Svg>
)
export default Image