// config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://happy-frontend-3oyr-cc89arqgq-briberas-projects.vercel.app',
        'https://happy-frontend-3oyr.vercel.app',
        'http://localhost:3001',
        'https://ccj-frontend-3oyr.vercel.app',
        'https://ccjbenin229.vercel.app',
        'https://ccj229.vercel.app',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];