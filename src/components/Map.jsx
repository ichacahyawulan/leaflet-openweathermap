import 'leaflet/dist/leaflet.css'
import './Map.css'
import * as L from 'leaflet'
import "leaflet-openweathermap"
import "leaflet-openweathermap/leaflet-openweathermap.js"
import "leaflet-openweathermap/leaflet-openweathermap.css"
import "wind-js-leaflet"
import "wind-js-leaflet/dist/wind-js-leaflet.js"
import "wind-js-leaflet/dist/wind-js-leaflet.css"
import "leaflet-velocity"
import "leaflet-velocity/dist/leaflet-velocity.js"
import "leaflet-velocity/dist/leaflet-velocity.css"
import { Component } from 'react'
import { connect } from 'react-redux';
import Sidebar from './Sidebar'

const data = require('./data.json')

class Map extends Component {
    constructor(props) {
        super(props)
        this.state= {
            // center: [-0.789275,113.921327],
            // zoom: 5,
            map: null,
            tileLayer: null,
            baseMap: '',
            layersWeather: []
        }
        this.leafletMap = null
        this.init = this.init.bind(this)
    }

    remove(map) {
        map.remove()
    }

    removeLayer(map, layer) {
        map.removeLayer(layer)
    }

    init(id) {             
        const map = L.map(id, {
            center: [-0.789275,113.921327],
            zoom: 5
        });
        
        const defaultBase = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        const tileLayer = L.tileLayer(defaultBase).addTo(map); 
        this.setState({ map, tileLayer });
    }

    addWeatherLayertoMap (layer) {
        const myAppId= '9bc809c7e6962e34795828fac326d19c'
        const weather = []
        if (layer.length > 0) {
            for (let i=0; i<layer.length; i++) {
                switch(layer[i]) {
                    case "clouds":
                        weather[i] = L.OWM.clouds({appId: myAppId});
                        break;
                    case "cloudscls":
                        weather[i] = L.OWM.cloudsClassic({appId: myAppId});
                        break;
                    case "precipitation":
                        weather[i] = L.OWM.precipitation({appId: myAppId});
                        break;
                    case "precipitationcls":
                        weather[i] = L.OWM.precipitationClassic({appId: myAppId});
                        break;
                    case "rain":
                        weather[i] = L.OWM.rain({appId: myAppId});
                        break;
                    case "raincls":
                        weather[i] = L.OWM.rainClassic({appId: myAppId});
                        break;
                    case "snow":
                        weather[i] = L.OWM.snow({appId: myAppId});
                        break;
                    case "pressure":
                        weather[i] = L.OWM.pressure({appId: myAppId});
                        break;
                    case "pressurecntr":
                        weather[i] = L.OWM.pressureContour({appId: myAppId});
                        break;
                    case "temp":
                        weather[i] = L.OWM.temperature({appId: myAppId, showLegend: false});
                        break;
                    case "wind":
                        weather[i] = L.OWM.wind({appId: myAppId, showTimestamp: true});
                        break;
                    case "windglb":
                        weather[i] = L.velocityLayer({
                            displayValues: true,
                            displayOptions: {
                              velocityType: "Global Wind",
                              displayPosition: "bottomleft",
                              displayEmptyString: "No wind data"
                            },
                            data: data,
                            maxVelocity: 10
                          });                       
                        break;
                    default:
                        return null
                }
                weather[i].addTo(this.state.map)
            }
        }
        this.setState({ layersWeather: weather });
    }

    componentDidMount() {
        this.init(this.leafletMap);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.weatherSelected !== this.props.weatherSelected) {
            for (let i=0; i<this.state.layersWeather.length; i++) {
                if (this.state.map.hasLayer(this.state.layersWeather[i])) {
                    this.state.map.removeLayer(this.state.layersWeather[i])
                }
            }
            console.log("print"+this.props.weatherSelected)
            this.addWeatherLayertoMap(this.props.weatherSelected)
        }
    }

    render() {
        return (
        <div id="container">
            <Sidebar/>
            <div ref={(map) => this.leafletMap = map} id="map" />
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        weatherSelected: state.weatherReducer
    }
}

export default connect(mapStateToProps)(Map)