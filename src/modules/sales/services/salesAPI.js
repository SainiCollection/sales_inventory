import apiClient from '../../../services/apiClient';

export const fetchSales = () => apiClient.get('/sales');
