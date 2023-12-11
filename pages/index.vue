<script setup>
import { ref } from 'vue'

async function redirectToGitHub() {
  const { data, pending, error, refresh } = await useFetch('/api/git/add')
  // try {
  //   // GitHub App Manifest
  //   const appManifest = {
  //     name: 'le-ploy-source-1',
  //     description: 'test',
  //     homepage_url: window.location.origin, // Assuming loc is defined
  //     redirect_url: window.location.origin, // Assuming loc is defined
  //     default_events: ['deployment', 'pull_request', 'push'],
  //     default_permissions: {
  //       contents: 'read',
  //       deployments: 'write',
  //       metadata: 'read',
  //       pull_requests: 'read',
  //     },
  //   }

  //   // Base URL for GitHub App registration
  //   const registrationUrl = 'https://github.com/settings/apps/new'

  //   // State parameter for additional security (optional)
  //   const stateParameter = 'your_state_parameter'

  //   // Construct the data payload
  //   const payload = new URLSearchParams()
  //   payload.append('manifest', JSON.stringify(appManifest))
  //   payload.append('state', stateParameter)

  //   // Make a POST request to GitHub App registration URL
  //   const response = await fetch(registrationUrl, {
  //     mode:'no-cors',
  //     method: 'POST',
  //     body: payload,
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   })

  //   console.log(response);

  //   // Check if the request was successful
  //   if (response.ok) {
  //     // Redirect the user to the GitHub registration page
  //     window.location.href = response.url
  //   }
  //   else {
  //     console.error('Failed to initiate GitHub App registration.')
  //   }
  // }
  // catch (error) {
  //   console.error('Error during GitHub App registration:', error)
  // }
}
</script>

<template>
  <div>
    <!-- Your Vue.js component content -->

    <!-- Trigger to register the GitHub App -->
    <button @click="redirectToGitHub">
      Register GitHub App
    </button>
  </div>
</template>
