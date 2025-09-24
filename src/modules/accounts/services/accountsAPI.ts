import apiClient from '../../../services/apiClient';

export const fetchAccounts = () => apiClient.get('/accounts');
