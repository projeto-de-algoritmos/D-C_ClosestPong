import React, { FC, useRef, useEffect } from "react";

interface MapProps {
    columns: number;
    rows: number;
    ref: any;
}

const Map =  React.forwardRef<HTMLCanvasElement>((props, ref) => {

    return (
        <canvas ref={ref} className="map" width={1024} height={780} style={{backgroundColor: "black"}}>a</canvas>
    );
});

export default Map;