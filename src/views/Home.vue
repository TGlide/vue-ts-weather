<template>
  <div class="home">
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    ></b-loading>
    <section class="section" v-if="!loading">
      <div class="container">
        <h1 class="title has-text-centered has-text-white">Weather</h1>
        <h2 class="subtitle has-text-centered has-text-white">
          Rio de Janeiro
        </h2>
        <div class="box weather-info appear-from-below">
          <div class="columns">
            <div class="column is-half">
              <b-icon :icon="weatherIcon" />
            </div>
            <div class="column is-half">
              <span class="has-text-left main">
                {{ currentWeather.weather[0].description }}
              </span>
              <span class="has-text-left temp">
                {{ currentWeather.main.temp }} °C
              </span>
            </div>
          </div>

          <hr />

          <div class="feeling">
            <span>Feels like: </span>
            <span :class="feelingClass"
              >{{ currentWeather.main.feels_like }} °C</span
            >
          </div>
          <div class="min-max">
            <div class="min">
              <span class="label">Min: </span>
              <span class="value">{{ currentWeather.main.temp_min }} °C</span>
            </div>
            <div class="max">
              <span class="label">Max: </span>
              <span class="value">{{ currentWeather.main.temp_max }} °C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Weather, WeatherMain, WeatherIcons } from "@/types/weather";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      currentWeather: {} as Weather,
      loading: true
    };
  },
  computed: {
    weatherIcon(): string | undefined {
      if (this.loading) return undefined;

      const weatherMain = this.currentWeather.weather[0].main.toLowerCase() as WeatherMain;
      return WeatherIcons[weatherMain];
    },
    feelingClass(): string {
      const feelingCompare =
        this.currentWeather.main.feels_like - this.currentWeather.main.temp;
      if (feelingCompare > 0) return "has-text-danger";
      else if (feelingCompare === 0) return "";
      return "has-text-info";
    }
  },
  mounted() {
    const weatherUrl = `${process.env.VUE_APP_WEATHER_URL}/weather?q=Rio%20De%20Janeiro&APPID=${process.env.VUE_APP_WEATHER_KEY}&units=metric`;
    axios
      .get(weatherUrl)
      .then(res => {
        if (res.status === 200) {
          this.currentWeather = res.data;
          console.log(this.currentWeather);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.home {
  min-height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    #48dbfb,
    #3dd3f5,
    #31ccef,
    #22c4e9,
    #0abde3
  );
}

.weather-info {
  margin: 5rem auto;
  min-width: 300px;
  width: 20vw;
  justify-content: center;

  .columns {
    > :nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .icon {
        $size: 7rem;
        width: $size;
        height: $size;

        /deep/ svg {
          width: $size !important;
          height: $size !important;
          color: $info;
        }
      }
    }

    > :nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .main {
        font-size: 1.25rem;
        text-transform: capitalize;
        color: $grey;
      }

      .temp {
        font-size: 2rem;
        font-weight: 500;
      }
    }
  }
}

.feeling {
  margin: 1rem auto;
  text-align: center;

  > span:nth-child(1) {
    font-size: 1.5rem;
  }

  > span:nth-child(2) {
    font-size: 1.75rem;
    font-weight: 500;
  }
}

.min-max {
  display: flex;
  justify-content: center;
  align-items: center;

  .label {
    font-size: 1.5rem;
    font-weight: normal;
    margin: 0;
    display: inline;
  }

  .value {
    font-size: 1.75rem;
    font-weight: 500;
  }

  .min .value {
    color: $info;
  }

  .max .value {
    color: $danger;
  }

  .min {
    margin-right: 1rem;
  }
}
</style>
