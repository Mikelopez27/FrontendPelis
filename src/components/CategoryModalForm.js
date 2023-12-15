import React from 'react';

const CategoryModalForm = ({ isOpen, handleClose, handleSubmit, inputs, initialValues }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e.target); }}>
          {inputs && inputs.map((input, index) => (
            <div key={index}>
              <label>{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={initialValues ? initialValues[input.name] : ''}
                onChange={(e) => {
                  initialValues[input.name] = e.target.value;
                }}
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

export default CategoryModalForm;
