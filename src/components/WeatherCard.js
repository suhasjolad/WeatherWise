import React, { useEffect, useContext, useState } from 'react'
import '../weather.css';
import './WeatherCard.css';
import SearchBar from './SearchBar';
import myContext from '../context/myContext';
const WeatherCard = (props) => {
    const context = useContext(myContext);
    const { data, fetchData, setData } = context;
    const [cityImage, setCityImage] = useState('');
    const [timeOfDay, setTimeOfDay] = useState('day');
    const fetchCityImage = async (city) => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${city}&client_id=YOUR_UNSPLASH_API_KEY`
            );
            const imageData = await response.json();
            if (imageData.results && imageData.results.length > 0) {
                setCityImage(imageData.results[0].urls.regular);
            }
        } catch (error) {
            console.error('Error fetching city image:', error);
        }
    };
    const getWeatherIcon = (weather) => {
        const weatherLower = weather.toLowerCase();
        if (weatherLower.includes('sunny') || weatherLower.includes('clear')) {
            return '☀️';
        } else if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            return '🌧️';
        } else if (weatherLower.includes('cloud')) {
            return '☁️';
        } else if (weatherLower.includes('snow')) {
            return '❄️';
        } else if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
            return '⛈️';
        } else if (weatherLower.includes('fog') || weatherLower.includes('mist')) {
            return '🌫️';
        } else if (weatherLower.includes('wind')) {
            return '💨';
        } else {
            return '🌈';
        }
    };
    const getWeatherSuggestion = (weather) => {
        const weatherLower = weather.toLowerCase();
        if (weatherLower.includes('sunny') || weatherLower.includes('clear')) {
            return "Perfect day for a walk! Don't forget your sunscreen! stay hydrated";
        } else if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            return "Stay indoors with a good book or movie, you may wanna carry an umbrella if you have plans";
        } else if (weatherLower.includes('cloud')) {
            return "Good day for outdoor activities, but bring a light jacket!";
        } else if (weatherLower.includes('snow')) {
            return "Great day for building a snowman or having a snowball fight!";
        } else if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
            return "Stay indoors and enjoy some indoor activities!";
        } else if (weatherLower.includes('fog') || weatherLower.includes('mist')) {
            return "Be careful if driving, visibility might be low!";
        } else if (weatherLower.includes('wind')) {
            return "Great day for flying a kite!";
        } else {
            return "Enjoy your day!";
        }
    };
    const getTimeOfDay = () => {
        if (!data.timezone || !data.dt) return 'day';
        const localTime = new Date((data.dt + data.timezone) * 1000);
        const hour = localTime.getUTCHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 16) return 'noon';
        if (hour >= 16 && hour < 20) return 'evening';
        return 'night';
    };
    const getGreeting = (tod) => {
        switch (tod) {
            case 'morning': return 'Good Morning';
            case 'noon': return 'Good Afternoon';
            case 'evening': return 'Good Evening';
            case 'night': return 'Good Night';
            default: return '';
        }
    };
    const getBackgroundColor = (weather, tod) => {
        const weatherLower = weather.toLowerCase();
        let base;
        if (weatherLower.includes('sunny') || weatherLower.includes('clear')) {
            base = 'rgba(0, 180, 219, 0.8), rgba(0, 131, 176, 0.8)';
        } else if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            base = 'rgba(44, 62, 80, 0.8), rgba(52, 152, 219, 0.8)';
        } else if (weatherLower.includes('cloud')) {
            base = 'rgba(189, 195, 199, 0.8), rgba(44, 62, 80, 0.8)';
        } else if (weatherLower.includes('snow')) {
            base = 'rgba(230, 233, 240, 0.8), rgba(238, 241, 245, 0.8)';
        } else if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
            base = 'rgba(44, 62, 80, 0.8), rgba(76, 161, 175, 0.8)';
        } else if (weatherLower.includes('fog') || weatherLower.includes('mist')) {
            base = 'rgba(96, 108, 136, 0.8), rgba(63, 76, 107, 0.8)';
        } else {
            base = 'rgba(0, 180, 219, 0.8), rgba(0, 131, 176, 0.8)';
        }
        switch (tod) {
            case 'morning':
                return `linear-gradient(135deg, #ffe29f99 0%, #ffa99f99 100%), linear-gradient(135deg, ${base})`;
            case 'noon':
                return `linear-gradient(135deg, #f6d36599 0%, #fda08599 100%), linear-gradient(135deg, ${base})`;
            case 'evening':
                return `linear-gradient(135deg, #a18cd199 0%, #fbc2eb99 100%), linear-gradient(135deg, ${base})`;
            case 'night':
                return `linear-gradient(135deg, #232526cc 0%, #414345cc 100%), linear-gradient(135deg, ${base})`;
            default:
                return `linear-gradient(135deg, ${base})`;
        }
    };
    const capitaliseFirst = (str) => {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
    }
    useEffect(() => {
        fetchData();
        if (data.city) {
            fetchCityImage(data.city);
        }
        setTimeOfDay(getTimeOfDay());
    }, [data.search, data.dt, data.timezone]);
    return (
        <div className='app' style={{ 
            background: `${getBackgroundColor(data.weather, timeOfDay)}, url(${cityImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
        }}>
            <SearchBar search={data.search} data={data} setsearch={setData} />
            <div className="container d-flex">
                <div className="top">
                    <div className="location">
                        <p>{data.city}</p>
                    </div>
                    <div className="greeting">
                        <h2>{getGreeting(timeOfDay)}</h2>
                    </div>
                    <div className="temperature">
                        <h1>{data.temp}&deg;C</h1>
                        <div className="weather-icon">
                            {getWeatherIcon(data.weather)}
                        </div>
                    </div>
                    <div className="data">
                        <p>{capitaliseFirst(data.desc)}</p>
                    </div>
                    <div className="description">
                        <p>{data.weather}</p>
                    </div>
                    <div className="suggestion">
                        <p>💡 {getWeatherSuggestion(data.weather)}</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="feels">
                        <h3>Feels Like</h3>
                        <p>{data.feel === 0 ? "NA" : data.feel}&deg;C</p>
                    </div>
                    <div className="humidity">
                        <h3>Humidity</h3>
                        <p>{data.humidity === 0 ? "NA" : data.humidity}%</p>
                    </div>
                    <div className="windspeed">
                        <h3>Wind Speed</h3>
                        <p>{data.wind === 0 ? "NA" : data.wind + " MPH"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherCard
