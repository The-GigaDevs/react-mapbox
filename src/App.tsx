import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, {
  ControlPosition,
  FullscreenControl,
  GeolocateControl, MapRef,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl
} from "react-map-gl";
import "./App.css";
import { ControlDropDown, ExampleResponse, Feature } from "./app.model";
import { DUMMY_RESPONSE } from "./example-response";
import ZoomSlider from "./ZoomSlider";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;


function App(): JSX.Element {
  const [geoData, setGeoData] = useState<ExampleResponse>(
    {} as ExampleResponse
  );
  let clickRef = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [position, setPosition] = useState<ControlPosition>("bottom-right");
  const [popupInfo, setPopupInfo] = useState<Feature | null>(null);
  const mapRef = useRef<MapRef | null>(null);


  const controlPositions: ControlDropDown[] = [
    { value: "top-left", label: "Top Left" },
    { value: "top-right", label: "Top Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-right", label: "Bottom Right" },
  ];

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const updatePosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pointer = e.target.value as ControlPosition;
    setPosition(pointer);
    // @ts-ignore: Object is possibly 'null'.
    clickRef.current.click();
  };

  useEffect(() => {

    setGeoData(DUMMY_RESPONSE);
  }, []);

  useEffect(() => {
    // @ts-ignore: Object is possibly 'null'.
    clickRef.current.click();
  }, [position]);

  function firstRender(){
    //this is a hack to make the slider work at the start. because until and unless there is a click on the map, the mapRef is null, hence the slider does not work. to make 
    //the slider work at the start, we are clicking on the map (means having some activity on the map when it loads first time).
    // @ts-ignore: Object is possibly 'null'.
   clickRef.current.click();
   //clicking again to show the controls on the map again. 
    // @ts-ignore: Object is possibly 'null'.
   clickRef.current.click();
  }

  return (
    <div className="container mt-3">
      <Map
        initialViewState={{
          latitude: 31,
          longitude: 74,
          zoom: 0,
        }}
        style={{ width: "100%", height: "50vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={ACCESS_TOKEN}
        ref={mapRef}
        onLoad={firstRender}
      >
        {showControls && (
          <div>
            <ScaleControl maxWidth={100} unit="metric" position={position} />
            <NavigationControl
              showCompass={true}
              showZoom={true}
              position={position}
            />
            <FullscreenControl position={position} />
            <GeolocateControl position={position} />
          </div>
        )}
        {geoData.features &&
          geoData.features.map((feature, index) => (
            <Marker
              key={index}
              latitude={feature.properties.Latitude}
              longitude={feature.properties.Longitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(feature);
              }}
            >
              <i className="bi bi-geo-alt-fill h4"></i>
            </Marker>
          ))}
        {popupInfo && (
          <Popup
            latitude={popupInfo.properties.Latitude}
            longitude={popupInfo.properties.Longitude}
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div
              className="mt-3"
              style={{ minHeight: "1.875rem", maxHeight: "2.5rem" }}
            >
              {popupInfo.properties.ObjectType} --- {popupInfo.properties.City}
            </div>
          </Popup>
        )}
      </Map>
      <button className="btn btn-primary" onClick={toggleControls} ref={clickRef}>
        {showControls ? "Hide" : "Show"} Controls
      </button>
      <select className="form-control" onChange={updatePosition}>
        <option value="">--- Select Control positions ---</option>
        {controlPositions.map((position, index) => (
          <option value={position.value} key={index}>
            {position.label}
          </option>
        ))}
      </select>
      <ZoomSlider mapRef={mapRef} />
    </div>
  );
}

export default App;
