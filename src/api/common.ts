export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_BASE_URL
    : 'http://localhost:8080';
