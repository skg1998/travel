import React from 'react';
import { useState,useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
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
             offsetLeft={-20}
             offsetTop = {-10}
          >
            <div>{data.name} </div>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default Map;