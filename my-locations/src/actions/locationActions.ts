import { Location } from '../reducer/locationReducer';

export enum LocationActionTypes {
    addLocation = 'addLocation',
    removeLocation = 'removeLocation',
    editLocation = 'editLocation',
    viewLocation = 'viewLocation',
}

export type LocationAction = { type: LocationActionTypes; payload: Location };

export function addLocation(location: Location): LocationAction {
    return { type: LocationActionTypes.addLocation, payload: location };
}

export function removeLocation(location: Location): LocationAction {
    return { type: LocationActionTypes.removeLocation, payload: location };
}
