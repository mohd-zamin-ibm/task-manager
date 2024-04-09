<template>
  <Task
    :key="task.id" v-for="task in tasks"
    @delete-task="$emit('delete-task', task.id)"
    @edit-task="$emit('edit-task', task.id)"
    @view-task="$emit('view-task', task.id)"
    :task="task"
  />
</template>

<script>
import Task from './Task';

export default {
  name: 'Tasks',
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  emits: ['delete-task', 'edit-task', 'view-task'],
}
</script>

