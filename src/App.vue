<template>
  <div class="wrapper">
    <div>
        <h1>Weather for you!</h1>
        <p>Figure out weather in {{ city == "" ? "your city" : city }}</p>
    </div>
    <div class="main-inputs">
        <n-input 
            v-model:value="city"
            class="i-city" 
            placeholder="Enter your city" 
        />
        <p v-if="error" class="error">{{ error }}</p>
    </div>
    <n-button @click="getWeather()" class="btn-weather">Get weather</n-button>
    <div v-if="data" class="weather-data">
        <h2>Weather in {{ data.name }}</h2>
        <p>Temperature: {{ (data.main.temp).toFixed(2) }} °C</p>
        <p>Weather: {{ data.weather[0].description }}</p>
        <p>Humidity: {{ data.main.humidity }}%</p>
        <p>Wind Speed: {{ data.wind.speed }} m/s</p>
    </div>
  </div>
</template>

<script>
    import GetWeather from "./apis/weather";

    export default {
        name: "WeatherApp",
        data() {
            return {
                city: "",
                error: "",
                data: ""
            }
        },
        methods: {
            async getWeather() {
                this.data = "";
                if (this.city.trim() === "" || this.city.trim().length < 2) {
                    this.error = "Please enter a valid city name!";
                    return;
                }
                this.error = "";
                try {
                    this.data = await GetWeather(this.city);
                } catch (err) {
                    this.error = err.message;
                }
            },
        },
    }
</script>

<style scoped>
    .wrapper {
        width: 500px;
        min-height: 350px;
        border-radius: 30px;
        padding: 40px 30px;
        background: #519E8A;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        text-align: center;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }
    .wrapper h1 {
        font-size: 32px;
    }
    .wrapper p {
        font-size: 18px;
        opacity: 0.9;
    }
    .i-city {
        width: 100%;
        background-color: #abeddb;
        border: none;
        border-radius: 10px;
        color: #222;
        font-size: 16px;
        padding: 12px 16px;
        transition: all 0.3s ease;
    }
    .i-city:focus {
        border: 2px solid #fff;
        background-color: #d4f7ef;
    }
    .main-inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .btn-weather {
        width: 100%;
        padding: 12px 14px !important;
        border-radius: 10px;
        background: #2ecc71 !important;
        color: #fff !important;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;
        border: none;
    }
    .btn-weather:hover {
        background: #27ae60 !important;
        transform: translateY(-2px);
    }
    .error {
        background-color: rgba(240, 240, 240, 0.604);
        padding: 8px 10px;
        border-radius: 5px;
        color: red;
        font-weight: bold;
        margin-top: 10px;
        text-align: left;
    }
    .weather-data {
        text-align: left;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 20px;
        border-radius: 15px;
    }
</style>
