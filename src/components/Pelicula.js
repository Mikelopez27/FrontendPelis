import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import {
  getAllPeliculas,
  createPelicula,
  updatePelicula,
  deletePelicula,
  getAllDirectores,
  getAllCategorias,
} from '../Service';

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieData, setMovieData] = useState({
    titulo: '',
    duracion: '',
    sinopsis: '',
    id_cate: '',
    id_dire: '',
    // otros campos de película
  });
  const [directors, setDirectors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchDirectors();
    fetchCategories();
  }, []);

  const fetchMovies = () => {
    getAllPeliculas()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  const fetchDirectors = () => {
    getAllDirectores()
      .then((response) => {
        setDirectors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching directors:', error);
      });
  };

  const fetchCategories = () => {
    getAllCategorias()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleCreateMovie = () => {
    createPelicula(movieData)
      .then(() => {
        fetchMovies();
        setShowModal(false);
        resetMovieData();
      })
      .catch((error) => {
        console.error('Error creating movie:', error);
      });
  };

  const handleUpdateMovie = () => {
    updatePelicula(selectedMovie.id, movieData)
      .then(() => {
        fetchMovies();
        setShowModal(false);
        setSelectedMovie(null);
        resetMovieData();
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
      });
  };

  const handleDeleteMovie = (id) => {
    deletePelicula(id)
      .then(() => {
        fetchMovies();
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
  };

  const resetMovieData = () => {
    setMovieData({
      titulo: '',
      duracion: '',
      sinopsis: '',
      id_cate: '',
      id_dire: '',
      // reiniciar otros campos de película si es necesario
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
    resetMovieData();
  };

  return (
    
    <div>
      <br></br><br></br>
      <h2>Películas</h2>
      <Button onClick={() => setShowModal(true)}>Agregar Nueva Película</Button>
      <Table striped bordered hover>
      <thead>
          <tr>
            <th>ID</th>
            <th>Pelicula</th>
            <th>Duracion</th>
            <th>Sinopsis</th>
            <th>Categoria</th>
            <th>Director</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
         
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.titulo}</td>
              <td>{movie.duracion}</td>
              <td>{movie.sinopsis}</td>
              <td>{movie.id_cate}</td>
              <td>{movie.id_dire}</td>
              <td>
                <Button onClick={() => {
                  setSelectedMovie(movie);
                  setMovieData({ ...movie });
                  setShowModal(true);
                }}>Editar</Button>
                <Button variant="danger" onClick={() => handleDeleteMovie(movie.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <br></br>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie ? 'Editar Película' : 'Nueva Película'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedMovie ? handleUpdateMovie : handleCreateMovie}>
            {/* Aquí se crean los campos del formulario para la película */}
            <Form.Group controlId="movieTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título de la película"
                value={movieData.titulo}
                onChange={(e) => setMovieData({ ...movieData, titulo: e.target.value })}
              />
            </Form.Group>
           
            <Form.Group controlId="movieDuration">
              <Form.Label>Duración</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la duración de la película"
                value={movieData.duracion}
                onChange={(e) => setMovieData({ ...movieData, duracion: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="movieSynopsis">
              <Form.Label>Sinopsis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la sinopsis de la película"
                value={movieData.sinopsis}
                onChange={(e) => setMovieData({ ...movieData, sinopsis: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="movieCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                value={movieData.id_cate}
                onChange={(e) => setMovieData({ ...movieData, id_cate: e.target.value })}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option key={category.id_cate} value={category.id_cate}>
                    {category.categoria}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="movieDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                as="select"
                value={movieData.id_dire}
                onChange={(e) => setMovieData({ ...movieData, id_dire: e.target.value })}
              >
                <option value="">Seleccione un director</option>
                {directors.map((director) => (
                  <option key={director.id_dire} value={director.id_dire}>
                    {director.director}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};

export default MovieTable;
