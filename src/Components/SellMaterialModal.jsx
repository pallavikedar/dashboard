import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Typography } from '@mui/material';

const SellMaterialModal = ({ open, onClose, materials, onSell }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleSellMaterial = () => {
    const material = materials.find((m) => m.id === selectedMaterial);

    if (!material) {
      setError('Please select a material.');
      return;
    }

    if (quantity <= 0 || quantity > material.quantity) {
      setError(`Invalid quantity. Available quantity: ${material.quantity}`);
      return;
    }

    // Call onSell to update the material quantity and handle the sale
    onSell(selectedMaterial, quantity);
    setError('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: '100px auto', width: '400px' }}>
        <Typography variant="h6" gutterBottom>
          Sell Material
        </Typography>

        <TextField
          select
          label="Select Material"
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          fullWidth
          margin="normal"
        >
          {materials.map((material) => (
            <MenuItem key={material.id} value={material.id}>
              {material.name} (Available: {material.quantity})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
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
          onClick={handleSellMaterial}
          fullWidth
        >
          Sell
        </Button>
      </Box>
    </Modal>
  );
};

export default SellMaterialModal;
