import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Clear = (props: SvgProps) => (
    <Svg
        width={props.width ?? 22}
        height={typeof props.width === "number" ? props.width : 22}
        {...props}
        viewBox="0 0 22 22"
    >
        <Path
            stroke={props.fill}
            stroke-linecap="round"
            stroke-width=".871"
            d="M1 11.334 11.417.846M1.017 16.261 16.643.53M1.033 21.189 21 1.086"
        />
    </Svg>
)
export default Clear
