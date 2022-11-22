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
    ObjectType: ObjectType;
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

export interface ObjectTypeEvent {
    value: ObjectType;
    checked: boolean
}



export type ObjectType = "RIG" |
    "STACK" |
    "BLDG" |
    "TOWER" |
    "POLE" |
    "ELEC_SYS" |
    "TL_TWR" |
    "TANK" |
    "BRIDGE" |
    "SIGN" |
    "REFINERY" |
    "FENCE" |
    "PLANT" |
    "GEN_UTIL" |
    "ELEVATOR" |
    "ANTENNA" |
    "NAVAID" |
    "CTRL_TWR" |
    "SILO" |
    "UTILITY_POLE" |
    "CRANE" |
    "BLDGTWR" |
    "VERTICAL_STRUCTURE" |
    "AG_EQUIP" |
    "CATENARY" |
    "WINDSOCK" |
    "DOME" |
    "SOLAR_PANELS" |
    "MET" |
    "AMUSEMENT_PARK" |
    "MONUMENT" |
    "STADIUM" |
    "COOL_TWR" |
    "DAM" |
    "WINDMILL" |
    "LANDFILL" |
    "POWER_PLANT" |
    "TRAMWAY" |
    "BALLOON" |
    "SPIRE" |
    "WALL" |
    "HEAT_COOL_SYSTEM" |
    "NATURAL_GAS_SYSTEM" |
    "LGTHOUSE" |
    "PIPELINE_PIPE" |
    "HANGAR" |
    "ARCH" |
    "GRAIN_ELEVATOR" |
    "GATE" |
    "WIND_INDICATOR" |
    "UNDEFINED"; 