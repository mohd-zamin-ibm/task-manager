<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      title="Task Management App"
      :showAddTask="showAddTask"
    />
    <router-view :showAddTask="showAddTask"></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showAddTask: false,
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* body {
  font-family: 'Poppins', sans-serif;
} */

.container {
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: flex;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  align-items: center;
  gap: 0.5rem;
}

.btn:hover {
  color: white;
  background-color: green;
  border: 1px solid black;
}

.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
  color: white;
  background-color: green;
  border: 1px solid black;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
