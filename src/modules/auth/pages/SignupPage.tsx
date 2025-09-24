import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const SignupPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" gutterBottom>
          Create an account
        </Typography>
        <form>
          <TextField fullWidth label="Username" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
