import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"
const Collections = (props: SvgProps) => (
    <Svg
        width={props.width ?? 20}
        height={typeof props.width === "number" ? props.width : 20}
        {...props}
        viewBox="0 0 20 20"
    >
        <Rect width={9.6} height={9.6} fill={props.fill} rx={2} />
        <Rect width={9.6} height={9.6} y={10.4} fill={props.fill} rx={2} />
        <Rect width={9.6} height={9.6} x={10.4} y={10.4} fill={props.fill} rx={2} />
        <Path
            stroke={props.fill}
            strokeLinecap="round"
            strokeWidth={1.3}
            d="M15.33 1.45v6.7M18.8 4.8h-7.2"
        />
    </Svg>
)
export default Collections
