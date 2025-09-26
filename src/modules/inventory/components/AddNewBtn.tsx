
import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
const AddNewBtn = () => {
  return (
    <Button sx={{width:"100%"}} variant="contained" color='warning' startIcon={<AddIcon />}>Add New Product</Button>
  )
}

export default AddNewBtn