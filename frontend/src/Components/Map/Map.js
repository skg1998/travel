import React from 'react';
import { useState,useEffect } from 'react';
import ReactMapGL, { Marker,Popup } from 'react-map-gl';
import {LogEntries} from '../../API'

const  Map =()=> {
  const [logEntries,setLogEntries] = useState([])
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      });


    useEffect(()=>{
       (async ()=>{
         const logEntries = await LogEntries()
         setLogEntries(logEntries)
         console.log("logentries",logEntries)
       })()

       return ()=>{
         //clean up things.....
       }
    },[])  

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/codingboy/ckdr6586v0o0419oolwcu3qg8"
      mapboxApiAccessToken={"pk.eyJ1IjoiY29kaW5nYm95IiwiYSI6ImNrZHI0N20zNjB3azYzMHA2enpsZjB1MDMifQ.S7n1sDI_kGSZfI1jbrblFg"}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(data=> (
          <Marker 
             key={data._id}
             latitude ={data.latitude}
             longitude = {data.longitude}
          >
            <div>
              <svg 
                viewBox="0 0 24 24" 
                style={{
                  width:`${6*viewport.zoom}px`,
                  height:`${6*viewport.zoom}px`,
                  stroke:"#f8c102"
                }}
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="css-i6dzq1 marker" 
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
        ))
      }
      <Popup
          latitude={37.78}
          longitude={-122.41}
          closeButton={true}
          closeOnClick={false}
          onClose={() => this.setState({showPopup: false})}
          anchor="top" >
          <div>You are here</div>
        </Popup>
    </ReactMapGL>
  );
}

export default Map;