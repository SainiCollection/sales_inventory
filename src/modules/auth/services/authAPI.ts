export const fakeLogin = async ({ username, password }) => {
  // fake network delay
  await new Promise((res) => setTimeout(res, 500));
  if (username === 'admin' && password === 'password') {
    return { user: { name: 'Admin' }, token: 'fake-jwt-token' };
  }
  throw new Error('Invalid credentials');
};
