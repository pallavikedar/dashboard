// src/components/Dashboard.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = ({ isDrawerOpen }) => {
  return (
    <div style={{ padding: '24px',marginLeft: isDrawerOpen ? '280px' : '0px', transition: 'margin-left 0.3s ease'  }}>
      <Typography variant="h4" style={{ marginBottom: '24px', color: '#2a9d8f' }}>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="Customer" style={{ textDecoration: 'none' }}>
            <Card
              style={{
                backgroundColor: 'white',
                color: '#2a9d8f',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" align="center">
                  Customer List
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Link to="Material" style={{ textDecoration: 'none' }}>
            <Card
              style={{
                backgroundColor: 'white',
                color: '#2a9d8f',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" align="center">
                  Material
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Link to="Lead" style={{ textDecoration: 'none' }}>
            <Card
              style={{
                backgroundColor: 'white',
                color: '#2a9d8f',
                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" align="center">
                  Lead
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={10} sm={4} md={3}>
          <Link to="OfferLetter" style={{ textDecoration: 'none' }}>
            <Card
              style={{
                backgroundColor: 'white',
                color: '#2a9d8f',
                height: '150px',
                
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" align="center">
                  Offer Letter
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
