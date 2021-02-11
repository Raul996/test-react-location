import React, { ReactElement } from 'react';
import { Category } from '../../../reducer/categoryReducer';

export default function ViewCategoryComponent(props: {
    categories: Category[];
}): ReactElement {
    return (
        <div>
            <ul>
                {props.categories.map((category) => {
                    return <li key={category.name}>{category.name}</li>;
                })}
            </ul>
        </div>
    );
}
