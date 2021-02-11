import { Action, ActionTypes } from '../actions/categoryActions';

export interface Category {
    name: string;
}

export interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: [],
};

export function categoryReducer(
    state = initialState,
    action: Action
): CategoryState {
    switch (action.type) {
        case ActionTypes.addCategory: {
            const newCategory: Category = { name: action.payload };
            return {
                categories: [...state.categories, newCategory],
            };
        }

        case ActionTypes.removeCategory: {
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category.name !== action.payload
                ),
            };
        }

        case ActionTypes.editCategory: {
            return state;
        }

        case ActionTypes.viewCategory: {
            return state;
        }

        default: {
            return state;
        }
    }
}
