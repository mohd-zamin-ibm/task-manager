<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Title</label>
      <input type="text" v-model="title" name="text" placeholder="Title" />
    </div>
    <div class="form-control">
      <label>Description</label>
      <input type="text" v-model="description" name="text" placeholder="Description" />
    </div>
    <div class="form-control">
      <label>Due Date</label>
      <input type="date" v-model="dueDate" name="dueDate" placeholder="Select a due date"/>
    </div>
    <div class="form-control">
      <label for="isCompleted"><input type="checkbox" v-model="isCompleted" name="isCompleted"/> Is Completed</label>
    </div>
    <div class="d-flex">
      <input type="submit" value="Update Task" class="btn btn-block btn-primary" />
      <input type="button" value="Cancel" class="btn btn-block" />
    </div>
  </form>
</template>

<script>

import moment from 'moment';

export default {
  name: 'EditTask',
  props: {
    editTaskData: Object
  },
  data() {
    return {
      id: this.editTaskData.id,
      title: this.editTaskData.title,
      description: this.editTaskData.description,
      isCompleted: this.editTaskData.isCompleted,
      createdBy: this.editTaskData.id,
      dueDate: this.formattedDate(this.editTaskData.dueDate),
    };
  },
  methods: {
    formattedDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onSubmit(e) {
      e.preventDefault();

      if (!this.title) {
        alert('Please add a title');
        return;
      }
      if (!this.description) {
        alert('Please add a description');
        return;
      }
      if (!this.dueDate) {
        alert('Please add a dueDate');
        return;
      }

      const newTask = {
        id: this.id,
        title: this.title,
        isCompleted: this.isCompleted,
        description: this.description,
        dueDate: this.dueDate,
        createdBy: JSON.parse(window.localStorage.getItem('user')).id
      };

      this.$emit('edit-task', newTask);

      this.title = '';
      this.description = '';
      this.dueDate = '';
    },
  },
  watch: {
    editTaskData() {
      this.id = this.editTaskData.id;
      this.title = this.editTaskData.title;
      this.isCompleted = this.editTaskData.isCompleted,
      this.description = this.editTaskData.description,
      this.createdBy = this.editTaskData.id,
      this.dueDate = this.formattedDate(this.editTaskData.dueDate)
    }
  }
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input[type='text'], .form-control input[type='date'] {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
