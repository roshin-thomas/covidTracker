import { Typography, Card, CardContent } from '@material-ui/core';
import React from 'react';

function InfoBox({ title, recovered, total }) {
  return (
    <Card>
      <CardContent>
        <Typography className="infoBox_title">{title}</Typography>
        <h1>{recovered}</h1>
        <Typography className="infoBox_total">{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
