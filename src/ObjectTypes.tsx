import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import  Switch  from "@mui/material/Switch";
import  FormControlLabel  from "@mui/material/FormControlLabel";
import  Grow from "@mui/material/Grow";
import  Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
export default function ObjectTypesComponent ({objectTypes, setObjectTypeList} : any)  {

    const [open, setOpen] = useState(false);


    const handleSwitchChange = (object: any) => {
        const newObjectTypes = objectTypes.map((obj: any) => {
            if (obj.value === object.value) {
                obj.checked = !obj.checked;
            }
            return obj;
        });
        setObjectTypeList(newObjectTypes);
    }


    return (
        <div style={{position: 'absolute', zIndex: 100, display: 'flex', flexDirection: 'column'}}>
            <FormControlLabel
                control={<Switch checked={open} onChange={() => setOpen(!open)} />}
                label="Object Types"
            />
            {/* <Box sx={{ display: 'flex', direction: 'column'}}> */}
                
                    {objectTypes.map((objectType: any) => {
                        return (
                            <Grow in={open}>
                                <FormControlLabel
                                    control={<Switch checked={objectType.checked} onChange={() => handleSwitchChange(objectType)} />}
                                    label={objectType.value}
                                />  
                            </Grow>
                        )
                    })
                }
            {/* </Box> */}
        </div>   
    )

}
