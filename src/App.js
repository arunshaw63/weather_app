

import React from 'react';
import './App.css'
import Weather from './components/Weather';
import 'weather-icons/css/weather-icons.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
const API_key="9f76db426264657fbac6ec0c83e02194";

class App extends React.Component{
    constructor(props){
      super();
      this.state={
              city:"",
              country:"",
              icon:"",
              main:"",
              celsius:"",
              temp_max:"",
              temp_min:"",
              description:"",
              error:false
      }
      this.weatherIcon={
        Thunderstorm:"wi-thunderstorm",
        Drizzle:"wi-sleet",
        Rain:"wi-storm-showers",
        Snow:"wi-snow",
        Atmosphere:"wi-fog",
        Clear:"wi-day-sunny",
        Clouds:"wi-day-fog"
      }
    }
    // constructor ended here

    
    calCelsius(temp){
      let cell=Math.floor(temp-273.15)
      return cell
    }

    get_weatherIcon(icons,rangeid){
          if(rangeid>=200 && rangeid<=232){
            this.setState({icon:this.weatherIcon.Thunderstorm})
          }
          else if(rangeid>=300 && rangeid<=321){
            this.setState({icon:this.weatherIcon.Drizzle})
          }
          else if(rangeid>=500 && rangeid<=531){
            this.setState({icon:this.weatherIcon.Rain})
          }
          else if(rangeid>=600 && rangeid<=622){
            this.setState({icon:this.weatherIcon.Snow})
          }
          else if(rangeid>=700 && rangeid<=781){
            this.setState({icon:this.weatherIcon.Atmosphere})
          }
          else if(rangeid===800){
            this.setState({icon:this.weatherIcon.Clear})
          }else if(rangeid>=801 && rangeid<=804){
            this.setState({icon:this.weatherIcon.Clouds})
          }
          else if(rangeid>=300 && rangeid<=321){
            this.setState({icon:this.weatherIcon.Drizzle})
          }
        }

    getWeather=async(e)=>{
      e.preventDefault();
      const city=e.target.elements.city.value;
      const country=e.target.elements.country.value;

      if(city && country){

        const api_call=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

        const response=await api_call.json();
        console.log(response);
      
        this.setState({
          city:`${response.name},${response.sys.country}`,
          celsius:this.calCelsius(response.main.temp),
          temp_max:this.calCelsius(response.main.temp_max),
          temp_min:this.calCelsius(response.main.temp_min),
          description:response.weather[0].description,
            
        })
        this.get_weatherIcon(this.weatherIcon,response.weather[0].id)
      }
      else{
    this.setState({error:true})
      }

    }

  render(){
  return (
    <div className="App">
      <Form error={this.state.error} loadweather={this.getWeather}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weatherIcon={this.state.icon}
      />
      
    </div>
  )}
}

export default App




