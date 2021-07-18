import React from 'react';
import { get_API_key,getLocation,set_Response_Units , set_Response_Type} from './api'
import {TodaysWeather} from '../controls/helpers'
import {Header,Message} from 'semantic-ui-react'
let cordinates = [];
class main extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         "is_data_fetched":false 
      }
   }
   componentDidMount(){
      if(getLocation()){
         //Permission given by the user to access his or her location
         navigator.geolocation.getCurrentPosition((c) => {
            cordinates['latitude'] =c.coords.latitude;
            cordinates['longitude'] = c.coords.longitude;
            this.fetchTodayWeather(); 
        });  
        
      }
      else{
         alert('Permission Denied')
         console.error("LOCATION PERMISSION DENIED.");
      }
   }
   fetchTodayWeather(){
      fetch(`https://api.openweathermap.org/data/2.5/find?lat=${cordinates.latitude}&lon=${cordinates.longitude}&cnt=${1}&mode=${set_Response_Type()}&units=${set_Response_Units()}&appid=${get_API_key()}`,{
         method:'GET',
         header:{
            'Content-Type': 'application/json',
            'Accept':'application/json'
         }
      })
        .then((response) => {
           if(response.ok && response.status === 200){   
               console.log('Request succeded')
               return (response.json())
           }
           else{
              throw new Error(response.statusText)
           }
        })
        .then((data) => {
           this.setState({
            "current":data,
            "is_data_fetched" : true 
           })
        })
        .catch((Error) => {
           console.log('Error',Error)
           
        });
   }
   render(){
      const {current,is_data_fetched} = this.state
      if(is_data_fetched){
         return (
            <>
               <TodaysWeather current = {current.list[0]}/>
            </>
         )
      }
      else{
         let network_reason = [
            'Internet not connected',
            'Not proper bandwidth',
            'Request Block'
         ]
         return(
            <div>
               <Message>
                  <Message.Header>
                     <Header as="h3">Network Error</Header>
                     <Header as="h5">Reasons:</Header>
                  </Message.Header>
                  <Message.List item={network_reason}></Message.List>
               </Message>
            </div>
         )
      }
      
   }
}

export default main