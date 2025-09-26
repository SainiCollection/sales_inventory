import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../authSlice';
import { fakeLogin } from '../services/authAPI';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
// 1. Define the form data type
interface LoginFormInputs {
  username: string;
  password: string;
}

// 2. Define validation schema
const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
}).required();

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  // 3. Type the onSubmit function
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await fakeLogin(data);
      dispatch(loginSuccess(res));
      navigate('/dashboard');
    } catch (e: any) {
      // TypeScript needs 'any' here because e may not be typed
      alert(e.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth={'xs' as unknown as any}>
      <Box mt={8}>
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register('username')}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password')}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign in
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
