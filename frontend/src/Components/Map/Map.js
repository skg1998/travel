import React from 'react';
import { useState,useEffect } from 'react';
import ReactMapGL, { Marker,Popup } from 'react-map-gl';
import {LogEntries} from '../../API'

const  Map =()=> {
    const [logEntries,setLogEntries] = useState([])
    const [showPopup,setShowPopup] = useState({});
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 37.6,
        longitude: -95.667,
        zoom: 3
      });


    useEffect(()=>{
       (async ()=>{
         const logEntries = await LogEntries()
         setLogEntries(logEntries)
         console.log("logentries.....",logEntries)
       })()
    },[])  


    const showAddMarkerPopup = (event)=>{
      console.log(event)
    }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/codingboy/ckdr6586v0o0419oolwcu3qg8"
      mapboxApiAccessToken={"pk.eyJ1IjoiY29kaW5nYm95IiwiYSI6ImNrZHI0N20zNjB3azYzMHA2enpsZjB1MDMifQ.S7n1sDI_kGSZfI1jbrblFg"}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(data=> (
          <>
            <Marker 
              key={data._id}
              latitude ={data.latitude}
              longitude = {data.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div onClick={()=>{
                setShowPopup({
                  // ...showPopup,
                  [data._id]:true
                })
              }}>
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
            {
              showPopup[data._id] ? (
                <Popup
                  latitude ={data.latitude}
                  longitude = {data.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({
                    // showPopup,
                    // [data._id]:false
                  })}
                  anchor="top" >
                  <div className="popup">
                    <h3>{data.name} </h3>
                    <p>{data.description} </p>
                    <small>Visited on:{new Date(data.visitDate).toLocaleDateString()} </small>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default Map;