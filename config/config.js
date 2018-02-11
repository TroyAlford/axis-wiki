export default {
  applicationName: process.env.APPLICATION_NAME || 'Axis Wiki',
  facebook: {
    appId: process.env.FB_APP_ID || undefined,
    fields: ['id', 'email', 'gender', 'locale', 'name', 'picture'],
    permissions: process.env.FB_PERMISSIONS || 'public_profile,email',
    scope: ['public_profile', 'email'],
    version: 'v2.9',
  },
  media: {
    extensions: (process.env.MEDIA_EXTENSIONS || 'gif,jpg,png').split(','),
    largeSizePixels: process.env.MEDIA_PIXELS_LARGE || 1000,
    smallSizePixels: process.env.MEDIA_PIXELS_SMALL || 250,
  },
}
