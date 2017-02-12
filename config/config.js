export function setting(key, defaultValue) {
  return process && process.env && process.env[key] || defaultValue
}

export default {
  application: {
    name: setting('APPLICATION_NAME', "Axis Wiki"),
  },
  facebook: {
    app_id:
      setting('FB_APP_ID', undefined),
    permissions:
      setting('FB_PERMISSIONS', "public_profile,email"),
  },
  media: {
    extensions:
      setting('MEDIA_EXTENSIONS', 'gif,jpg,png').split(','),
    largeSizePixels:
      setting('MEDIA_PIXELS_LARGE', 1000),
    smallSizePixels:
      setting('MEDIA_PIXELS_SMALL', 250),
  },
}
