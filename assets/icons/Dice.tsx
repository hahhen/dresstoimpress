import * as React from "react"
import Svg, { SvgProps, Path, Ellipse } from "react-native-svg"
const Dice = (props: SvgProps) => (
    <Svg
        width={props.width ?? 20}
        height={((typeof props.width === "number" ? props.width : 20) * (21 / 20))}
        {...props}
        viewBox="0 0 21 20"
    >
        <Path
            fill={props.fill}
            d="M17.777 0C19.005 0 20 1.007 20 2.25V18c0 1.243-.995 2.25-2.223 2.25H2.223C.995 20.25 0 19.243 0 18V2.25C0 1.007.995 0 2.223 0h15.554ZM5.556 13.5a1.125 1.125 0 0 0 0 2.25h.011l.116-.006a1.125 1.125 0 0 0 0-2.238l-.116-.006h-.011Zm8.888 0a1.125 1.125 0 0 0 0 2.25h.012l.115-.006a1.125 1.125 0 0 0 0-2.238l-.115-.006h-.012Zm-8.888-9a1.125 1.125 0 0 0 0 2.25h.011l.116-.006a1.125 1.125 0 0 0 0-2.238L5.567 4.5h-.011Zm8.888 0a1.125 1.125 0 0 0 0 2.25h.012l.115-.006a1.125 1.125 0 0 0 0-2.238l-.115-.006h-.012Z"
        />
    </Svg>
)
export default Dice
