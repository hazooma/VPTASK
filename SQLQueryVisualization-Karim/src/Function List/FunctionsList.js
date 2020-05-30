import React,{useContext} from 'react';
import './functionlist.css';
import globalContext from '../GlobalState';
import Entity from '../Entity/Entity';
import Join from '../Entity/Join';

function FunctionList(){
 
    const [gl,setGl]=useContext(globalContext);
    let operations=gl.Entities;
    //console.log(gl);
    return(
      <div id="list">
      <h1 className="functionsHeader">Entities</h1>
      <ul>
        {operations.map((e,i)=>{
            //operation=operations[i];
            
             return (<>
             <li id={i} className="function"
             onClick={() => {setGl({...gl,payload:gl.available.push(e)})
             setGl({...gl,payload:gl.Push.push({name:e.name, properties:e.properties})})}}>{e.name}</li></>)
        })}
        </ul>
      </div>
    );

};

export default FunctionList;