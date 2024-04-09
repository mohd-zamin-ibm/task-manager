<template>
  <form v-if="!showRegister">
    <div class="form-group my-3">
      <label for="email">Email address</label>
      <input type="email" required class="form-control my-2" id="email" v-model="loginUser.email" placeholder="Enter email">
    </div>
    <div class="form-group my-3">
      <label for="password">Password</label>
      <input type="password" required class="form-control my-2" id="password" v-model="loginUser.password" placeholder="Password">
    </div>
    <div class="d-flex">
      <button type="button" v-on:click="login(loginUser)" class="btn btn-primary d-flex m-auto">Login</button>
      <button type="button" v-on:click="toggleRegister()" class="btn btn-primary d-flex m-auto">Register</button>
    </div>
  </form>

  <form v-if="showRegister">
    <div class="form-group my-3">
      <label for="email">Name</label>
      <input type="email" class="form-control my-2" id="email" v-model="registerUser.name" placeholder="Enter name">
    </div>
    <div class="form-group my-3">
      <label for="email">Email address</label>
      <input type="email" class="form-control my-2" id="email" v-model="registerUser.email" placeholder="Enter email">
    </div>
    <div class="form-group my-3">
      <label for="password">Password</label>
      <input type="password" class="form-control my-2" id="password" v-model="registerUser.password" placeholder="Password">
    </div>
    <div class="d-flex">
      <button type="button" v-on:click="register(registerUser)" class="btn btn-primary d-flex m-auto">Register</button>
      <button type="button" v-on:click="toggleRegister()" class="btn btn-primary d-flex m-auto">Login</button>
    </div>
  </form>

</template>
<script>
import config from '../config/config';

export default {
  name: 'Login',
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
      },
      showRegister: false,
      registerUser: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login(user) {
      event.preventDefault();
      if (!user.email) {
        alert('Please add a email!');
        return;
      }
      if (!user.password) {
        alert('Please add a password!');
        return;
      }
      const res = await fetch(config.hostname + '/login/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await res.json()
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('user', JSON.stringify(data.user))
      this.$router.push({ name: 'Home' })
    },

    async register(user) {
      event.preventDefault();
      if (!user.name) {
        alert('Please enter a name');
        return;
      }
      if (!user.email) {
        alert('Please enter a valid email');
        return;
      }
      if (!user.password) {
        alert('Please enter a valid password!');
        return;
      }
      const res = await fetch(config.hostname + '/register/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await res.json()
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('user', JSON.stringify(data.user))
      this.$router.push({ name: 'Home' })
    },

    toggleRegister() {
      this.showRegister = !this.showRegister;
    }
  },
}
</script>
