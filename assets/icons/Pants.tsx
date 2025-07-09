import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Pants = (props: SvgProps) => (
    <Svg
        width={props.width ?? 20}
        height={((typeof props.width === "number" ? props.width : 20) * (22 / 20))}
        {...props}
        viewBox="0 0 20 22"
    >
        <Path
            fill={props.fill}
            d="M17.29.602c-5.462-.78-8.784-.825-14.128 0a.988.988 0 0 0-.813.765C.839 8.287.675 13.4.083 20.23a1.005 1.005 0 0 0 .85 1.081l3.75.561a1 1 0 0 0 1.108-.706l3.76-12.75a.72.72 0 0 1 1.392.038l2.986 12.658a1 1 0 0 0 1.115.76l4.086-.582a.992.992 0 0 0 .854-.959c.143-6.682-.68-11.328-1.851-18.893a.998.998 0 0 0-.843-.835Z"
        />
    </Svg>
)
export default Pants
