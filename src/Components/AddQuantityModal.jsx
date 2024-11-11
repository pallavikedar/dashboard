import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const AddQuantityModal = ({ open, onClose, onAddQuantity, material }) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [error, setError] = useState('');

  const handleAddQuantity = () => {
    if (quantityToAdd <= 0) {
      setError('Quantity must be greater than zero.');
      return;
    }
    onAddQuantity(material.id, quantityToAdd);
    setQuantityToAdd(1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: '100px auto', width: '400px' }}>
        <Typography variant="h6" gutterBottom>
          Add Quantity for {material.name}
        </Typography>
        <TextField
          label="Quantity to Add"
          type="number"
          value={quantityToAdd}
          onChange={(e) => setQuantityToAdd(Number(e.target.value))}
          fullWidth
          margin="normal"
        />

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuantity}
          fullWidth
        >
          Add Quantity
        </Button>
      </Box>
    </Modal>
  );
};

export default AddQuantityModal;
