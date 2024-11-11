import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material';
import AddQuantityModal from './AddQuantityModal'; // Import the modal

const MaterialList = ({ materials, onSellMaterial, onEditMaterial, onDeleteMaterial, onAddQuantity }) => {
  const [openAddQuantityModal, setOpenAddQuantityModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleOpenAddQuantityModal = (material) => {
    setSelectedMaterial(material);
    setOpenAddQuantityModal(true);
  };

  return (
    <Box sx={{ mt: 2 }}>
    <div style={{backgroundColor:"#2a9d8f",height:"30px",display:"flex",
      alignItems:"center",justifyContent:"center",color:"white"
    }}>
      <Typography variant="h6">Available Materials</Typography>
      </div>
      <List>
        {materials.map((material) => (
          <ListItem key={material.id}>
            <ListItemText 
              primary={material.name} 
              secondary={`Quantity: ${material.quantity} - Price: ${material.price}`} 
            />
            <Button variant="contained" color="secondary" onClick={() => onSellMaterial(material)}>
              Sell
            </Button>
           
            <Button variant="outlined" color="error" onClick={() => onDeleteMaterial(material.id)} sx={{ ml: 1 }}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => handleOpenAddQuantityModal(material)} sx={{ ml: 1 }}>
              Add Quantity
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Add Quantity Modal */}
      {selectedMaterial && (
        <AddQuantityModal
          open={openAddQuantityModal}
          onClose={() => setOpenAddQuantityModal(false)}
          onAddQuantity={onAddQuantity}
          material={selectedMaterial}
        />
      )}
    </Box>
  );
};

export default MaterialList;
