import React, { ReactElement } from 'react';
import { Location } from '../../../reducer/locationReducer';

export default function ViewLocation(props: {
    locations: Location[];
}): ReactElement {
    return (
        <div>
            <ul>
                {props.locations.map((location) => {
                    return (
                        <li style={{ cursor: 'pointer' }}>
                            <div>name: {location.name}</div>{' '}
                            <div>address: {location.address}</div>{' '}
                            <div>latitude: {location.latitude}</div>{' '}
                            <div>longitude: {location.longitude}</div>
                            <div>category: {location.category}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
