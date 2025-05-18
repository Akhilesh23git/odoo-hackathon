import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EventCard from '../components/EventCard';
import { mockDataService } from '../utils/mockDataService';
import { mapboxToken } from '../utils/mapConfig';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  location: string;
  category: string;
  organizer: {
    name: string;
    avatar?: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10
  });

  const categories = ['Community', 'Sports', 'Arts', 'Technology', 'Education', 'Social', 'Charity'];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const data = await mockDataService.getEvents();
        setEvents(data);
        setFilteredEvents(data);
        
        // Set map center based on first event or user location
        if (data.length > 0) {
          setViewState({
            latitude: data[0].coordinates.latitude,
            longitude: data[0].coordinates.longitude,
            zoom: 11
          });
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter(event => 
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       event.description.toLowerCase().includes(searchTerm.toLowerCase())) && 
      (selectedCategory === '' || event.category === selectedCategory)
    );
    setFilteredEvents(results);
  }, [searchTerm, selectedCategory, events]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Discover Local Events
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Connect with your community and find events happening around you
        </Typography>

        {/* Map View */}
        <Box className="map-container" sx={{ mb: 4 }}>
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxToken}
          >
            {filteredEvents.map(event => (
              <Marker
                key={event.id}
                latitude={event.coordinates.latitude}
                longitude={event.coordinates.longitude}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setSelectedEvent(event);
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.2)' }
                  }}
                >
                  <LocationOnIcon fontSize="large" />
                </Box>
              </Marker>
            ))}

            {selectedEvent && (
              <Popup
                latitude={selectedEvent.coordinates.latitude}
                longitude={selectedEvent.coordinates.longitude}
                onClose={() => setSelectedEvent(null)}
                closeButton={true}
                closeOnClick={false}
                anchor="bottom"
              >
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1">{selectedEvent.title}</Typography>
                  <Typography variant="body2">{selectedEvent.location}</Typography>
                  <Button variant="text" size="small" onClick={() => window.location.href = `/event/${selectedEvent.id}`}>
                    View Details
                  </Button>
                </Box>
              </Popup>
            )}
          </Map>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Events Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={8}>
            <CircularProgress />
          </Box>
        ) : filteredEvents.length > 0 ? (
          <Grid container spacing={3} className="events-grid">
            {filteredEvents.map(event => (
              <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" gutterBottom>
              No events found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria or create your own event!
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/create-event">
              Create Event
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home; 