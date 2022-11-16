import { ControlPosition } from "react-map-gl";

// below are the interfaces for the GET /example endpoint response
export interface ExampleResponse {
    type: string;
    features: Feature[];
}

export interface Feature {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    OASNumber: number;
    Verified: string;
    Country: string;
    State: string;
    City: string;
    Latitude: number;
    Longitude: number;
    ObjectType: string;
    AGL: number;
    AMSL: number;
    LT: string;
    H: string;
    AccV: string;
    MarInd: string;
    FAAStudyNumber: string;
    Action: string;
    JDate: string;
    distanceFromLocation: number;
}

export interface ControlDropDown {
    value: ControlPosition;
    label: string;
}

export interface ObjectTypes {
    value: string;
    checked: boolean
}