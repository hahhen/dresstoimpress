import * as React from "react"
import Svg, { SvgProps, Path, Ellipse } from "react-native-svg"
const Accessories = (props: SvgProps) => (
    <Svg
        width={props.width ?? 21}
        height={((typeof props.width === "number" ? props.width : 21) * (19 / 21))}
        {...props}
        viewBox="0 0 21 18"
    >
        <Ellipse
            cx={13.066}
            cy={11.225}
            stroke={props.fill}
            fillOpacity={0}
            strokeWidth={1.429}
            rx={8.403}
            ry={2.044}
            transform="rotate(-37.112 13.066 11.225)"
        />
        <Path
            fill={props.fill}
            d="M1.135 6.022a.19.19 0 0 1 0-.269l1.228-1.228L3.59 5.753a.19.19 0 0 1 0 .27L2.497 7.115a.19.19 0 0 1-.27 0L1.136 6.022Zm4.542 0a.19.19 0 0 1 0-.269l1.228-1.228 1.228 1.228a.19.19 0 0 1 0 .27L7.039 7.115a.19.19 0 0 1-.269 0L5.677 6.022Z"
        />
        <Path
            stroke={props.fill}
            strokeWidth={0.952}
            d="M2.363.437v4.088m0 0L1.135 5.753a.19.19 0 0 0 0 .27l1.093 1.093a.19.19 0 0 0 .27 0L3.59 6.022a.19.19 0 0 0 0-.269L2.363 4.525ZM6.905.437v4.088m0 0L5.677 5.753a.19.19 0 0 0 0 .27L6.77 7.115a.19.19 0 0 0 .27 0l1.093-1.094a.19.19 0 0 0 0-.269L6.905 4.525Z"
        />
    </Svg>
)
export default Accessories
