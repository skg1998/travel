import * as React from 'react';
import { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin'

class Markers extends PureComponent {
    render() {
        const {data} = this.props;
        return data.map((data) => (
            <div key={data._id} style={{ zIndex: -1 }}>
                <Marker key={data._id} longitude={data.longitude} latitude={data.latitude} >
                    <div
                        className="marker"
                        onClick={()=>{ this.props.markerClicked(data) }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'column',
                            justifyContent: 'center',
                        }}
                    >
                    <Pin size={20} />
                    </div>
                </Marker>
            </div>
        ));
    }
  }

export default React.memo(Markers);