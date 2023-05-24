/**
 * This file will hold the Main content that lives in the main body of the site
 * 
 */
import React from 'react';
import { Gallery } from "react-grid-gallery";



class Home extends React.Component {

    constructor(props) {
        super(props);
    }
       

   

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof Home
    */
    render() {
        console.log("main.js", this.props.images)
        return (
            this.props.sourceAvailable == false ?
            <div><section id="home">
            <div className="content">
                <p>ELC Coding Test...</p>
            </div>
        </section></div> :
          <div>
            <Gallery images={this.props.images}/>
          </div>
        );
    }


}

// Export out the React Component
export default Home;