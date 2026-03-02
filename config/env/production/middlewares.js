// config/env/production/middlewares.js
module.exports = [
  'strapi::errors',
  {
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'", 'https:'],
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'market-assets.strapi.io',
          'res.cloudinary.com',      // ← autorise l'affichage des images
        ],
        'media-src': [
          "'self'",
          'data:',
          'blob:',
          'market-assets.strapi.io',
          'res.cloudinary.com',
        ],
        upgradeInsecureRequests: null,
      },
    },
  },
},
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      // Utilisez explicitement votre domaine pour contourner tout problème avec '*'
      origin: ['https://ccj-frontend-3oyr.vercel.app', 
        'https://ccjbenin.vercel.app', 
        'https://ccjbenin229.vercel.app',
        'https://ccj229.vercel.app',
        // 'http://localhost:3000', 
        'http://localhost:3001',], 
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true, // Important si vous utilisez des cookies ou des en-têtes d'autorisation
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
