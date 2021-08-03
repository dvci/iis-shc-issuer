import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { CheckCircleOutline, ErrorOutlineOutlined } from '@material-ui/icons';

const FactList = () => {
  return (
    <div>
      <h3>What is a SMART&reg; Health Card?</h3>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutline color="secondary" fontSize="large"/>
          </ListItemIcon>
          <ListItemText primary="Holds important vaccination or lab report data." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutline color="secondary" fontSize="large"/>
          </ListItemIcon>
          <ListItemText primary="Can be scanned to verify that the information has not been tampered with." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ErrorOutlineOutlined color="error" fontSize="large"/>
          </ListItemIcon>
          <ListItemText primary={<div><b>Don't forget</b> - scanning this QR code will share all of the information on your Vaccine Card, so make sure to only share with those you trust.</div>}/>
        </ListItem>
      </List>
    </div>
  );
}

export default FactList;
