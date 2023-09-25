import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const UserLoadStack = ({ value }) => {
    const skeletons = [];

    for (let i = 0; i < value; i++) {
        skeletons.push(
            <React.Fragment key={i}>
                <Skeleton animation="wave" width={300} height={80} sx={{ marginTop: '-25px' }} />
            </React.Fragment>
        );
    }

    return (
        <Box sx={{ width: 300 }}>
            {skeletons}
        </Box>
    );
}

export default UserLoadStack;
