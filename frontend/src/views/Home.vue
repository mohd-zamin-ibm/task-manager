<template>
  <div class="row">
    <div class="col-3">
      <Tasks
        @delete-task="deleteTask"
        @edit-task="editTask"
        @view-task="viewTask"
        :tasks="tasks"
      />
    </div>
    <div class="col-9">
      <AddTask v-show="showAddTask" @add-task="addTask" />
      <ViewTask v-show="showViewTask" @view-task="viewTask" @delete-task="deleteTask" @edit-task="editTask" :showViewTaskData="viewTaskData"/>
      <EditTask v-show="showEditTask" @edit-task="updateTask" :editTaskData="editTaskData"/>
    </div>
  </div>
</template>

<script>
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import Tasks from '../components/Tasks';
import ViewTask from '../components/ViewTask';
import config from '../config/config';

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
    EditTask,
    ViewTask,
  },
  data() {
    return {
      showEditTask: false,
      showViewTask: false,
      editTaskData: {},
      viewTaskData: {},
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      this.showViewTask = false;
      this.showEditTask = false;
      const res = await fetch(`${config.hostname}/tasks/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'auth-token': window.localStorage.getItem('token'),
        },
        body: JSON.stringify(task),
      });
      this.tasks = await this.fetchTasks();
    },
    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`${config.hostname}/tasks/${id}`, {
          method: 'DELETE',
          headers: {
          'Content-type': 'application/json',
          'auth-token': window.localStorage.getItem('token'),
        },
        });
        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert('Error deleting task');
      }
    },
    async fetchTasks() {
      const id = JSON.parse(window.localStorage.getItem('user')).id
      const res = await fetch(`${config.hostname}/tasks/${id}`, {
        headers: {
          'Content-type': 'application/json',
          'auth-token': window.localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    },

    async updateTask(updatedTask) {
      this.showEditTask = false;
      const res = await fetch(`${config.hostname}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'auth-token': window.localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedTask),
      });
      this.tasks = await this.fetchTasks()
    },

    editTask(id) {
      this.showEditTask = true;
      this.showViewTask = false;
      this.editTaskData = this.tasks.find((task) => task.id === id);
    },
    async viewTask(id) {
      this.showViewTask = true;
      this.showEditTask = false;
      this.tasks = await this.fetchTasks()
      this.viewTaskData = this.tasks.find((task) => task.id === id);
    }
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
