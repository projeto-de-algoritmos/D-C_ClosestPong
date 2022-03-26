import React from "react";

type MapProps = React.HTMLProps<HTMLButtonElement>

const Map = React.forwardRef<HTMLCanvasElement, MapProps>((props, ref) => {

    return (
        <canvas ref={ref} className="map" width={props.width} height={props.height} style={{ backgroundColor: "black" }} />
    );
});

export default Map;