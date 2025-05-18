// This file contains mock data services for development
// In a production environment, these would be replaced with actual API calls

// Sample events
const mockEvents = [
  {
    id: '1',
    title: 'Tech Meetup: Web Development Trends 2023',
    description: 'Join us for an evening of discussions about the latest trends in web development. Leading developers from top tech companies will share their insights on upcoming technologies that will shape the future of the web.',
    image: 'https://source.unsplash.com/random?technology',
    date: new Date('2023-06-15T18:00:00'),
    location: 'Tech Hub, San Francisco',
    category: 'Technology',
    organizer: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    attendees: 42
  },
  {
    id: '2',
    title: 'Community Garden Planting Day',
    description: 'Help us beautify our neighborhood by participating in our seasonal planting day. We will be planting flowers, vegetables, and herbs in our community garden. All gardening tools will be provided.',
    image: 'https://source.unsplash.com/random?garden',
    date: new Date('2023-06-18T10:00:00'),
    location: 'Central Community Garden, Oakland',
    category: 'Community',
    organizer: {
      id: 'user2',
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    coordinates: {
      latitude: 37.8044,
      longitude: -122.2711
    },
    attendees: 24
  },
  {
    id: '3',
    title: 'Charity 5K Run for Education',
    description: 'Join our annual charity run to raise funds for underfunded schools in our area. All proceeds will go directly to providing necessary school supplies and educational resources for students in need.',
    image: 'https://source.unsplash.com/random?running',
    date: new Date('2023-07-02T08:00:00'),
    location: 'Golden Gate Park, San Francisco',
    category: 'Sports',
    organizer: {
      id: 'user3',
      name: 'Emily Taylor',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    coordinates: {
      latitude: 37.7694,
      longitude: -122.4862
    },
    attendees: 156
  },
  {
    id: '4',
    title: 'Local Art Exhibition Opening',
    description: 'Come celebrate the opening night of our new art exhibition featuring works from local artists. Enjoy refreshments, meet the artists, and experience a diverse collection of paintings, sculptures, and multimedia installations.',
    image: 'https://source.unsplash.com/random?art',
    date: new Date('2023-06-25T19:00:00'),
    location: 'City Art Gallery, San Jose',
    category: 'Arts',
    organizer: {
      id: 'user4',
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    coordinates: {
      latitude: 37.3382,
      longitude: -121.8863
    },
    attendees: 89
  },
  {
    id: '5',
    title: 'Workshop: Sustainable Living Practices',
    description: 'Learn practical ways to reduce your environmental footprint and live a more sustainable lifestyle. This workshop covers topics like reducing waste, energy conservation, sustainable food choices, and eco-friendly home products.',
    image: 'https://source.unsplash.com/random?sustainability',
    date: new Date('2023-07-10T14:00:00'),
    location: 'Community Center, Berkeley',
    category: 'Education',
    organizer: {
      id: 'user5',
      name: 'Jordan Lee',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    coordinates: {
      latitude: 37.8715,
      longitude: -122.2730
    },
    attendees: 37
  },
  {
    id: '6',
    title: 'Networking Mixer for Young Professionals',
    description: 'Expand your professional network at our casual mixer event designed for young professionals across various industries. Connect with like-minded individuals, share experiences, and potentially discover new career opportunities.',
    image: 'https://source.unsplash.com/random?networking',
    date: new Date('2023-06-28T18:30:00'),
    location: 'Urban Workspace, San Francisco',
    category: 'Social',
    organizer: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    coordinates: {
      latitude: 37.7815,
      longitude: -122.3949
    },
    attendees: 63
  }
];

// Mock user events (events created by a specific user)
const mockUserEvents = [
  {
    id: '6',
    title: 'Networking Mixer for Young Professionals',
    description: 'Expand your professional network at our casual mixer event designed for young professionals across various industries.',
    image: 'https://source.unsplash.com/random?networking',
    date: new Date('2023-06-28T18:30:00'),
    location: 'Urban Workspace, San Francisco',
    category: 'Social',
    organizer: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    coordinates: {
      latitude: 37.7815,
      longitude: -122.3949
    }
  },
  {
    id: '7',
    title: 'Book Club Meeting: Science Fiction',
    description: 'Join our monthly book club meeting where we will discuss the latest science fiction novel on our reading list.',
    image: 'https://source.unsplash.com/random?books',
    date: new Date('2023-07-15T19:00:00'),
    location: 'City Library, San Francisco',
    category: 'Education',
    organizer: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    coordinates: {
      latitude: 37.7785,
      longitude: -122.4152
    }
  }
];

// Mock events a user is attending
const mockRsvpEvents = [
  {
    id: '2',
    title: 'Community Garden Planting Day',
    description: 'Help us beautify our neighborhood by participating in our seasonal planting day.',
    image: 'https://source.unsplash.com/random?garden',
    date: new Date('2023-06-18T10:00:00'),
    location: 'Central Community Garden, Oakland',
    category: 'Community',
  },
  {
    id: '3',
    title: 'Charity 5K Run for Education',
    description: 'Join our annual charity run to raise funds for underfunded schools in our area.',
    image: 'https://source.unsplash.com/random?running',
    date: new Date('2023-07-02T08:00:00'),
    location: 'Golden Gate Park, San Francisco',
    category: 'Sports',
  }
];

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data service
export const mockDataService = {
  // Get all events
  getEvents: async () => {
    await delay(500); // Simulate network delay
    return mockEvents;
  },
  
  // Get a single event by ID
  getEvent: async (id: string) => {
    await delay(300);
    const event = mockEvents.find(event => event.id === id);
    if (!event) throw new Error('Event not found');
    return event;
  },
  
  // Get events created by a specific user
  getUserEvents: async (userId: string) => {
    await delay(400);
    return mockUserEvents;
  },
  
  // Get events a user is attending
  getUserRsvpEvents: async (userId: string) => {
    await delay(400);
    return mockRsvpEvents;
  },
  
  // Create a new event (mock implementation)
  createEvent: async (eventData: any) => {
    await delay(600);
    const newEvent = {
      id: `event-${Date.now()}`,
      ...eventData,
      organizer: {
        id: 'user1',
        name: 'Current User',
        avatar: null
      }
    };
    return newEvent;
  },
  
  // RSVP to an event (mock implementation)
  rsvpToEvent: async (eventId: string, userId: string, status: 'going' | 'interested' | 'not-going') => {
    await delay(300);
    return { success: true, status };
  }
}; 