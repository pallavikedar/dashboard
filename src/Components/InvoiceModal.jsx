import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const InvoiceModal = ({ open, onClose, invoiceData }) => {
  if (!invoiceData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: '100px auto', width: '400px' }}>
        <Typography variant="h6" gutterBottom>
          Invoice
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Customer Name:</strong> {invoiceData.customerName}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> {invoiceData.customerPhone}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Address:</strong> {invoiceData.customerAddress}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Material:</strong> {invoiceData.materialName}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Quantity:</strong> {invoiceData.quantity}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Price per Unit:</strong> ${invoiceData.pricePerUnit}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Total Amount:</strong> ${invoiceData.totalAmount}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
