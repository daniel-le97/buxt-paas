<!-- <script setup lang="ts">
useHead({
  title: 'Login Page',
})

const email = ref('')
const password = ref('')

const isValid = computed(() => {
  return email.value && password.value
})

const redirectTo = useAuth().redirectTo.value
const alert = ref(
  `Please login or register ${redirectTo ? `to access ${redirectTo}` : ''}`,
)

function showAlert(message: string) {
  alert.value = message
  setTimeout(() => {
    alert.value = ''
  }, 1500)
}

function onError(err: any) {
  showAlert(err?.data.message ?? err?.message ?? err)
}
</script>

<template>
  <div>
    <div>
      <div>
        <div>
          <label for="email">Email</label>
          <UInput id="email" v-model="email" type="email" placeholder="Email" />
        </div>
        <div>
          <label for="password">Password</label>
          <UInput
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <br>
      <UTooltip v-if="alert" n="orange">
        {{ alert }}
      </UTooltip>
      <br>
      <div>
        <UButton :disabled="!isValid" class="mr-2" @click="authLogin(email, password).catch(onError)">
          Login
        </UButton>
        <UButton :disabled="!isValid" class="mr-2" @click="authRegister(email, password).catch(onError)">
          Register
        </UButton>
      </div>
    </div>
  </div>
</template> -->
<script setup lang="ts">
const { signIn, signOut, session, status, cookies, getProviders, user } = useAuth()

const { data, pending, error, refresh } = await useFetch('/api/stats')
</script>

<template>
  <div>
    <div>
      <a href="/api/auth/signin" class="buttonPrimary">Native Link Sign in</a>
      <button @click="signIn(`github`)">
        JS Sign In
      </button>
      <button @click="signOut()">
        Sign Out
      </button>
    </div>
    <div>
      <pre>{{ status }}</pre>
      <pre>{{ session}}</pre>
      <pre>{{ cookies }}</pre>
      <pre>{{ user }}</pre>
    </div>
  </div>
</template>