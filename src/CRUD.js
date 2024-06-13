import React, {useState,useEffect, Fragment} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const CRUD= ()=>{
    const employeeData=[{
        id:1,
        name:"dishant",
        age:23,
        isActive:1,
    },
    {
        id:2,
        name:"soni",
        age:22,
        isActive:0,
    },
    {
        id:3,
        name:"hello",
        age:12,
        isActive:1,
    },
    {
        id:4,
        name:"dummy",
        age:18,
        isActive:0,
    },
];
    const [data,setData]=useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [isActive,setIsActive]=useState(false);

    const [editId,setEditId]=useState(0);
    const [editName,setEditName]=useState('');
    const [editAge,setEditAge]=useState('');
    const [editIsActive,setEditIsActive]=useState(false);
useEffect(()=>{
    
   getData();
    
},[]);
const getData=()=>{
  axios.get('http://localhost:5176/Api/Employee').then((result)=>{
    setData(result.data);
  })
}
const handleEdit=(id)=>{
    handleOpen();
    axios.get(`http://localhost:5176/Api/Employee/${id}`).then((result)=>{
          setEditName(result.data.name);
          setEditAge(result.data.age);
          setEditIsActive(result.data.isActive);
          setEditId(id);
    }).catch((error)=>{
      toast.error(error);
    })
}
const handleUpdate=()=>{
  const url=`http://localhost:5176/Api/Employee/${editId}`
  const data={
    "id":editId,
    "name":editName,
    "age":editAge,
    "isActive":editIsActive,
  }
  axios.put(url,data).then((result)=>{
      getData();
      clear();
      handleClose();
      toast.success("The employee has been updated");
  }).catch((error)=>{
    toast.error(error);
  })
}
const handleSave=()=>{
  const url= 'http://localhost:5176/Api/Employee';
  const data={
    "name":name,
    "age":age,
    "isActive":isActive
  };
  axios.post(url,data).then((result)=>{
    getData();
    clear();
    toast.success('Employee has been added');
  }).catch((error)=>{
    toast.error(error);
  });
}
const clear=()=>{
  setName('');
  setAge('');
  setIsActive(false);
  setEditAge('');
  setEditName('');
  setEditId('');
}
const handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete")==true)
    {
        axios.delete(`http://localhost:5176/Api/Employee/${id}`).then((result)=>{
            if(result.status==200)
            {
                toast.success("Employee has been deleted");
                getData();
            }
        });
    }
}
    return (
        <Fragment>
          <ToastContainer/>
           <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
    
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Age</label>
    <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" value={isActive} checked={isActive} onChange={(e)=>setIsActive(e.target.checked)} className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">isActive</label>
  </div>
  <button type="button" onClick={()=>{handleSave()}} className="btn btn-primary">Submit</button>
</form>
         <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">isActive</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {
          data && data.length>0?
          data.map((element,index) => {
            return (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {index+1}
              </TableCell>
              <TableCell align="center">{element.name}</TableCell>
              <TableCell align="center">{element.age}</TableCell>
              <TableCell align="center"><Checkbox {...label} checked={element.isActive}/></TableCell>
              <TableCell colSpan={2} align="center"><Button onClick={()=>handleDelete(element.id)} variant="outlined" color="error">
  Delete
</Button>
<Button onClick={()=>handleEdit(element.id)} sx={{ marginLeft: '30px' }} variant="contained">Edit</Button>
</TableCell>
            </TableRow>
            )
}):"loading....."}
        </TableBody>
      </Table>
      
    </TableContainer>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{marginBottom:'20px'}} variant="h6" component="h2">
            Modify employee
          </Typography>
          <TextField
          required
          id="outlined-required"
          label="Name"
          value={editName}
          onChange={(e)=>setEditName(e.target.value)}
        />
        <TextField
            sx={{marginTop:"10px"}}
          id="outlined-required"
          label="Age"
          value={editAge}
          onChange={(e)=>setEditAge(e.target.value)}
        />
        <br></br>
        <Checkbox {...label} checked={editIsActive} onChange={()=>setEditIsActive(!editIsActive)}/>
        <br></br>
        <Button onClick={()=>handleUpdate()} variant="contained">Save Chnages</Button>
        </Box>
      </Modal>
      </Fragment>
    )
};

export default CRUD;