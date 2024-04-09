<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="d-flex">
      <Button
        v-show="homePage"
        @btn-click="$emit('toggle-add-task')"
        :text="showAddTask ? 'Close' : 'Add Task'"
        :color="showAddTask ? 'red' : 'green'"
      />
      <Button v-show="homePage" :text="'Logout'" v-on:click="logout()" />
    </div>
  </header>
</template>

<script>
import Button from './Button';

export default {
  name: 'Header',
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    Button,
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push({ name: 'Login' });
    },
  },
  computed: {
    homePage() {
      if (this.$route.path === '/dashboard') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
