const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

export const getApiUrl = (endpoint) => `${API_URL}/api/${API_VERSION}/${endpoint}`;

export const API_ENDPOINTS = {
  CRAWLERS: 'crawlers',
  STATS: 'stats',
  PERFORMANCE: 'performance',
  EXPORT: 'export',
  SETTINGS: 'settings'
}; 