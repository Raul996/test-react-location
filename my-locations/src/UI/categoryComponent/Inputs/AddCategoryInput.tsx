import { TextField, Button } from '@material-ui/core';
import React, { ChangeEvent, ReactElement, useState } from 'react';

export default function AddCategoryInput(props: {
    addCategoryEvent: Function;
}): ReactElement {
    const [categoryName, setCategoryName] = useState<string>('');

    function onChangeCategory(event: ChangeEvent<HTMLInputElement>): void {
        setCategoryName(event.target.value);
    }

    function send(): void {
        props.addCategoryEvent(categoryName);
        setCategoryName('');
    }

    return (
        <div>
            <TextField
                style={{ margin: '10px' }}
                value={categoryName}
                variant="outlined"
                label="Category"
                onChange={onChangeCategory}
            />
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
