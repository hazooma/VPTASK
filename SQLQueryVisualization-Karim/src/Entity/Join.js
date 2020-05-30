import React, { useState } from 'react';
import {useContext} from 'react';
import globalContext from '../GlobalState';
import Properties from './Properties';

const Join= (props)=>{
    const [joins,changeJoins]=useState([[props.entity1.properties[0],props.entity2.properties[0]]]);
    const [cont,changeCont]=useContext(globalContext);

    const add=()=>{
        document.getElementById('joinform')
        let x=[...joins];
        x.push([props.entity1.properties[0],props.entity2.properties[0]]);
        if(Math.min(props.entity1.properties.length,
            props.entity2.properties.length)>=x.length){
                console.log(`X's length is ${x.length}`)
                changeJoins(x);
            }
        


    }
    const update=(event)=>{
        event.preventDefault();
        event.stopPropagation();
            changeCont({...cont,payload:cont.Joins[props.id]={E1:props.entity1.name,E2:props.entity2.name,Joins:joins}});
            console.log(JSON.stringify(cont));
    }
return(
    <div>
    <form style={{display:'flex', flexDirection:'column'}} id={'joinform'} onSubmit={(event)=>{event.preventDefault();
        event.stopPropagation()}} onChange={(event)=>{event.preventDefault();
        event.stopPropagation();update(event)}}>
    <button style={{width:'fit-content'}} onClick={()=>{add()}}>+</button>
     
    {joins.map((j,i)=> (
        <div style={{display:'flex'}}>
        <button onClick={()=>{let x=[...joins]; x.splice(i,1); changeJoins(x)}}>-</button>
        <select value={joins[i][0]} onChange={(event)=>{let x=[...joins];  x[i][0]=event.target.value;console.log(x);changeJoins(x)}}>
        {props.entity1.properties.map(prop =>(
            <option value={prop.name}>{prop.name}</option>
        ))}
    </select>

    <p>=</p>
    <select value={joins[i][1]} onChange={(event)=>{let x=[...joins]; x[i][1]=event.target.value;changeJoins(x)}}>
        {props.entity2.properties.map(prop =>(
            <option value={prop.name}>{prop.name}</option>
        ))}
    </select></div>))}
    </form>
    </div>
);
}
export default Join