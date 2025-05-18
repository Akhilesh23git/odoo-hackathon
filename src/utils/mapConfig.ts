// Mapbox configuration
// In a real application, this would be loaded from environment variables
export const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || 'your-mapbox-token';

// Default map settings
export const defaultMapSettings = {
  latitude: 37.7749,
  longitude: -122.4194,  // San Francisco coordinates
  zoom: 11,
  style: 'mapbox://styles/mapbox/streets-v11'
};

// Marker colors for different event categories
export const categoryColors = {
  Technology: '#3F51B5', // Indigo
  Community: '#4CAF50',  // Green
  Sports: '#F44336',     // Red
  Arts: '#9C27B0',       // Purple
  Education: '#FF9800',  // Orange
  Social: '#00BCD4',     // Cyan
  Charity: '#FFEB3B',    // Yellow
  Other: '#607D8B'       // Blue Grey
}; 