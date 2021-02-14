import { AppBar, IconButton } from '@material-ui/core';
import React from 'react';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory } from 'react-router-dom';

export default function BottomBar(): React.ReactElement {
    const history = useHistory();

    return (
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
    );
}
