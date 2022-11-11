import "bootstrap/dist/css/bootstrap.min.css";
import { MapProvider, MapRef } from "react-map-gl";

interface Props {
    mapRef: React.MutableRefObject<MapRef | null>;
}

function ZoomSlider({ mapRef }: Props): JSX.Element {

    const map = mapRef.current;
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const zoom = +e.target.value;
        map?.flyTo({ zoom });
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
                max="10"
                step="0.5"
                onChange={handleSliderChange}
            />
        </MapProvider>
    );
}

export default ZoomSlider;
