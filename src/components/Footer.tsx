import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Community Pulse
            </Typography>
            <Typography variant="body2">
              Connecting communities through local events and meaningful engagement.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Home
              </Link>
              <Link href="/events" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Events
              </Link>
              <Link href="/create-event" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Create Event
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Community Pulse. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 