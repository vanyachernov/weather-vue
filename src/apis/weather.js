import axios from 'axios'
import { API_BASE_URL, API_KEY } from '../config/config.js'

export default async function GetWeather(cityName) {
    try {
        const response = await axios.get(
        `${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('City not found. Please check the city name.')
        } else {
            throw new Error('An error occurred while fetching the weather data.')
        }
    }
}