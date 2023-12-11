import { pusher, useSocketi } from '../utils/useSocketi'

export default defineNitroPlugin(async(nitro) => {
  await pusher.setup(nitro)

  const trigger = await useSocketi().trigger('my-channel', 'my-event', 'hello')
  console.log(trigger)
})
