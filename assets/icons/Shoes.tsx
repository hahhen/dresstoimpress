import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Shoes = (props: SvgProps) => (
    <Svg
        width={props.width ?? 20}
        height={((typeof props.width === "number" ? props.width : 20) * (6 / 20))}
        {...props}
        viewBox="0 0 20 6"
    >
        <Path
            fill={props.fill}
            d="m11.77.8 3.428-.623a.367.367 0 0 1 .352.13l3.882 4.815a.367.367 0 0 1-.33.594l-6.38-.778a.367.367 0 0 1-.31-.268l-.93-3.412A.367.367 0 0 1 11.77.8ZM7.706 4.582V1.24A.367.367 0 0 0 7.34.872H4.57a.367.367 0 0 0-.275.123L.642 5.103a.367.367 0 0 0 .318.608l6.423-.764a.367.367 0 0 0 .323-.365Z"
        />
    </Svg>
)
export default Shoes
