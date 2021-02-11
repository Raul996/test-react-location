import {
    Button,
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { Location } from '../../../reducer/locationReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);

export default function RemoveLocation(props: {
    locations: Location[];
    OnDeleteLocation: Function;
}): ReactElement {
    const classes = useStyles();

    const [selectedLocation, setSelectedLocation] = useState<Location>({
        name: '',
        address: '',
        category: '',
        latitude: 0,
        longitude: 0,
    });

    return (
        <div>
            {' '}
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLocation.name}
                    onChange={(event) => {
                        if (props.locations) {
                            const savedLocations = props.locations.find(
                                (location) =>
                                    location.name === event.target.value
                            );

                            if (savedLocations) {
                                setSelectedLocation(savedLocations);
                            }
                        }
                    }}
                >
                    {props.locations.map((item: any) => {
                        return (
                            <MenuItem
                                key={item.name + '_item'}
                                value={item.name}
                            >
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button
                style={{ margin: '10px', marginTop: '20px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                    props.OnDeleteLocation(selectedLocation);
                }}
            >
                Delete
            </Button>
        </div>
    );
}
