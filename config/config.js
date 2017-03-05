export default {
  application: {
    name: process.env.APPLICATION_NAME || 'Axis Wiki',
  },
  facebook: {
    app_id:      process.env.FB_APP_ID || undefined,
    permissions: process.env.FB_PERMISSIONS || 'public_profile,email',
  },
  media: {
    extensions:      (process.env.MEDIA_EXTENSIONS || 'gif,jpg,png').split(','),
    largeSizePixels: process.env.MEDIA_PIXELS_LARGE || 1000,
    smallSizePixels: process.env.MEDIA_PIXELS_SMALL || 250,
  },
}
