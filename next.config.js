module.exports = {
  reactStrictMode: true,

  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },

  images: {
    domains: [
      'res.cloudinary.com'
    ],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/project-492/image/upload/'
},
}

