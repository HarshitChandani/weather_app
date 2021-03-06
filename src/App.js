import {Header,Icon} from 'semantic-ui-react'
import Container from 'react-bootstrap/Container'
import {Row,Col} from 'react-bootstrap'
import GetWeatherIcon from './controls/helpers'
import './App.css'
const App = (props) => {
  return (
    <Container className="App w-50 p-5">
      <Row>
      <div className="container_1" style={props.current.background}>
          <div className="weather-block-2">
            <div className="weather-block-2-col-1">
              <Header as ="h3">
                <Icon name="align justify" className='icon-align-justify'/>
              </Header>
            </div>
            <div className="weather-block-2-col-2">
              <div><b>{props.current.city},&nbsp;{props.current.country}</b></div><hr/>
              <div>Updated At {props.current.date_time.Time}</div>
            </div>
            <div className="weather-block-2-col-3">
              <Header as ="h3">
                <Icon name="power off" className='icon-align-justify'/>
              </Header>
            </div>
          </div>
          <div className="city-weather">
            <div className="weather-icon">
                <GetWeatherIcon main={props.current.weather_main}/>
            </div>
            <div className="weather-name">
              {props.current.weather_name}
            </div>
          </div>
          <div className="weather-block-1">
            <div className="city-temp">
              <div className="temperature">
                <span style={{fontSize:'70px'}}>{props.current.temperature}
                  <span className="temp-type">&deg;</span>
                </span> 
              </div>
              <div className="max_min">
                {props.current.max_temperature} &deg; C
                <hr/>
                {props.current.min_temperature} &deg; C
              </div>
            </div>
          </div>
      </div>
      </Row>
    </Container>
  );
};

export default App;
