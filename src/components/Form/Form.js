import React, { useMemo, useState } from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

const SIZE_OF_SUGGEST = 5;
const STORAGE_KEY = 'suggest';

const Form = (props) => {
    const { onSubmit } = props;

    const classes = useStyles();

    const [search, setSearch] = useState('');

    const suggestions = useMemo(() => {
        const suggest = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (!search) {
            return suggest;
        }

        return suggest.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    }, [search])

    const onChange = e => {
        setSearch(e.target.value)
    }

    const onChangeValue = (_, newValue) => {
        setSearch(newValue)
    }

    const clickHandler = () => {
        const value = search ? search.trim() : search;
        onSubmit(value);

        if (value) {
            updateStorage(value);
        }
    }

    const updateStorage = (value) => {
        let suggest = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

        if (suggest.includes(value)) {
            suggest = suggest.filter(item => item !== value);
        }

        suggest.unshift(value);

        if (suggest.length > SIZE_OF_SUGGEST) {
            suggest.pop();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(suggest));
    }

    return (
        <Grid container spacing={ 2 } justifyContent="center">
            <Grid item xs={ 12 } sm={ 6 }>
                <Autocomplete
                    onChange={ onChangeValue }
                    clearOnBlur={ false }
                    options={ suggestions }
                    renderInput={ params => (
                        <TextField
                            { ...params }
                            value={ search }
                            onChange={ onChange }
                            label="Search"
                            placeholder="What do you want find?"
                        />)
                    }
                />
            </Grid>

            <Grid item xs={ 12 } sm={ 2 }>
                <Button
                    className={ classes.button }
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={ clickHandler }
                >Search</Button>
            </Grid>
        </Grid>
    );
};

export default Form;