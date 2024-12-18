export const environment = {
  production:true,
  GIT_URL_PROFILE: 'https://api.github.com/users',
  GIT_URL_REPOSITORIES: 'https://api.github.com/search/repositories',
  GALLERY_URL: 'data/test/gallery',
  token: process.env['GIT_TOKEN'] || ''
}
