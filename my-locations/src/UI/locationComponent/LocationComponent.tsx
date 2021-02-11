import {
    AppBar,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { Add, Edit, Remove } from '@material-ui/icons';
import AirPlay from '@material-ui/icons/Airplay';
import React, { ReactElement, useState } from 'react';
import { ViewState } from '../common';
import { useHistory } from 'react-router-dom';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ViewLocation from './Inputs/ViewLocation';
import RemoveLocation from './Inputs/RemoveLocation';
import EditLocation from './Inputs/EditLocation';
import AddLocationInput from './Inputs/AddLocationInput';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Location } from '../../reducer/locationReducer';
import { addLocation, removeLocation } from '../../actions/locationActions';
import { Alert } from '@material-ui/lab';

enum LocationTitle {
    add = 'Add Location',
    remove = 'Remove Location',
    edit = 'Edit Location',
    view = 'View Location',
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export default function LocationComponent(): ReactElement {
    const [viewState, setViewState] = useState<ViewState>(ViewState.view);
    const [title, setTitle] = useState<LocationTitle>(LocationTitle.view);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const locations: Location[] = useSelector((state: RootStateOrAny) => {
        return state.location.locations;
    });

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    function onAddLocation(location: Location): void {
        if (
            !location.name ||
            !location.address ||
            !location.category ||
            location.latitude === 0 ||
            location.longitude === 0
        ) {
            setErrorMessage('Fill all fields');
            return;
        }

        dispatch(addLocation(location));

        if (errorMessage) {
            setErrorMessage('');
        }
    }

    function OnDeleteLocation(location: Location): void {
        if (
            !location.name ||
            !location.address ||
            !location.category ||
            location.latitude === 0 ||
            location.longitude === 0
        ) {
            setErrorMessage('Fill all fields');
            return;
        }

        dispatch(removeLocation(location));

        if (errorMessage) {
            setErrorMessage('');
        }
    }

    function OnEditLocation(
        oldLocation: Location,
        newLocation: Location
    ): void {
        if (
            !oldLocation.name ||
            !oldLocation.address ||
            !oldLocation.category ||
            oldLocation.latitude === 0 ||
            oldLocation.longitude === 0
        ) {
            setErrorMessage('Fill all fields');
            return;
        }

        if (
            !newLocation.name ||
            !newLocation.address ||
            !newLocation.category ||
            newLocation.latitude === 0 ||
            newLocation.longitude === 0
        ) {
            setErrorMessage('Fill all fields');
            return;
        }

        dispatch(removeLocation(oldLocation));
        dispatch(addLocation(newLocation));

        if (errorMessage) {
            setErrorMessage('');
        }
    }

    function view(): ReactElement {
        switch (viewState) {
            case ViewState.add: {
                return <AddLocationInput OnAddLocation={onAddLocation} />;
            }

            case ViewState.remove: {
                return (
                    <RemoveLocation
                        OnDeleteLocation={OnDeleteLocation}
                        locations={locations}
                    />
                );
            }

            case ViewState.edit: {
                return (
                    <EditLocation
                        OnEditLocation={OnEditLocation}
                        locations={locations}
                    />
                );
            }

            default:
                return <ViewLocation locations={locations} />;
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>

                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.view);
                                setTitle(LocationTitle.view);
                            }}
                        >
                            <AirPlay />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.edit);
                                setTitle(LocationTitle.edit);
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.add);
                                setTitle(LocationTitle.add);
                            }}
                        >
                            <Add />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.remove);
                                setTitle(LocationTitle.remove);
                            }}
                        >
                            <Remove />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            {errorMessage ? (
                <div>
                    <Alert severity="error">{errorMessage}</Alert>
                </div>
            ) : (
                <> </>
            )}

            {view()}

            <AppBar
                style={{
                    top: 'auto',
                    left: 'auto',
                    right: '0',
                    bottom: '0',
                    position: 'absolute',
                    textAlign: 'center',
                }}
            >
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                            history.push('/category');
                        }}
                    >
                        <CategoryIcon />
                    </IconButton>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                            history.push('/location');
                        }}
                    >
                        <LocationOnIcon />
                    </IconButton>
                </div>
            </AppBar>
        </div>
    );
}
