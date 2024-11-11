// src/components/CustomerManagement.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CustomerManagement = ({ isDrawerOpen }) => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = { name, email, phone, address };

    if (editIndex !== null) {
      const updatedCustomers = [...customers];
      updatedCustomers[editIndex] = newCustomer;
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      setEditIndex(null);
    } else {
      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    }

    // Clear the form
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setName(customers[index].name);
    setEmail(customers[index].email);
    setPhone(customers[index].phone);
    setAddress(customers[index].address);
  };

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  return (
    <Container
      style={{
        marginLeft: isDrawerOpen ? '280px' : '0px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <h1>Customer Management System</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Customer Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <TextField
          label="Customer Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: '#2a9d8f', color: '#fff', marginTop: '16px' }}
        >
          {editIndex !== null ? 'Update Customer' : 'Add Customer'}
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: '24px', backgroundColor: '#e9f5f3' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} style={{ color: '#2a9d8f' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} style={{ color: '#2a9d8f' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomerManagement;
