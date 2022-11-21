import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import { MapRef } from "react-map-gl";

interface Props {
  mapRef: React.MutableRefObject<MapRef | null>;
  rangeValues: number[];
  rangeHandler: (value: number[]) => void;
}

function ZoomSlider({ mapRef, rangeValues, rangeHandler}: Props): JSX.Element {
  const map = mapRef.current;

  const handleChange = (event: Event, newValue: number | number[]) => {
    rangeHandler(newValue as number[]);
  };



  return (
    <div
      className="object-types"
      style={{
        zIndex: 100,
        position: "absolute",
        left: "50%",
        top: "1rem",
        width: "50%",
        transform: "translate(-50%, 0)",
        height: "max-content",
      }}
    >
      <Box>
        <Slider
          max={2000}
          getAriaLabel={() => "Temperature range"}
          value={rangeValues}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
}

export default ZoomSlider;
