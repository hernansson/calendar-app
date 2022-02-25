import React, { memo } from 'react'
import { weatherAbbr } from '../../constants/weatherAbbr'

function WeatherIcon({ weather }) {
    const isWeatherValid = weatherAbbr.includes(weather)

    return (
        <img
            style={{
                width: '32px',
                marginLeft: '16px',
                marginTop: '12px',
                opacity: isWeatherValid ? '100%' : '16%',
                color: 'black',
            }}
            src={`https://www.metaweather.com/static/img/weather/${
                isWeatherValid ? weather : 'c'
            }.svg`}
            alt="https://www.metaweather.com/static/img/weather/c.svg"
        />
    )
}
export default memo(WeatherIcon)
