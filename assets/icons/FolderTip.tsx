import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const FolderTip = (props: SvgProps) => (
    <Svg
        width={props.width ?? 20}
        height={((typeof props.width === "number" ? props.width : 20) * (7 / 20))}
        {...props}
        viewBox="0 0 20 7"
    >
        <Path
            fill={props.fill}
            d="M3.753 1.527A3.125 3.125 0 0 1 6.296.22h7.408c1.01 0 1.957.487 2.543 1.308L20 6.781H0l3.753-5.254Z"
        />
    </Svg>
)
export default FolderTip
