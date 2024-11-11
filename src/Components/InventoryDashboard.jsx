const InventoryDashboard = ({ materials }) => {
    return (
      <div>
        <h2>Inventory Dashboard</h2>
        <ul>
          {materials.map((material) => (
            <li key={material.id}>
              <p>
                {material.name} - {material.quantity} units
                {material.quantity === 0 && <span> ⚠️ Out of stock</span>}
                {material.quantity < 10 && material.quantity > 0 && <span> ⚠️ Low stock</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default InventoryDashboard;
  