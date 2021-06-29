import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios'

export default function ModalForm(props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    websiteMonitor()
  };

  const handlePhoneChange=(e)=>{
    setPhone(e.target.value)
  }
  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  }

  const websiteMonitor= async()=>{
    try {
      
      const interval = setInterval( async function(){
        const response = await axios.get(props.url);
        console.log('response', response.status);
        if(response.status!==201 && response.status!==200){
          const data = {
            status:response.status,
            website:props.url,
            receiverEmail:email,
            phone_no: phone
          }
          if(email && phone){
            await axios.post("http://localhost:4000/send_email", {
              data
             })
             await axios.post("http://localhost:4000/send_sms", {
              data
             })
          }else if(email){
            await axios.post("http://localhost:4000/send_email", {
              data
             })
            
          }else if(phone){
             await axios.post("http://localhost:4000/send_sms", {
              data
             })
          }
         
        }
      },1000)

      setTimeout(function(){
        clearInterval(interval);
        console.log("clear interval worked")
      },props.time*1000)

    } catch (error) {
      console.error(error);
    }
  }

  const setDisable=()=>{
    console.log(props.isUrlEntered, props.isTimeSelected)

    if(props.isUrlEntered && props.isTimeSelected) return false

    return true;
  }

  return (
    <div>
      <Button variant="outlined" style={{width:'96%',position:'absolute',left:'12px'}} disabled={setDisable()} color="primary" onClick={handleClickOpen}>
        Monitor your website
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Monitoring</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide either your email or phone no to get notified about your web url
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={email}
            onChange={handleEmailChange}
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
          />
           <TextField
            autoFocus
            margin="dense"
            value={phone}
            onChange={handlePhoneChange}
            id="phone"
            label="Phone no"
            type="contact"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
