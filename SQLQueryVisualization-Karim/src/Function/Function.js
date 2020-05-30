import React,{useContext} from 'react';
import globalContext from '../GlobalState';

const Function=(props) => {
    const type=props.type;
    const [gl,setGl]=useContext(globalContext);
    const database=gl.databases[0];


}