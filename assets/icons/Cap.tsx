import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Cap = (props: SvgProps) => (
    <Svg
        width={props.width ?? 20}
        height={((typeof props.width === "number" ? props.width : 20) * (13 / 20))}
        {...props}
        viewBox="0 0 20 13"
    >
        <Path
            fill={props.fill}
            d="M9.533.094C5.724-.595 1.95 2.666.278 4.672a.883.883 0 0 0-.182.783c1.093 4.286 5.956 5.494 8.58 5.579.194.006.388.049.568.122.353.144 1.045.467 2.345 1.524 1.51 1.229 4.979-1.333 7.266-3.443.543-.502.326-1.383-.377-1.612l-2.386-.776a1.095 1.095 0 0 1-.705-.782C14.867 4.048 13.183.753 9.533.094Z"
        />
    </Svg>
)
export default Cap
