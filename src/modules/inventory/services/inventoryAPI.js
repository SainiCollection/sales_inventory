import apiClient from '../../../services/apiClient';

export const fetchItems = () => apiClient.get('/inventory');

export const createItem = (payload) => apiClient.post('/inventory', payload);
