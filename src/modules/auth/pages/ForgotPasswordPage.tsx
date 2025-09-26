import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const ForgotPasswordPage: React.FC = () => (
  <Container maxWidth={'xs' as unknown as any}>
    <Box mt={8}>
      <Typography variant="h5" gutterBottom>
        Reset password
      </Typography>
      <form>
        <TextField fullWidth label="Email" margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send reset link
        </Button>
      </form>
    </Box>
  </Container>
);

export default ForgotPasswordPage;
