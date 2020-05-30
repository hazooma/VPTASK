import React, { useState } from 'react';
import {useContext} from 'react';
import globalContext from '../GlobalState';
const Property= (props)=>{
    let entity=props.entity;
    let property=props.property;
    const [cont,setCont]= useContext(globalContext);

    const [value, setValue]=useState('');
    const [used, setUsed]=useState(false);
    const [opra, setOpra]=useState('');

    let handleChange=(event) =>{
        
        console.log(JSON.stringify(cont));
        
    }
    let trial=(event)=>{
      const i =property.type==='b'?'':event.currentTarget.elements[1].value
      console.log(event.currentTarget.elements);
      setOpra(event.currentTarget.elements[0].value);
        
      setValue(i);
      
      setCont({...cont,payload:cont.Push[props.entityid].properties[props.id].value=event.currentTarget.elements[0].value+i});

    }
    

    const operants= property.type === 's'?['==','LIKE'] :property.type==='b'?['false','true']:['<','>','==','>=','<=']
    return(
        <form onChange={trial}>
        <label>
          {property.name+': \n'}
          <select value={opra}>
            {operants.map( opr =>(
              <option value={opr}>{opr}</option>
            ))}
            
          </select>
          {property.type==='b'? <></>:<input style={{width:"30%"}} type={property.type==='s'?'text':'number'} value={value} onChange={handleChange} />}
        </label>
      </form>
    )
}
export default Property;