import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  CircularProgress
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';
import { mockDataService } from '../utils/mockDataService';
import EventCard from '../components/EventCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [rsvpEvents, setRsvpEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    displayName: currentUser?.displayName || 'User',
    email: currentUser?.email || '',
    location: 'San Francisco, CA',
    bio: 'Community enthusiast and event organizer',
    interests: ['Technology', 'Arts', 'Sports', 'Education'],
    joinDate: 'January 2023'
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls for user-specific data
        const userEventsData = await mockDataService.getUserEvents(currentUser?.uid || '');
        const rsvpEventsData = await mockDataService.getUserRsvpEvents(currentUser?.uid || '');
        
        setUserEvents(userEventsData);
        setRsvpEvents(rsvpEventsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                src="/static/images/avatar/1.jpg" 
                alt={profile.displayName}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {profile.displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {profile.email}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {profile.location}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />}
                size="small"
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body2" paragraph>
              {profile.bio}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              Interests
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {profile.interests.map((interest) => (
                <Chip 
                  key={interest} 
                  label={interest} 
                  size="small" 
                  variant="outlined" 
                />
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary">
              Member since {profile.joinDate}
            </Typography>
          </Paper>
        </Grid>

        {/* User Activity */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ minHeight: 500 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab icon={<EventIcon />} iconPosition="start" label="My Events" />
                <Tab icon={<PersonIcon />} iconPosition="start" label="Attending" />
              </Tabs>
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {/* My Events Tab */}
                <TabPanel value={tabValue} index={0}>
                  {userEvents.length > 0 ? (
                    <Grid container spacing={3}>
                      {userEvents.map((event) => (
                        <Grid item key={event.id} xs={12} sm={6}>
                          <EventCard event={event} />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box textAlign="center" py={5}>
                      <Typography variant="subtitle1" gutterBottom>
                        You haven't created any events yet
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }} 
                        href="/create-event"
                      >
                        Create Event
                      </Button>
                    </Box>
                  )}
                </TabPanel>

                {/* Attending Tab */}
                <TabPanel value={tabValue} index={1}>
                  {rsvpEvents.length > 0 ? (
                    <List>
                      {rsvpEvents.map((event) => (
                        <ListItem 
                          key={event.id} 
                          alignItems="flex-start" 
                          sx={{ 
                            border: '1px solid', 
                            borderColor: 'divider', 
                            borderRadius: 1,
                            mb: 2
                          }}
                          button 
                          component="a" 
                          href={`/event/${event.id}`}
                        >
                          <ListItemAvatar>
                            <Avatar alt={event.title} src={event.image} variant="rounded" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={event.title}
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </Typography>
                                {` — ${event.location}`}
                              </>
                            }
                          />
                          <Chip 
                            label="Going" 
                            size="small" 
                            color="success" 
                            sx={{ ml: 1 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box textAlign="center" py={5}>
                      <Typography variant="subtitle1" gutterBottom>
                        You're not attending any events yet
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }} 
                        href="/"
                      >
                        Discover Events
                      </Button>
                    </Box>
                  )}
                </TabPanel>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 