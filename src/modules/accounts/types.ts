export interface UserAccount {
  id: number | string;
  username: string;
  email?: string;
  role?: string;
}

export interface AccountsState {
  users: UserAccount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}
