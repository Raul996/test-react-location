import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Category } from '../../../reducer/categoryReducer';

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

export default function EditCategoryInput(props: {
    categories: Category[];
    editCategory: Function;
}): ReactElement {
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [selecetedCategory, setSelectedCategory] = useState<string>('');

    const classes = useStyles();

    function onNewCategoryName(event: ChangeEvent<HTMLInputElement>): void {
        setNewCategoryName(event.target.value);
    }

    function edit(): void {
        props.editCategory(selecetedCategory, newCategoryName);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selecetedCategory}
                    onChange={(event) => {
                        setSelectedCategory(event.target.value as string);
                    }}
                >
                    {props.categories.map((item: any) => {
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

            <TextField
                style={{ margin: '30px' }}
                value={newCategoryName}
                variant="outlined"
                label="New category name"
                onChange={onNewCategoryName}
            />

            <Button
                style={{ margin: '10px', marginTop: '20px' }}
                variant="contained"
                color="primary"
                onClick={edit}
            >
                Edit
            </Button>
        </div>
    );
}
