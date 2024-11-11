import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Typography } from '@mui/material';

const BillingModal = ({ open, onClose, materials, onGenerateInvoice }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [error, setError] = useState('');

  const handleGenerateInvoice = () => {
    const material = materials.find((m) => m.id === selectedMaterial);
    if (!material) {
      setError('Please select a material.');
      return;
    }

    if (quantity <= 0 || quantity > material.quantity) {
      setError(`Invalid quantity. Available quantity: ${material.quantity}`);
      return;
    }

    if (!customerName || !customerPhone || !customerAddress) {
      setError('Please fill in all customer details.');
      return;
    }

    const invoiceData = {
      materialName: material.name,
      quantity,
      pricePerUnit: material.price,
      totalAmount: quantity * material.price,
      customerName,
      customerPhone,
      customerAddress,
    };
    onGenerateInvoice(invoiceData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: '100px auto', width: '400px' }}>
        <Typography variant="h6" gutterBottom>
          Billing Information
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

        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Customer Phone"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Customer Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
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
          onClick={handleGenerateInvoice}
          fullWidth
        >
          Generate Invoice
        </Button>
      </Box>
    </Modal>
  );
};

export default BillingModal;
