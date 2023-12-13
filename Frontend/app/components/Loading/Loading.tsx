import React from "react";
import ReactLoading from "react-loading";

type Props = {
    type?:
        | "blank"
        | "balls"
        | "bars"
        | "bubbles"
        | "cubes"
        | "cylon"
        | "spin"
        | "spinningBubbles"
        | "spokes";
    color?: string;
};
const Loading = ({ type, color }: Props) => (
    <ReactLoading
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        type={type || "bubbles"}
        color={color || "#000000"}
        height={667}
        width={375}
    />
);

export default Loading;
