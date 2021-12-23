import { Component } from 'react'
import { BsFunnelFill  } from "react-icons/bs"
import { addWeatherLayer } from '../actions'
import { connect } from 'react-redux';

import "./Sidebar.css"

import { layers } from "../constant/LayerConst"

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state= {
            layerSelected: []
        }
        this.handleLayerChange = this.handleLayerChange.bind(this);
    }

    handleLayerChange(event){
        let layer_list = this.state.layerSelected;
        let check = event.target.checked;
        let checked_layer = event.target.value;
        if(check){
            this.setState({
                layerSelected: [...this.state.layerSelected, checked_layer]
            }, function() {
                this.props.addWeatherLayer(this.state.layerSelected)
            })
        }else{ 
            var index = layer_list.indexOf(checked_layer);
            if (index > -1) {
                layer_list.splice(index, 1);
                this.setState({
                    layerSelected: layer_list
                }, function() {
                    this.props.addWeatherLayer(this.state.layerSelected)
                })
            } 
        }
    }

    render() {
        return (
        <div>
            <div class="card sidebar">
                <button class="btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters" aria-controls="offcanvasFilters">
                    <BsFunnelFill size={25}/>
                </button>
            </div>
            <div class="offcanvas" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasFilters" aria-labelledby="offcanvasFiltersLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasFiltersLabel">Filters</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="accordion" id="accordionFilter">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="weather">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWeather" aria-expanded="false" aria-controls="collapseWeather">
                            Weather Layer
                        </button>
                    </h2>
                    <div id="collapseWeather" class="accordion-collapse collapse" aria-labelledby="weather" data-bs-parent="#accordionFilter">
                        <div class="accordion-body">
                            <form>
                            {layers.weatherLayer.map((layer) => (
                                <div key={`checkbox-${layer.value}`} class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="weather" id={`${layer.value}`} value={`${layer.value}`} onChange={e => this.handleLayerChange(e)}/>
                                    <label class="form-check-label" htmlFor={`${layer.value}`}>{`${layer.name}`}</label>
                                </div>
                                </div>
                            ))}
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        weatherLayer: state.weatherReducer
    }
}

const mapDispatchToProps = dispatch => ({
    addWeatherLayer: (val) => { dispatch(addWeatherLayer(val)); }
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)