import App from '../App'
import React from 'react'
import {Image} from 'semantic-ui-react'
import Clouds from '../assets/images/clouds.png'
import Rain from  '../assets/images/rain.png'
import Clear from '../assets/images/clear.png'
import Hot from '../assets/images/hot.png'
import Storm from '../assets/images/storm.png'
import Haze from '../assets/images/haze.png'

const countryName = ["IN","US","AU","CA"]

export const getFullCountryName = (countryShortName) =>{
   if(countryName.includes(countryShortName)){
      let position = countryName.indexOf(countryShortName)
      return (
            countryName[position]
         )
   }
   else{
      return (null)
   }
} 

export const getCurrentDate_time = () =>{
   const Date_and_time = {}
   const currentDate = new Date()
   Date_and_time["Date"] = currentDate.getDate()
   Date_and_time["Month"] = currentDate.getMonth()
   Date_and_time["Year"] = currentDate.getFullYear()
   Date_and_time["Time"] = currentDate.toLocaleTimeString()
   return Date_and_time;
}

export default class GetWeatherIcon extends React.Component{
   render(){
      const ImgStyle = {
         opacity:'.9',
         width:'60px'
      }
      if(this.props.main === "Clouds"){
         return (
            <Image src={Clouds} size="small" centered style={ImgStyle}/>   
         )
      }
      else if(this.props.main === "Rain"){
         return (
            <Image src={Rain} size="small" centered style={ImgStyle}/>   
         )
      }
      else if(this.props.main === "Clear"){
         return(
            <Image src={Clear} size="small" centered style={ImgStyle}/>
         )
      }
      else if(this.props.main === "Hot"){
         return (
            <Image src={Hot} size="small" centered style={ImgStyle}/>   
         )
      }
      else if(this.props.main === "Thunderstorm"){
         return (
            <Image src={Storm} size="small"  style={ImgStyle}/>   
         )
      }
      else if(this.props.main === "Haze"){
         return (
            <Image src={Haze} size="small"  centered style={ImgStyle}/>   
         )
      }
   }
} 

export const getWeatherColor = (weatherName) => {
   let backgroundStyle = {}
   if (weatherName === "Clouds"){
      backgroundStyle["backgroundImage"] = 'linear-gradient(359deg, #A3BBC9 ,#6A9FB9)'
   }
   else if(weatherName === "Rain"){
      backgroundStyle["backgroundImage"] = 'linear-gradient(359deg ,#abb4bb ,#898E95)'
   }
   else if(weatherName === "Clear"){
      backgroundStyle["backgroundImage"] = 'linear-gradient(359deg ,#77B2CC ,#53A5DB)'
   }
   else if(weatherName === "Hot"){
      backgroundStyle["backgroundImage"] = 'linear-gradient(359deg ,#991C5B ,#9C2423)'
   }
   else if(weatherName === "Thunderstorm"){
      backgroundStyle["backgroundImage"] = 'linear-gradient(359deg ,#4C6AA4, #C2A0A6)'
   }
   else {
      backgroundStyle["backgroundImage"] = 'linear-gradient(359deg ,#C8C1B9, #AAA7A3)'
   }
   return backgroundStyle
}

export const TodaysWeather = (props) => {
   const city = props.current.name;
   let {id,main,description} = props.current.weather[0]
   let {temp , temp_min , temp_max,humidity} = props.current.main
   const country = props.current.sys.country;
   temp = Math.round(temp)
   let currentWeather = {}
   currentWeather["country"] = getFullCountryName(country)
   currentWeather["city"] = city
   currentWeather["temperature"] = temp
   currentWeather["min_temperature"] = temp_min
   currentWeather["max_temperature"] = temp_max
   currentWeather["humidity"] = humidity
   currentWeather["weather_id"] = id
   description = description.replace(description.charAt(0),description.charAt(0).toUpperCase())
   currentWeather["weather_name"] = description
   currentWeather["weather_main"] = main
   currentWeather["background"] = getWeatherColor(main)
   currentWeather["date_time"] = getCurrentDate_time()
   console.info('Current Weather',currentWeather);
   return (
      <App current = {currentWeather}/>
   )  
}
