import * as React from "react"
import Svg, { SvgProps, Path, Ellipse } from "react-native-svg"
const Caret = (props: SvgProps) => (
    <Svg
        width={props.width ?? 14}
        height={((typeof props.width === "number" ? props.width : 14) * (13 / 14))}
        {...props}
        viewBox="0 0 13 14"
    >
        <Path
            fill={props.fill}
            d="M10.714 4.526c1.905 1.1 1.905 3.849 0 4.948l-6.428 3.712C2.38 14.286 0 12.91 0 10.71V3.288C0 1.09 2.381-.286 4.286.814l6.428 3.712Z"
        />
    </Svg>
)
export default Caret
