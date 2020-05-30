import React, { useContext, useEffect } from "react";
import "./playarea.css";
import globalContext from "../GlobalState";
import Entity from "../Entity/Entity";
import Join from "../Entity/Join";

function PlayArea(props) {
  const [gl, setGl] = useContext(globalContext);
  var onBoard = gl.available;
  console.log(onBoard);
  let up = false;
  useEffect(() => {
    let l = gl.Push;
    onBoard.forEach((e) => {
      // l={...l,[i]:{}}
      // setGl(...gl,{Push:{}});
      console.log(JSON.stringify(e));
      l = {
        ...l,
        [e.name]: {},
      };
    });
    setGl({
      ...gl,
      Push: l,
    });
  }, []);

  const [data, setData] = React.useState([])
  const call = (event) => {
    return fetch("http://localhost:5000/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gl),

      mode: "cors",
    }).then((res) => res.json())
    .then(data => setData(data))
  };
  if (onBoard) {
    console.log(JSON.stringify(gl.Push));

    return (
      <div id="playarea">
        <ul>
          {" "}
          {onBoard.map((e, i) => {
            up = !up;
            //console.log(`this is the store: ${gl}`)

            return (
              <>
                {" "}
                {i >= 1 ? (
                  <Join
                    entity1={onBoard[i - 1]}
                    entity2={onBoard[i]}
                    id={i - 1}
                  />
                ) : (
                  <></>
                )}{" "}
                <li className="onBoardList">
                  {" "}
                  <Entity operation={e} id={i} />
                </li>{" "}
              </>
            );
          })}{" "}
        </ul>{" "}
          <table style={{width:'100%', color:'#fff', textAlign:'center'}}>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
              <th>hidden</th>
              <th>user_id</th>
            </tr>
            {data.map((table) => (
              <tr>
                <td>{table.id}</td>
                <td>{table.title}</td>
                <td>{table.body}</td>
                <td>{table.hidden + ''}</td>
                <td>{table.user_id}</td>
              </tr>
            ))}
          </table>
        <li
          style={{
            background: "blue",
          }}
          className="function"
          onClick={call}
        >
          {" "}
          Run!{" "}
        </li>{" "}
      </div>
    );
  } else {
    return <div> </div>;
  }
}

export default PlayArea;
