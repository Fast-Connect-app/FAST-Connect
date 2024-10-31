import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box component="footer" className="bg-dark text-light" sx={{ py: 3, mt: 'auto' }}>
            <Typography variant="body1" align="center">
                Copyright &copy; MyTodosList.com
            </Typography>
        </Box>
    );
};
