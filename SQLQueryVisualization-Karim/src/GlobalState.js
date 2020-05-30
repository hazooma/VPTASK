import {createContext} from 'react';

const globalContext= createContext([{
    //this is the schema
    available:[],
    databases:[],
    Entities:[],
    Push:[],
    Joins:[]
},
obj => obj]);


export default globalContext;