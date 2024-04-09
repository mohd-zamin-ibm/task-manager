<template>
  <div class="card my-3">
    <div class="card-body">

      <div class="row">
        <div class="col-6">
          <h5 class="card-title">{{ showViewTaskData.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ showViewTaskData.description }}</h6>
          <p class="card-text">
            Due Date: <small>{{ formattedDate(showViewTaskData.dueDate) }}</small>
          </p>
          <p class="card-text">
            Status: <small>{{ showViewTaskData.isCompleted ? 'Completed' : 'Pending' }}</small>
          </p>
          <div class="card-link">
            <a href="#" class="btn btn-link" @click="$emit('edit-task', showViewTaskData.id)">
              <i class="fas fa-pen"></i>Edit
            </a>
            <a href="#" class="btn btn-link" @click="$emit('delete-task', showViewTaskData.id)">
              <i class="fas fa-times"></i> Delete
            </a>
          </div>
        </div>
        <div class="col-6">
          <div v-if="forecastDay.astro">
            <p><strong>Moon Phase:</strong> {{ forecastDay.astro.moon_phase }}</p>
          </div>
          <div v-if="forecastDay.day">
            <p><strong>Average Humidity:</strong> {{ forecastDay.day.avghumidity }}</p>
            <p><strong>Average Temperature C:</strong> {{ forecastDay.day.avgtemp_c }}</p>
            <p><strong>Average Temperature F:</strong> {{ forecastDay.day.avgtemp_F }}</p>
            <p><strong>Maximum Temperature C</strong> {{ forecastDay.day.maxtemp_c }}</p>
            <p><strong>Maximum Temperature F</strong> {{ forecastDay.day.maxtemp_f }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'Task',
  props: {
    showViewTaskData: Object,
  },
  data() {
    return {
      weatherData: Object,
      id: this.showViewTaskData.id,
      title: this.showViewTaskData.title,
      description: this.showViewTaskData.description,
      createdBy: this.showViewTaskData.id,
      isCompleted: this.showViewTaskData.isCompleted,
      dueDate: this.formattedDate(this.showViewTaskData.dueDate),
      weatherDate: this.formattedWeatherDate(this.showViewTaskData.dueDate),
      forecastDay: Object
    };
  },
  methods: {
    async fetchWeatherData() {
      const apiKey = '28887dde33394972b54114026240804';
      const city = 'Delhi, India';
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${this.weatherDate}`);
      const data = await response.json();
      this.weatherData = data;
      this.forecastDay = data.forecast.forecastday[0];
      return this.forecastDay;
    },
    formattedDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm')
    },
    formattedWeatherDate(date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },
  watch: {
    showViewTaskData() {
      this.id = this.showViewTaskData.id;
      this.title = this.showViewTaskData.title;
      this.description = this.showViewTaskData.description,
      this.createdBy = this.showViewTaskData.id,
      this.isCompleted = this.showViewTaskData.isCompleted,
      this.dueDate = this.formattedDate(this.showViewTaskData.dueDate),
      this.weatherDate = this.formattedWeatherDate(this.showViewTaskData.dueDate),
      this.fetchWeatherData();
    }
  }
};
</script>

<style scope></style>
