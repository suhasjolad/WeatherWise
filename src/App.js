
import './App.css';
import WeatherCard from './components/WeatherCard';
import MyStates from './context/MyStates';


function App() {
  const apikey =process.env.REACT_APP_WEATHER_KEY;  


  return (
    <>
    <MyStates apiKey= { apikey }>
    <WeatherCard apiKey={apikey} />
    </MyStates>
    </>
  );
}

export default App;
