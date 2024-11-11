import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const MaterialForm = ({ addMaterial, editingMaterial, onAddQuantity }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingMaterial) {
      setName(editingMaterial.name);
      setQuantity(editingMaterial.quantity);
      setPrice(editingMaterial.price);
    } else {
      setName('');
      setQuantity('');
      setPrice('');
    }
  }, [editingMaterial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMaterial) {
      onAddQuantity(editingMaterial.id, quantity); // Add quantity
    } else {
      addMaterial({ name, quantity, price: Number(price) });
    }
    setName('');
    setQuantity(1);
    setPrice('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
    <div style={{backgroundColor:"#2a9d8f",height:"30px",display:"flex",
      alignItems:"center",justifyContent:"center",color:"white"
    }}>
      <Typography variant="h6">Add Material</Typography>
      </div>
      <TextField
        label="Material Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit"  style={{border:"2px solid #2a9d8f",color:"#2a9d8f"}}>
        {editingMaterial ? 'Update Material' : 'Add Material'}
      </Button>
    </Box>
  );
};

export default MaterialForm;
