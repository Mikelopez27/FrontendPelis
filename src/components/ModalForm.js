import React, { useState, useEffect } from 'react';

const ModalForm = ({ isOpen, handleClose, handleSubmit, inputs }) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (isOpen && inputs && inputs.length > 0) {
      const initialFormValues = {};
      inputs.forEach((input) => {
        initialFormValues[input.name] = input.value || '';
      });
      setFormValues(initialFormValues);
    }
  }, [isOpen, inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formValues); }}>
          {inputs.map((input, index) => (
            <div key={index}>
              <label>{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={formValues[input.name] || ''}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit">Guardar</button>
        </form>
        <button onClick={handleClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalForm;