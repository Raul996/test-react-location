export enum ActionTypes {
    addCategory = 'addCategory',
    removeCategory = 'removeCategory',
    editCategory = 'editCategory',
    viewCategory = 'viewCategory',
}

export type Action = { type: ActionTypes; payload: string };

export function addCategory(category: string): Action {
    return { type: ActionTypes.addCategory, payload: category };
}

export function removeCategory(category: string): Action {
    return { type: ActionTypes.removeCategory, payload: category };
}
