import React,{useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'
import Page from './Page'
import Button from '@material-ui/core/Button';

import ModalForm from './ModalForm'

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    height:'34px',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  input1: {
    margin: theme.spacing(2),
    marginBottom:theme.spacing(8),
    width:'30rem'
  },
  input2: {
    margin: theme.spacing(3),
    marginBottom:theme.spacing(8),
    width:'8rem',
  },
  container:{
    position:'absolute',
    top:'35vh',
    left:'32vw'
  },
  urlInput:{
    position:'relative',
    top:'32px',
    height:'10px',
    width:'30rem',
    padding:'0px',
    marginBottom:'50px'
  },
  link:{
    width: '100px',
    // border: '2px solid #e0e0e0',
    height: '30px',
    position: 'relative',
    marginTop: '20px',
    top: '50px',
    left:'17vw'
  }
}));

export default function Home() {
  const classes = useStyles();
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');
  const [isUrlEntered, setUrlEntered] = useState(false);
  const [isTimeSelected, setTimeSelected] = useState(false);
  const [list, setList] = useState([])

  const handleChange = (e) => {
    setTime(e.target.value);
    setTimeSelected(e.target.value ? true:false)
  };

  const handleOnChange=(e)=>{
    setUrl(e.target.value)
    setUrlEntered(e.target.value ? true:false)
  }
  return (
    <div className={classes.container}>
      <div>
      <FormControl className={classes.input1}>
        <TextField className ={classes.urlInput} id="outlined-basic" value={url} onChange={handleOnChange} label="Enter your web url" variant="outlined" />
      </FormControl>
      <FormControl className={classes.input2}>
        <InputLabel id="demo-customized-select-label">Duration</InputLabel>
        <Select
          defaultValue='Enter your web url'
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={time}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={5}>5 seconds</MenuItem>
          <MenuItem value={10}>10 seconds</MenuItem>
          <MenuItem value={60}>1 minute</MenuItem>
          <MenuItem value={300}>5 minutes</MenuItem>
          <MenuItem value={600}>10 minutues</MenuItem>
          <MenuItem value={900}>15 minute</MenuItem>
          <MenuItem value={3600}>1 hour</MenuItem>
          <MenuItem value={21600}>6 hour</MenuItem>
          <MenuItem value={86400}>daily</MenuItem>
        </Select>
      </FormControl>
      <ModalForm 
       isUrlEntered={isUrlEntered}
       isTimeSelected={isTimeSelected} 
       url={url} 
       time={time} 
       list={list} 
       setList={setList}/>

      </div>
     
      <div className={classes.link}>
      <Link to={{
        pathname:'/report',
        state:{
          urls:list,
          lastTime:Date().toLocaleString()
        }
      }}>
        <Button variant='contained' color='primary'>
              Report
        </Button>
    </Link>
         

      </div>
     
    </div>
  );
}
