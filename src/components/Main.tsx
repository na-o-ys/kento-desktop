import * as React from "react"
import { Kento, KentoProps } from "./Kento"
import { InputGame } from "./InputGame"

export interface MainProps extends KentoProps {
    isGameEmpty: boolean
}

export const Main = (props: MainProps) => {
    if (props.isGameEmpty) return <InputGame />
    return <Kento {...props} />
}
