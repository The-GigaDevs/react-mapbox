import "bootstrap/dist/css/bootstrap.min.css";
import { MapProvider, useMap } from "react-map-gl";

function ZoomSlider() {
    // const { current: map } = useMap();
    const { map } = useMap();

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const zoom = +e.target.value;
        console.log(map);
        debugger;
        map?.flyTo({ zoom });
        // map?.setZoom(zoom);
    };

    return (
        <MapProvider >
            <label htmlFor="customRange3" className="form-label">
                Example range
            </label>
            <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                step="10"
                onChange={handleSliderChange}
                id="customRange3"
            />
        </MapProvider>
    );
}

export default ZoomSlider;
