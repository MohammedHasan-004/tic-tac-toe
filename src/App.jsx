import Gameboard from "./components/GameBoard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/log.jsx";
import {WINNING_COMBINATIONS} from "./components/winning-combinations.js";
import Gameover from "./components/gameover.jsx";
const GameBoard=[
    [null,null,null],
    [null,null,null], 
    [null,null,null]
]

function deriveActivePlayer(gameturnes) {
  return gameturnes.length % 2 == 0 ? "X" : "O";
}
function App() {

  const [player,setplayer]=useState({"X":"Player 1","O":"Player 2"})
  const [gameturnes, setgameturnes] = useState([]);
  //const [activeplayer, setactiveplayer] = useState("X");
  const activeplayer=deriveActivePlayer(gameturnes);
  let winner;
  const gameboard=[...GameBoard.map((array)=>[...array])];
  for (const turn of gameturnes){
        const {square,player}=turn;
        const {row,col}=turn.square;
        gameboard[row][col]=player;
    }
  for (const win of WINNING_COMBINATIONS){
    const firststate=gameboard[win[0].row][win[0].column];
    const secondstate=gameboard[win[1].row][win[1].column];
    const thirdstate=gameboard[win[2].row][win[2].column];
    if (firststate && firststate==secondstate && firststate==thirdstate){
      winner=player[firststate];
    }

  }
  const hasdraw=gameturnes.length==9 && !winner;
  
  function handelselectaquare(rowindex, colindex) {
    // 1) سجّل الحركة الحالية باللاعب الحالي
    setgameturnes(prevturnes => [
      { square: { row: rowindex, col: colindex }, player: activeplayer },
      ...prevturnes,
    ]);

    // 2) بدّل اللاعب – لازم ترجع قيمة من السهم
    //setactiveplayer(cur => (cur === "X" ? "O" : "X"));
  }
  function Rematch(){
    setgameturnes([]);
  }
  function handelselectplayerchange(symbol,newplayer){
    setplayer(prevplayer=>{
      return {
      ...prevplayer,[symbol]:newplayer}});
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player Symbol="X" name="Player 1" isactive={activeplayer === "X"} playernameset={handelselectplayerchange} />
          <Player Symbol="O" name="Player 2" isactive={activeplayer === "O"} playernameset={handelselectplayerchange} />
        </ol>
        {(winner || hasdraw) && <Gameover winner={winner} handelrematch={Rematch}/>}
        <Gameboard
          onselect={handelselectaquare}
          activeplayersymbol={activeplayer}
          board={gameboard}
        />
      </div>
      <Log turns={gameturnes} />
    </main>
  );
}

export default App;
