export default defineEventHandler(async (event) => {
  sendRedirect(event, 'https://github.com/settings/apps/new')
  
})
