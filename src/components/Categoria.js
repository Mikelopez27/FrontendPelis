import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { getAllCategorias, createCategoria, deleteCategoria, updateCategoria } from '../Service';

const CategoryTable = () => {
  const [categorias, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getAllCategorias()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleCreateCategory = () => {
    createCategoria({ categoria: categoryName })
      .then(() => {
        fetchCategories();
        setShowModal(false);
        setCategoryName('');
      })
      .catch((error) => {
        console.error('Error creating category:', error);
      });
  };

  const handleEditCategory = () => {
    updateCategoria(selectedCategory.id_cate, { categoria: categoryName })
      .then(() => {
        fetchCategories();
        setShowModal(false);
        setCategoryName('');
      })
      .catch((error) => {
        console.error('Error editing category:', error);
      });
  };

  const handleDeleteCategory = (id_cate) => {
    deleteCategoria(id_cate)
      .then(() => {
        fetchCategories();
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setCategoryName('');
  };

  return (
    <div>
      <h2>Categorías</h2>
      <Button onClick={() => setShowModal(true)}>Crear Nueva Categoría</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((category) => (
            <tr key={category.id_cate}>
              <td>{category.id_cate}</td>
              <td>{category.categoria}</td>
              <td>
                <Button onClick={() => {
                  setSelectedCategory(category);
                  setCategoryName(category.categoria);
                  setShowModal(true);
                }}>Editar</Button>
                <Button variant="danger" onClick={() => handleDeleteCategory(category.id_cate)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory ? 'Editar Categoría' : 'Nueva Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedCategory ? handleEditCategory : handleCreateCategory}>
            <Form.Group controlId="categoryName">
              <Form.Label>Nombre de la Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la categoría"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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

export default CategoryTable;
