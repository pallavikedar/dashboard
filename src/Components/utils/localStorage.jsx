// utils/localStorage.js
export const getMaterialsFromLocalStorage = () => {
    const materials = localStorage.getItem('materials');
    return materials ? JSON.parse(materials) : [];
  };
  
  export const saveMaterialsToLocalStorage = (materials) => {
    localStorage.setItem('materials', JSON.stringify(materials));
  };
  