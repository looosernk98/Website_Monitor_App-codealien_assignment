import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container:{
      margin:'30px'
  },
  link:{
      marginTop:'40px'
  }
});

export default function Page(props) {
  const classes = useStyles();
 console.log("props ->",props.location.state)
 console.log("params ->",props.match.params)
  return (
      <div className={classes.container}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Urls</TableCell>
                    <TableCell >Last Time Monitored</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.location.state.urls.map((row, index) => (
                    <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {row}
                    </TableCell>
                    <TableCell>{props.location.state.lastTime}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
       </TableContainer>
       <div className={classes.link}>
          <Link to="/">
            <Button variant='contained' color='primary'>
                Back
            </Button>
          </Link>
       </div>
        
      </div>
  );
}
