import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import api from './services';
import { Form, PhotoList } from './components';

function App() {
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!search) {
            getRandom({ count: 10, page });
        } else {
            getPhotos({ query: search, page })
        }
    }, [page]);

    const onSubmit = (query) => {
        setSearch(query)

        if (!query) {
            getRandom({ count: 10 })
        } else {
            getPhotos({ query });
        }
    }

    const getRandom = (params) => {
        api.photo().getRandom(params).then(response => {
            setPhotos(prevState => params.page ? [...prevState, ...response] : response)
        })
    }

    const getPhotos = (params) => {
        api.search().photos(params).then(response => {
            setPhotos(prevState => params.page ? [...prevState, ...response.results] : response.results);
        })
    }

    const loadMore = () => {
        setPage(prevState => prevState + 1);
    }

    return (
        <Container>
            <Box pt={ 4 } pb={ 4 }>
                <Form onSubmit={ onSubmit } />
                <div className="spacer" />
                <PhotoList photos={ photos } loadMore={ loadMore } />
            </Box>
        </Container>
    );
}

export default App;
