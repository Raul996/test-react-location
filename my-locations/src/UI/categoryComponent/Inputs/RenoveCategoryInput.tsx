import {
    Button,
    FormControl,
    makeStyles,
    Theme,
    createStyles,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { Category } from '../../../reducer/categoryReducer';
import React, { ReactElement, useState } from 'react';

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

export default function RemoveCategoryInput(props: {
    removeCategoryEvent: Function;
    categories: Category[];
}): ReactElement {
    const [categoryName, setCategoryName] = useState<Category>({ name: '' });

    const classes = useStyles();

    function remove(): void {
        props.removeCategoryEvent(categoryName.name);
        setCategoryName({ name: '' });
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryName}
                    onChange={(event) => {
                        const category = props.categories.find(
                            (category) =>
                                category.name === (event.target.value as string)
                        );

                        if (category) setCategoryName(category);
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
            <Button
                style={{ margin: '10px', marginTop: '20px' }}
                variant="contained"
                color="primary"
                onClick={remove}
            >
                Remove
            </Button>
        </div>
    );
}
