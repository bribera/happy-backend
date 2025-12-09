// // config/env/production/middlewares.js
// module.exports = [
//   'strapi::errors',
//   'strapi::security',
//   {
//     name: 'strapi::cors',
//     config: {
//       origin: [
//         'https://votre-frontend.vercel.app',
//         'https://www.votre-domaine.com',
//         'https://votre-domaine.com',
//       ],
//       methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
//       headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
//       credentials: true,
//       keepHeaderOnError: true,
//     },
//   },
//   'strapi::poweredBy',
//   'strapi::logger',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];

// config/env/production/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", "data:", "blob:", "res.cloudinary.com", "*.amazonaws.com"],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://happy-science-vitrine.vercel.app',
        'https://happy-science-vitrine-git-main-votre-username.vercel.app',
        'https://happy-science-vitrine-*.vercel.app',
        'https://www.happyscience-vitrine.com', // Votre domaine si vous en avez un
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true,
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