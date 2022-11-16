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
import { ObjectType } from "typescript";
import "./App.css";
import { ControlDropDown, ExampleResponse, Feature, ObjectTypes } from "./app.model";
import Controls from "./controls";
import { DUMMY_RESPONSE } from "./example-response";
import ObjectTypesComponent from "./ObjectTypes";
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
  const [options, setOptions] = useState([true, true, true, true]);
  const mapRef = useRef<MapRef | null>(null);

  //extract the ObjectType from the response and put it in an array and extract the unique values
  const objectTypes = geoData.features?.map((feature) => feature.properties?.ObjectType);
 const uniqueObjectTypes = objectTypes?.filter((value, index, self) => self.indexOf(value) === index);
 //convert the unique values into an array of objects with the checked property set to true and value set to the unique value
const controlDropDown = uniqueObjectTypes?.map((value) => ({checked: true, value: value}));
 //store the unique values in a satet to be used in the dropdown
 let objectTypeList : ObjectTypes[];
 let setObjectTypeList: React.Dispatch<React.SetStateAction<ObjectTypes[]>>;
  [objectTypeList, setObjectTypeList] = useState(controlDropDown);

  useEffect(() => {
    if(!objectTypeList){
    setObjectTypeList(controlDropDown);
    }
  }, [controlDropDown]);

  const handleTypesChange = (object: any) => {
    setObjectTypeList(object)
  }


  const toggleControls = () => {
    setShowControls(!showControls);
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
        <ObjectTypesComponent objectTypes={objectTypeList} setObjectTypeList={handleTypesChange}/>
        {showControls && (
          <div>
            {options[0] && 
              <ScaleControl maxWidth={100} unit="metric" position={position} />}

            {options[1] && 
            <NavigationControl
              showCompass={true}
              showZoom={true}
              position={position}
            />}
            {options[2] &&
              <FullscreenControl position={position} />
            }
           {options[3] &&
            <GeolocateControl position={position} />
           }
          </div>
        )}

        {geoData.features &&
          geoData.features.map((feature, index) => (
            objectTypeList?.find((object) => object.value === feature.properties?.ObjectType)?.checked && (
              <Marker
                key={index}
                latitude={feature.properties.Latitude}
                longitude={feature.properties.Longitude}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setPopupInfo(feature);
                }}
              >
                <i className="bi bi-geo-alt-fill h2"></i>
              </Marker>
          )
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
      <button className="btn btn-primary" onClick={toggleControls} ref={clickRef} style={{display: 'none'}}>
        {showControls ? "Hide" : "Show"} Controls
      </button>
      <ZoomSlider mapRef={mapRef} />
    </div>
  );
}

export default App;
