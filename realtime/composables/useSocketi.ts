import Pusher from 'pusher-js/worker/with-encryption'
import type { Options } from 'pusher-js'

const options: Options = {
  enabledTransports: ['ws', 'wss'],
  forceTLS: true,
  cluster: 'ap1',
  authEndpoint: 'http://localhost:3000/api/auth/pusher',
  auth: {
    headers: {
      'Content-Type': 'application/json',
    },
  },

}
class Socketi {
  pusher: Pusher
  constructor(app: string, options: Options) {
    this.pusher = new Pusher(app, options)
  }
}

export function useUseSocketi() {
  return new Socketi('e6e2e6e2e6e2e6e2e6e2', options)
}
