import {
    Button,
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Theme,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
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

export default function AddLocationInput(props: {
    OnAddLocation: Function;
}): ReactElement {
    const [location, setLocation] = useState<Location>({
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
        category: '',
    });

    const classes = useStyles();

    const categories = useSelector(
        (state: RootStateOrAny) => state.category.categories
    );

    function send(): void {
        props.OnAddLocation(location);
        setLocation({
            name: '',
            address: '',
            latitude: 0,
            longitude: 0,
            category: '',
        });
    }

    return (
        <div>
            <TextField
                style={{ margin: '10px' }}
                value={location.name}
                variant="outlined"
                label="Location name"
                onChange={(event) => {
                    setLocation((prevState) => ({
                        ...prevState,
                        name: event.target.value,
                    }));
                }}
            />

            <TextField
                style={{ margin: '10px' }}
                value={location.address}
                variant="outlined"
                label="Location address"
                onChange={(event) => {
                    setLocation((prevState) => ({
                        ...prevState,
                        address: event.target.value,
                    }));
                }}
            />

            <TextField
                type="number"
                style={{ margin: '10px' }}
                value={location.latitude}
                variant="outlined"
                label="Location latitude"
                onChange={(event) => {
                    setLocation((prevState) => ({
                        ...prevState,
                        latitude: parseFloat(event.target.value),
                    }));
                }}
            />

            <TextField
                type="number"
                style={{ margin: '10px' }}
                value={location.longitude}
                variant="outlined"
                label="Location longitude"
                onChange={(event) => {
                    setLocation((prevState) => ({
                        ...prevState,
                        longitude: parseFloat(event.target.value),
                    }));
                }}
            />

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={location.category}
                    onChange={(event) => {
                        setLocation((prevState) => ({
                            ...prevState,
                            category: event.target.value as string,
                        }));
                    }}
                >
                    {categories.map((item: any) => {
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
                onClick={send}
            >
                Send
            </Button>
        </div>
    );
}
