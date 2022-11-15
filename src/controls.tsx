import "bootstrap/dist/css/bootstrap.min.css";
import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";


export default function Controls({options, handleChange, handleScaleChange, handleNavigationChange, handleFullScreenChange, handleGeolocateChange}: any) {


    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Scale Control"
                control={<Checkbox checked={options[0]} onChange={handleScaleChange} />}
            />
            <FormControlLabel
                label="Navigation Control"
                control={<Checkbox checked={options[1]} onChange={handleNavigationChange} />}
            />
            <FormControlLabel
                label="Fullscreen Control"
                control={<Checkbox checked={options[2]} onChange={handleFullScreenChange} />}
            />
            <FormControlLabel
                label="Geolocate Control"
                control={<Checkbox checked={options[3]} onChange={handleGeolocateChange} />}
            />
      </Box>
    )

    return(
        <div>
            <FormControlLabel
                label="Show Controls"
                control={
                    <Checkbox checked={options[0] && options[1] && options[2] && options[3]} 
                        indeterminate={options[1]}
                        onChange={handleChange}
                        />
                }
            />
            {children}
        </div>
    )
}