import React from 'react';
import { Box, Button, ImageList, ImageListItem } from '@mui/material';

const PhotoList = (props) => {
    const { photos, loadMore } = props;

    return (
        <>
            <ImageList variant="masonry" cols={ 3 } gap={ 24 }>
                {
                    photos.map(photo => (
                        <ImageListItem key={ photo.id }>
                            <img src={ photo.urls.small } alt={ photo.alt_description } loading="lazy" />
                        </ImageListItem>
                    ))
                }

            </ImageList>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" onClick={ loadMore }>Load more</Button>
            </Box>
        </>

    );
};

export default PhotoList;