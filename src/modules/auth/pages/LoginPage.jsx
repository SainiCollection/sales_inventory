import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../authSlice';
import { fakeLogin } from '../services/authAPI';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fakeLogin(data);
      dispatch(loginSuccess(res));
      navigate('/dashboard');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Username" margin="normal" {...register('username')} />
          <TextField fullWidth label="Password" type="password" margin="normal" {...register('password')} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign in
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
