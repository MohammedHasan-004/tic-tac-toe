
import {useState} from "react";
export default function Player({name,Symbol,isactive,playernameset}){
    const [isediting,setisediting]=useState(false);
    const [newname,setnewname]=useState(name);
    function setediting(){
          setisediting(!isediting);
          if (isediting){
            playernameset(Symbol,newname);
          }
    }
    function handlechange(event){
        setnewname(event.target.value);
    }
    let playername=<span className="player-name" >{newname}</span>;
    let btncaption="Edit";
    
    if (isediting){

        playername=<input type="text" required value={newname} onChange={handlechange}/>
        btncaption="Save";
    }
    return (

        <li className={isactive ? "active" : undefined}>
           <span className="player">
            {playername}
            <span className="player-symbol"> : ({Symbol})</span>
            </span>
            <button onClick={()=>setediting()}>{btncaption}</button>
        </li>
    );
}