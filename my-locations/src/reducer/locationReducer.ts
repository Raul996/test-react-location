import {
    LocationAction,
    LocationActionTypes,
} from '../actions/locationActions';

export interface Location {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    category: string;
}

export interface State {
    locations: Location[];
}

const initialState: State = {
    locations: [],
};

export function locationReducer(
    state = initialState,
    action: LocationAction
): State {
    switch (action.type) {
        case LocationActionTypes.addLocation: {
            return {
                locations: [...state.locations, action.payload],
            };
        }

        case LocationActionTypes.removeLocation: {
            return {
                ...state,
                locations: state.locations.filter(
                    (location) => location.name !== action.payload.name
                ),
            };
        }

        default: {
            return state;
        }
    }
}
