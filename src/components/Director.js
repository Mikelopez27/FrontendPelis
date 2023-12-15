import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import {
  getAllDirectores,
  createDirector,
  updateDirector,
  deleteDirector
} from '../Service';

const DirectorTable = () => {
  const [directores, setDirectores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [directorName, setDirectorName] = useState('');

  useEffect(() => {
    fetchDirectores();
  }, []);

  const fetchDirectores = () => {
    getAllDirectores()
      .then((response) => {
        setDirectores(response.data);
      })
      .catch((error) => {
        console.error('Error fetching directors:', error);
      });
  };

  const handleCreateDirector = () => {
    createDirector({ director: directorName })
      .then(() => {
        fetchDirectores();
        setShowModal(false);
        setDirectorName('');
      })
      .catch((error) => {
        console.error('Error creating director:', error);
      });
  };

  const handleEditDirector = () => {
    updateDirector(selectedDirector.id_dire, { director: directorName })
      .then(() => {
        fetchDirectores();
        setShowModal(false);
        setDirectorName('');
      })
      .catch((error) => {
        console.error('Error editing director:', error);
      });
  };

  const handleDeleteDirector = (id_dire) => {
    deleteDirector(id_dire)
      .then(() => {
        fetchDirectores();
      })
      .catch((error) => {
        console.error('Error deleting director:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDirector(null);
    setDirectorName('');
  };

  return (
    <div>
      <br></br><br></br>
      <h2>Directores</h2>
      <Button onClick={() => setShowModal(true)}>Agregar Nuevo Director</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Director</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director.id_dire}>
              <td>{director.id_dire}</td>
              <td>{director.director}</td>
              <td>
                <Button onClick={() => {
                  setSelectedDirector(director);
                  setDirectorName(director.director);
                  setShowModal(true);
                }}>Editar</Button>
                <Button variant="danger" onClick={() => handleDeleteDirector(director.id_dire)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDirector ? 'Editar Director' : 'Nuevo Director'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedDirector ? handleEditDirector : handleCreateDirector}>
            <Form.Group controlId="directorName">
              <Form.Label>Nombre del Director</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del director"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
              />
            </Form.Group><br></br>
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

export default DirectorTable;
