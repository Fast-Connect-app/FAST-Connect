import React, { Component } from 'react';
import { Box, Typography } from '@mui/material';

interface FooterProps {}

interface FooterState {}

class Footer extends Component<FooterProps, FooterState> {
  render() {
    return (
      <Box component="footer" className="bg-dark text-light" sx={{ py: 3, mt: 'auto' }}>
        <Typography variant="body1" align="center">
          {/* Copyright &copy; MyTodosList.com */}
        </Typography>
      </Box>
    );
  }
}

export default Footer;
