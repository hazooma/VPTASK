import React from 'react';
import {useContext} from 'react';
import globalContext from '../GlobalState';
import Properties from './Properties';
const Entity = (props)=>{
    const [gl,setGl]=useContext(globalContext);
    const operation=props.operation;
    console.log(`operation: ${JSON.stringify(operation)}`)
    return (
    <div>
        {operation.name}
        {operation.properties.map((e,i)=>{
            //should me make theproperties objects i guess we have no options
            //size:==6
            return(
                <li key={i}><Properties property={e} entity={operation.name} id={i} entityid={props.id} /></li>
            );
        })}

    </div>
    )
}

export default Entity;