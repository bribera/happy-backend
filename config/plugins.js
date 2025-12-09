module.exports = ({env}) => ({

//     i18n: {
//     enabled: true,
//     config: {
//       locales: ['en', 'fr', 'es', 'ja'],
//       defaultLocale: 'fr',
//     },
//   },
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
        },
    },
    'export-import-strapi5-plugin': {
        enabled: true,
    },
});
