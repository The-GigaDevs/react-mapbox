import Slider from "@mui/material/Slider";
import { MapRef } from "react-map-gl";

interface Props {
    mapRef: React.MutableRefObject<MapRef | null>;
}

function ZoomSlider({ mapRef }: Props): JSX.Element {
    const map = mapRef.current;

    const handleMaterialSlider = (e: Event, value: number | number[]) => {
        map?.flyTo({ zoom: value as number });
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
            <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={1}
                marks
                min={0}
                max={20}
                valueLabelDisplay="auto"
                size="medium"
                onChange={handleMaterialSlider}
                style={{ height: "12px" }}
            />
        </div>
    );
}

export default ZoomSlider;
