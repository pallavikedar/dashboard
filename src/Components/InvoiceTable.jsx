import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Typography } from '@mui/material';

const InvoiceTable = ({ invoices }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
    <div style={{backgroundColor:"#2a9d8f",height:"30px",display:"flex",
      alignItems:"center",justifyContent:"center",color:"white"
    }}>
    
    <Typography variant="h6">Invoice list</Typography>
    </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Material Name</TableCell>
           
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>{invoice.materialName}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>{invoice.pricePerUnit}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
              <TableCell>{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
