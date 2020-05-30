import React, {
  useState
} from 'react';
import './App.css';
import './Function List/FunctionsList'
import FunctionList from './Function List/FunctionsList';
import PlayArea from './Play Area/PlayArea';
import globalContext from './GlobalState';


function App() {
  const initState = useState({
    available: [],
    databases: [],
    Entities: [{
        name: "Post",
        properties: [{
            name: "id",
            type: "i"
          }, {
            name: "title",
            type: 's'
          },
          {
            name: "hidden",
            type: 'b'
          },
          {
            name: "user_id",
            type: 'i'
          }
        ]
      },
      {
        name: "Role",
        properties: [{
            name: "id",
            type: "i"
          }, {
            name: "name",
            type: 's'
          },
          {
            name: "user_id",
            type: 'i'
          }
        ]
      },
      {
        name: "Tag",
        properties: [{
            name: "id",
            type: "i"
          }, {
            name: "name",
            type: 's'
          },
          {
            name: "post_id",
            type: 'i'
          }
        ]
      },
      {
        name: "User",
        properties: [{
            name: "id",
            type: "i"
          }, {
            name: "firstName",
            type: 's'
          },
          {
            name: "lastName",
            type: 's'
          },
          {
            name: "age",
            type: 'i'
          },
          

        ]
      }
    ],
    Push: [],
    Joins: []
  });


  return (

    <div className = "App" >
    <
    globalContext.Provider value = {
      initState
    } >
    <
    FunctionList / >
    <
    PlayArea / >
    <
    /globalContext.Provider> < /
    div >
  );
}

export default App;