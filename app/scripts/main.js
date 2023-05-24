/**
 * The Initial React Setup file
 * ...
 * 
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 * 
 * == JS
 * All files in here start from this init point for the React Components.
 *  
 * 
 * Firstly we need to import the React JS Library
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from "axios";

import Menu from './components/menu';
import Home from './components/home';

/**
 * We can start our initial App here in the main.js file
 */
class App extends React.Component {

    constructor() {
        super();
        this.state = {
            value : null,
            data : [],
            images : null,
            sourceAvailable:false
            
        };
        
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.updateImages(), 1000);
      }
    
      componentWillUnmount() {
        
      }
   

    updateImages() {
        if (this.state.data !== undefined || this.state.data > 0) {
            var cach = []
            console.log("check value", this.state.value)

            this.state.data.map(d => {
            if (this.state.value !== undefined && this.state.value !== "") {
                if (d.name.includes(this.state.value)) {
                    var obj = {
                        src: "http://localhost:3030" + d.picture,
                        width: 320,
                        height: 174,
                        isSelected: false,
                    }
                    cach.unshift(obj);
                }
            } else {
                this.setState({
                    sourceAvailable : false,
                    images : []
                })
            }
           })
           this.setState({images : cach});
        }
    }

    handleChangeValue = event => {
        this.setState({value: event.target.value});
        this.getData();
        this.updateImages();
    }

    getData() {
        const response =  axios.get('http://localhost:3035').then((response) => {
           this.setState({
            data : response.data,
            sourceAvailable : true
        })
        }).catch(e => console.log(e))
       
      }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <div className="App">
                <Menu onChangeValue={this.handleChangeValue} />
                <Home sourceAvailable = {this.state.sourceAvailable} images ={this.state.images} />
            </div>
        );
    }

}

// Render this out
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
