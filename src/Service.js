import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Endpoints para Directores
export const getAllDirectores = () => api.get('/directores/');
export const getDirectorById = (id) => api.get(`/directores/${id}`);
export const createDirector = (data) => api.post('/directores', data);
export const updateDirector = (id, data) => api.put(`/directores/${id}`, data);
export const deleteDirector = (id) => api.delete(`/directores/${id}`);

// Endpoints para Categorías
export const getAllCategorias = () => api.get('/categorias/');
export const getCategoriaById = (id) => api.get(`/categorias/${id}`);
export const createCategoria = (data) => api.post('/categorias', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);

// Endpoints para Películas
export const getAllPeliculas = () => api.get('/peliculas/');
export const getPeliculaById = (id) => api.get(`/peliculas/${id}`);
export const createPelicula = (data) => api.post('/peliculas', data);
export const updatePelicula = (id, data) => api.put(`/peliculas/${id}`, data);
export const deletePelicula = (id) => api.delete(`/peliculas/${id}`);