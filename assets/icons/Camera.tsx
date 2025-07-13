import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Camera = (props: SvgProps) => (
  <Svg
    width={props.width ?? 20}
    height={((typeof props.width === "number" ? props.width : 20) * (14 / 20))}
    {...props}
    viewBox="0 0 20 14"
  >
    <Path
      fill={props.fill}
      d="M2.427.475c5.449-.632 9.281-.634 15.128.011a2.43 2.43 0 0 1 2.154 2.096c.39 3.065.383 5.295.006 8.203a2.425 2.425 0 0 1-2.156 2.088c-5.447.585-9.287.593-15.1-.008A2.428 2.428 0 0 1 .29 10.777c-.39-2.99-.387-5.224.005-8.219A2.423 2.423 0 0 1 2.426.475Zm7.702 3.288a2.894 2.894 0 1 0 0 5.789 2.894 2.894 0 0 0 0-5.789Z"
    />
  </Svg>
)
export default Camera