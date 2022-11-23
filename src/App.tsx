import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import "./App.css";
import {
  ExampleResponse,
  Feature,
  ObjectType,
  ObjectTypeEvent,
} from "./app.model";
import ObjectTypesComponent from "./ObjectTypes";
import ZoomSlider from "./ZoomSlider";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function App(): JSX.Element {
  // States
  const [geoData, setGeoData] = useState<ExampleResponse>(
    {} as ExampleResponse
  );
  const [popupInfo, setPopupInfo] = useState<Feature | null>(null);
  const [rangeValues, setRangeValues] = useState([75, 2000]);

  let objectTypeList: ObjectTypeEvent[];
  let setObjectTypeList: React.Dispatch<
    React.SetStateAction<ObjectTypeEvent[]>
  >;
  [objectTypeList, setObjectTypeList] = useState([] as ObjectTypeEvent[]);

  // Side effects
  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_URL;
    fetch(`${baseURL}/example`)
      .then((response) => response.json())
      .then((data: ExampleResponse) => {
        setGeoData(data);

        const objectTypes = data.features?.map(
          (feature) => feature.properties?.ObjectType
        );
        const uniqueObjectTypes = objectTypes?.filter(
          (value, index, self) => self.indexOf(value) === index
        );

        // after getting response populate the objectTypesList
        const values = Object.keys(ObjectType).map((key) => {
          const value = key as ObjectType;
          return {
            checked: uniqueObjectTypes?.includes(value),
            value,
          };
        });

        setObjectTypeList(values);
      });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Map
        initialViewState={{
          latitude: 31,
          longitude: 74,
          zoom: 0,
        }}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={ACCESS_TOKEN}
      >
        <ObjectTypesComponent
          objectTypes={objectTypeList}
          setObjectTypeList={setObjectTypeList}
        />
        <div>
          <ScaleControl maxWidth={100} unit="metric" position="bottom-right" />

          <NavigationControl
            showCompass={true}
            showZoom={true}
            position="bottom-right"
          />
          <FullscreenControl position="bottom-right" />
          <GeolocateControl position="bottom-right" />
        </div>

        {geoData.features &&
          geoData.features.map(
            (feature, index) =>
              objectTypeList?.find(
                (object) => object.value === feature.properties?.ObjectType
              )?.checked &&
              feature.properties.AGL > rangeValues[0] &&
              feature.properties.AGL <= rangeValues[1] && (
                <Marker
                  key={index}
                  latitude={feature.properties.Latitude}
                  longitude={feature.properties.Longitude}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(feature);
                  }}
                >
                  <i
                    className="bi bi-geo-alt-fill h2"
                    style={{ fontSize: "25px" }}
                  ></i>
                </Marker>
              )
          )}
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
              style={{
                minHeight: "30px",
                maxHeight: "35px",
                marginTop: "1.1rem",
              }}
            >
              {popupInfo.properties.ObjectType} --- {popupInfo.properties.City}
            </div>
          </Popup>
        )}
      </Map>
      <ZoomSlider rangeValues={rangeValues} rangeHandler={setRangeValues} />
    </div>
  );
}

export default App;
