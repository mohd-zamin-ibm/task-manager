<template>
  <div class="card my-3">
    <div class="card-body" v-bind:class="{ 'completed': task.isCompleted }">
      <a class="card-title" href="#" @click="$emit('view-task', task.id)">{{ task.title }}</a>
      <h6 class="card-subtitle mb-2 text-muted">{{ task.description }}</h6>
      <p class="card-text">
        Due Date: <small>{{ formattedDate(task.dueDate) }}</small>
      </p>
      <p class="card-text">
        Status: <small>{{ task.isCompleted ? 'Completed' : 'Pending' }}</small>
      </p>
      <div class="card-link">
        <a href="#" class="btn btn-link" @click="$emit('edit-task', task.id)">
          <i class="fas fa-pen"></i>Edit
        </a>
        <a href="#" class="btn btn-link" @click="$emit('delete-task', task.id)">
          <i class="fas fa-times"></i> Delete
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'Task',
  props: {
    task: Object,
  },
  methods: {
    formattedDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm') // date.toLocaleString("en-us");
    }
  }
};
</script>

<style scope>
.fas {
  color: red;
}

.completed {
  background-color: rgb(178, 254, 222);
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.card-title {
  margin-bottom: 1rem;
  font-weight: 700;
  display: block;
}

.card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
