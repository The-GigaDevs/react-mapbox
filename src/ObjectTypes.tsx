import FormControlLabel from "@mui/material/FormControlLabel";
import Grow from "@mui/material/Grow";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { ObjectTypes } from "./app.model";

interface Props {
    objectTypes: ObjectTypes[];
    setObjectTypeList: (object: any) => void;
}

export default function ObjectTypesComponent({
    objectTypes,
    setObjectTypeList,
}: Props): JSX.Element {
    const [open, setOpen] = useState(false);

    const handleSwitchChange = (object: any) => {
        const newObjectTypes = objectTypes.map((obj: any) => {
            if (obj.value === object.value) {
                obj.checked = !obj.checked;
            }
            return obj;
        });
        setObjectTypeList(newObjectTypes);
    };

    return (
        <div
            className="object-types"
            style={{
                position: "absolute",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1.3rem",
                paddingTop: "1.3rem",
                left: "1.3rem",
            }}
        >
            <FormControlLabel
                control={<Switch checked={open} onChange={() => setOpen(!open)} />}
                label="Object Types"
            />
            {/* <Box sx={{ display: 'flex', direction: 'column'}}> */}

            {objectTypes.map((objectType: any, index: number) => {
                return (
                    <Grow in={open} key={index}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={objectType.checked}
                                    onChange={() => handleSwitchChange(objectType)}
                                />
                            }
                            label={objectType.value}
                        />
                    </Grow>
                );
            })}
            {/* </Box> */}
        </div>
    );
}
