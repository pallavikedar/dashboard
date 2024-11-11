import React, { useState, useEffect } from 'react';
import { Container, Typography, AppBar, Toolbar } from '@mui/material';
import MaterialForm from './MaterialForm';
import MaterialList from './MaterialList';
import BillingModal from './BillingModal';
import InvoiceModal from './InvoiceModal';
import { getMaterialsFromLocalStorage, saveMaterialsToLocalStorage } from './utils/localStorage';
import InvoiceTable from './InvoiceTable';

const Material = ({ isDrawerOpen }) => {
  const [materials, setMaterials] = useState(getMaterialsFromLocalStorage());
  const [openBillingModal, setOpenBillingModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [billings, setBillings] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [invoices, setInvoices] = useState([]); 

  useEffect(() => {
    saveMaterialsToLocalStorage(materials);
  }, [materials]);

  const addMaterial = (material) => {
    const newMaterial = { ...material, id: Date.now() };
    setMaterials([...materials, newMaterial]);
  };

  const handleSellMaterial = () => {
    setOpenBillingModal(true);
  };

  const handleGenerateInvoice = (invoiceData) => {
    const materialIndex = materials.findIndex((m) => m.name === invoiceData.materialName);
    if (materialIndex > -1) {
        const updatedMaterials = [...materials];
        updatedMaterials[materialIndex].quantity -= invoiceData.quantity; // Deduct quantity
        setMaterials(updatedMaterials);
    }

    // Add invoice data to invoices state with the current date
    const currentDate = new Date().toLocaleDateString(); // Format date as needed
    const newInvoice = {
        ...invoiceData,
        date: currentDate, // Add the current date to the invoice
        id: Date.now() // Unique ID for the invoice
    };

    setInvoices([...invoices, newInvoice]); // Store bill with an ID
    setInvoiceData(newInvoice);
    setOpenInvoiceModal(true);
};

  const handleCloseInvoiceModal = () => {
    setOpenInvoiceModal(false);
    setInvoiceData(null);
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setOpenBillingModal(true); // This can also be a separate edit modal
  };

  const handleDeleteMaterial = (id) => {
    const updatedMaterials = materials.filter((material) => material.id !== id);
    setMaterials(updatedMaterials);
  };
  const handleAddQuantity = (id, quantity) => {
    const updatedMaterials = materials.map((material) => {
      if (material.id === id) {
        return { ...material, quantity: material.quantity + quantity };
      }
      return material;
    });
    setMaterials(updatedMaterials);
  };


  return (
    <Container  style={{ marginLeft: isDrawerOpen ? '280px' : '0px', transition: 'margin-left 0.3s ease' }}>
      

      <MaterialForm addMaterial={addMaterial} />
      <MaterialList
        materials={materials}
        
        onSellMaterial={handleSellMaterial}
        onEditMaterial={handleEditMaterial}
        onDeleteMaterial={handleDeleteMaterial}
        onAddQuantity={handleAddQuantity}
      />

      <BillingModal
        open={openBillingModal}
        onClose={() => setOpenBillingModal(false)}
        materials={materials}
        onGenerateInvoice={handleGenerateInvoice}
      />

      <InvoiceModal
        open={openInvoiceModal}
        onClose={handleCloseInvoiceModal}
        invoiceData={invoiceData}
      />
      <InvoiceTable invoices={invoices} />
    </Container>
  );
};

export default Material;
