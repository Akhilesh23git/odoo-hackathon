import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
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
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.03)'
      }
    }}>
      <CardActionArea component={Link} to={`/event/${event.id}`} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={event.image || 'https://source.unsplash.com/random?events'}
          alt={event.title}
        />
        <CardContent>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 1
            }}
          >
            <Chip 
              label={event.category} 
              size="small" 
              color="primary" 
              sx={{ mr: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {format(new Date(event.date), 'MMM d, yyyy')}
            </Typography>
          </Box>

          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {event.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {event.description.length > 120
              ? `${event.description.substring(0, 120)}...`
              : event.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {format(new Date(event.date), 'h:mm a')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {event.organizer.avatar ? (
              <Avatar 
                src={event.organizer.avatar} 
                alt={event.organizer.name}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
            ) : (
              <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            )}
            <Typography variant="body2" color="text.secondary">
              {event.organizer.name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard; 