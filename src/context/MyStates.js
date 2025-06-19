import React,{  useState } from 'react'
import axios from 'axios';
import MyContext from "./myContext";

const MyStates = (props) => {
  let { apiKey } = props;
  // eslint-disable-next-line
  const [currentLocation, setCurrentLocation] = useState({
    lat:"",
    long:""
  })

  const [data, setData] = useState({
    city: 'bengaluru',
    temp: "",
    feel: "",
    humidity: "",
    wind: "",
    weather: "",
    search: "bengaluru",
    desc: "",
    iconcode: "",
})

const fetchData = async () => {
  try {
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.search}&appid=${apiKey}&units=metric`);
      // console.log(response);
      setData({city:response.data.name
      ,search:response.data.name
      ,temp:response.data.main.temp
      ,feel:response.data.main.feels_like
      ,humidity:response.data.main.humidity
      ,wind:response.data.wind.speed
      ,weather:response.data.weather[0].main
      ,desc:response.data.weather[0].description
      ,iconcode:response.data.weather[0].icon});
      // console.log(response.data);
  } catch (error) {
      alert("Incorrect Input");

  }
}

  return (
    <MyContext.Provider value={{data,fetchData,setData}} >
      { props.children}
    </MyContext.Provider>

  )
}

export default MyStates
