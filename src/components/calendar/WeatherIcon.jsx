import React, { memo } from 'react'
import { weatherAbbr } from '../../constants/weatherAbbr'
import { styles } from './styles'
function WeatherIcon({ weather }) {
    const isWeatherValid = weatherAbbr.includes(weather)
    const opacity = isWeatherValid ? '100%' : '16%'
    const complexStyle = { ...styles.weatherIcon, opacity }

    return (
        <img
            style={complexStyle}
            src={`https://www.metaweather.com/static/img/weather/${
                isWeatherValid ? weather : 'c'
            }.svg`}
            alt="https://www.metaweather.com/static/img/weather/c.svg"
        />
    )
}
export default memo(WeatherIcon)
