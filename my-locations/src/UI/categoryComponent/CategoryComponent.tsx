import React, { ReactElement, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory } from '../../actions/categoryActions';
import {
    AppBar,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import AirPlay from '@material-ui/icons/Airplay';
import AddCategoryInput from './Inputs/AddCategoryInput';
import EditCategoryInput from './Inputs/EditCategoryInput';
import RemoveCategoryInput from './Inputs/RenoveCategoryInput';
import ViewCategoryComponent from './Inputs/ViewCategoryComponent';
import { ViewState } from '../common';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

enum Title {
    add = 'Add Category',
    remove = 'Remove Categoty',
    edit = 'Edit Category',
    view = 'View Category',
}

export default function CategoryComponent(): ReactElement {
    const [viewState, setViewState] = useState<ViewState>(ViewState.view);
    const [title, setTitle] = useState<Title>(Title.view);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const categories = useSelector(
        (state: RootStateOrAny) => state.category.categories
    );

    const dispatch = useDispatch();

    const classes = useStyles();

    function onAddCategory(category: string) {
        if (!category) {
            setErrorMessage('Fill all fields');
            return;
        }

        dispatch(addCategory(category));

        if (errorMessage) {
            setErrorMessage('');
        }
    }

    function onRemoveCategory(category: string) {
        if (!category) {
            setErrorMessage('Fill all fields');
            return;
        }

        dispatch(removeCategory(category));

        if (errorMessage) {
            setErrorMessage('');
        }
    }

    function onEditCategory(category: string, newCategoryName: string): void {
        if (!category || !newCategoryName) {
            setErrorMessage('Fill all fields');
            return;
        }

        dispatch(removeCategory(category));
        dispatch(addCategory(newCategoryName));

        if (errorMessage) {
            setErrorMessage('');
        }
    }

    function view(): ReactElement {
        switch (viewState) {
            case ViewState.add:
                return <AddCategoryInput addCategoryEvent={onAddCategory} />;

            case ViewState.remove:
                return (
                    <RemoveCategoryInput
                        categories={categories}
                        removeCategoryEvent={onRemoveCategory}
                    />
                );

            case ViewState.edit: {
                return (
                    <EditCategoryInput
                        categories={categories}
                        editCategory={onEditCategory}
                    />
                );
            }

            default:
                return <ViewCategoryComponent categories={categories} />;
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>

                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.view);
                                setTitle(Title.view);
                            }}
                        >
                            <AirPlay />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.edit);
                                setTitle(Title.edit);
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.add);
                                setTitle(Title.add);
                            }}
                        >
                            <Add />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {
                                setViewState(ViewState.remove);
                                setTitle(Title.remove);
                            }}
                        >
                            <Remove />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            {errorMessage ? (
                <div>
                    <Alert severity="error">{errorMessage}</Alert>
                </div>
            ) : (
                <> </>
            )}

            {view()}
        </div>
    );
}
