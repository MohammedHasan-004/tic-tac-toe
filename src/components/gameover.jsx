export default function Gameover({winner="Nobody",handelrematch}){
     return (
     <div id="game-over">
        <h2>Game Over</h2>
        <p>{winner} Won!</p>
        <p><button onClick={handelrematch}>Rematch!</button></p>
     </div>
     );
}