document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navtoggle');
  const links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.querySelector('.form-msg');
      if (msg) msg.textContent = 'This form is a placeholder — connect it to your email or form backend to receive messages.';
    });
  }
});
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Nova Chess</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

:root{
    --bg:#070a12;
    --panel:#101522;
    --panel2:#151b2b;
    --text:#f5f7ff;
    --muted:#8992a8;
    --accent:#7c5cff;
    --accent2:#00d4ff;
    --light:#e8edf5;
    --dark:#657087;
    --selected:#f6d365;
    --possible:rgba(80,220,130,.75);
    --danger:#ff5364;
    --shadow:0 25px 70px rgba(0,0,0,.45);
}

body.light{
    --bg:#eef2f8;
    --panel:#ffffff;
    --panel2:#f4f6fb;
    --text:#151927;
    --muted:#667085;
    --shadow:0 20px 60px rgba(40,50,80,.15);
}

body{
    min-height:100vh;
    background:
        radial-gradient(circle at 10% 10%,rgba(124,92,255,.18),transparent 30%),
        radial-gradient(circle at 90% 80%,rgba(0,212,255,.12),transparent 30%),
        var(--bg);
    color:var(--text);
    font-family:Inter,Arial,sans-serif;
    transition:.3s;
}

.app{
    width:min(1400px,100%);
    margin:auto;
    padding:20px;
}

.topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:22px;
    gap:15px;
}

.brand{
    display:flex;
    align-items:center;
    gap:13px;
}

.logo{
    width:50px;
    height:50px;
    display:grid;
    place-items:center;
    border-radius:16px;
    background:linear-gradient(135deg,var(--accent),var(--accent2));
    box-shadow:0 10px 30px rgba(124,92,255,.3);
    font-size:28px;
}

.brand h1{
    font-size:23px;
    font-weight:800;
}

.brand span{
    color:var(--muted);
    font-size:12px;
}

.top-actions{
    display:flex;
    gap:8px;
}

.icon-btn,.btn{
    border:0;
    cursor:pointer;
    color:var(--text);
    background:var(--panel);
    border:1px solid rgba(255,255,255,.08);
    transition:.2s;
}

.icon-btn{
    width:45px;
    height:45px;
    border-radius:14px;
    font-size:20px;
}

.icon-btn:hover,.btn:hover{
    transform:translateY(-2px);
    border-color:var(--accent);
}

.layout{
    display:grid;
    grid-template-columns:minmax(300px,760px) 340px;
    gap:24px;
    justify-content:center;
    align-items:start;
}

.game-card{
    background:rgba(16,21,34,.8);
    border:1px solid rgba(255,255,255,.07);
    border-radius:25px;
    padding:18px;
    box-shadow:var(--shadow);
    backdrop-filter:blur(20px);
}

body.light .game-card{
    background:rgba(255,255,255,.82);
}

.player{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:9px 5px 14px;
}

.player-info{
    display:flex;
    align-items:center;
    gap:11px;
}

.avatar{
    width:39px;
    height:39px;
    border-radius:13px;
    display:grid;
    place-items:center;
    background:linear-gradient(135deg,#242b3d,#111624);
    font-size:21px;
}

.player-name{
    font-size:14px;
    font-weight:700;
}

.player-status{
    color:var(--muted);
    font-size:11px;
    margin-top:3px;
}

.clock{
    min-width:92px;
    text-align:center;
    background:var(--panel2);
    padding:9px 13px;
    border-radius:12px;
    font-weight:800;
    font-size:17px;
    letter-spacing:1px;
}

.clock.active{
    background:linear-gradient(135deg,var(--accent),#6043e8);
    color:white;
}

.clock.danger{
    background:var(--danger);
    color:white;
}

.board-wrap{
    width:100%;
    max-width:720px;
    margin:auto;
    aspect-ratio:1;
    border-radius:15px;
    overflow:hidden;
    box-shadow:
        0 15px 50px rgba(0,0,0,.35),
        0 0 0 5px rgba(255,255,255,.03);
}

.board{
    width:100%;
    height:100%;
    display:grid;
    grid-template-columns:repeat(8,1fr);
    grid-template-rows:repeat(8,1fr);
}

.square{
    position:relative;
    display:grid;
    place-items:center;
    cursor:pointer;
    user-select:none;
    -webkit-user-select:none;
    transition:filter .12s;
}

.square.light{
    background:#e9edf3;
}

.square.dark{
    background:#667188;
}

.square:hover{
    filter:brightness(1.08);
}

.piece{
    position:relative;
    z-index:3;
    font-family:"Times New Roman",serif;
    font-size:clamp(32px,7vw,67px);
    line-height:1;
    transition:transform .12s;
    text-shadow:
        0 2px 2px rgba(0,0,0,.3),
        0 5px 12px rgba(0,0,0,.15);
}

.white-piece{
    color:#fff;
    -webkit-text-stroke:1px #555;
}

.black-piece{
    color:#171b25;
    -webkit-text-stroke:1px #000;
}

.square.selected{
    box-shadow:inset 0 0 0 5px rgba(246,211,101,.85);
}

.square.last{
    background:#b7a449 !important;
}

.square.check{
    background:radial-gradient(circle,#ff5364 0%,#9b2c3b 45%,inherit 75%) !important;
}

.move-dot{
    position:absolute;
    width:20%;
    height:20%;
    border-radius:50%;
    background:rgba(30,100,50,.55);
    z-index:2;
}

.capture-ring{
    position:absolute;
    width:78%;
    height:78%;
    border:6px solid rgba(220,60,70,.6);
    border-radius:50%;
    z-index:2;
}

.coord{
    position:absolute;
    font-size:10px;
    font-weight:700;
    opacity:.7;
    z-index:4;
}

.rank{
    left:5px;
    top:4px;
}

.file{
    right:5px;
    bottom:3px;
}

.light .coord{
    color:#667188;
}

.dark .coord{
    color:#e9edf3;
}

.bottom-tools{
    display:flex;
    gap:9px;
    margin-top:15px;
}

.btn{
    flex:1;
    padding:12px 15px;
    border-radius:13px;
    font-weight:700;
    font-size:13px;
}

.btn.primary{
    background:linear-gradient(135deg,var(--accent),#6043e8);
    color:#fff;
    border:0;
}

.btn.danger{
    color:#ff7582;
}

.sidebar{
    display:flex;
    flex-direction:column;
    gap:15px;
}

.panel{
    background:rgba(16,21,34,.8);
    border:1px solid rgba(255,255,255,.07);
    border-radius:22px;
    padding:18px;
    box-shadow:var(--shadow);
    backdrop-filter:blur(20px);
}

body.light .panel{
    background:rgba(255,255,255,.82);
}

.panel-title{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}

.panel-title h2{
    font-size:15px;
}

.badge{
    font-size:10px;
    padding:5px 8px;
    border-radius:7px;
    background:rgba(124,92,255,.15);
    color:#a898ff;
}

.moves{
    height:310px;
    overflow-y:auto;
    padding-right:4px;
}

.moves::-webkit-scrollbar{
    width:5px;
}

.moves::-webkit-scrollbar-thumb{
    background:#333b50;
    border-radius:10px;
}

.move-row{
    display:grid;
    grid-template-columns:35px 1fr 1fr;
    padding:9px 7px;
    border-radius:9px;
    font-size:13px;
}

.move-row:nth-child(even){
    background:rgba(255,255,255,.025);
}

.move-number{
    color:var(--muted);
}

.captured{
    display:flex;
    flex-wrap:wrap;
    gap:1px;
    min-height:29px;
    font-size:21px;
}

.stats{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:8px;
}

.stat{
    background:var(--panel2);
    border-radius:12px;
    padding:11px;
    text-align:center;
}

.stat strong{
    display:block;
    font-size:17px;
}

.stat span{
    display:block;
    color:var(--muted);
    font-size:9px;
    margin-top:3px;
}

.mode-select{
    display:flex;
    gap:7px;
}

.mode{
    flex:1;
    padding:10px 5px;
    border:1px solid rgba(255,255,255,.07);
    background:var(--panel2);
    color:var(--muted);
    border-radius:11px;
    cursor:pointer;
    font-weight:700;
    font-size:11px;
}

.mode.active{
    background:var(--accent);
    color:white;
}

.status{
    text-align:center;
    font-size:13px;
    font-weight:700;
    padding:9px;
    border-radius:10px;
    background:var(--panel2);
    margin-bottom:12px;
}

.modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.72);
    display:none;
    place-items:center;
    z-index:20;
    backdrop-filter:blur(10px);
}

.modal.show{
    display:grid;
}

.modal-box{
    width:min(420px,90%);
    background:var(--panel);
    border:1px solid rgba(255,255,255,.1);
    border-radius:24px;
    padding:25px;
    text-align:center;
    box-shadow:var(--shadow);
}

.modal-box h2{
    font-size:25px;
    margin-bottom:8px;
}

.modal-box p{
    color:var(--muted);
    font-size:13px;
    margin-bottom:20px;
}

.promotion{
    display:flex;
    justify-content:center;
    gap:10px;
}

.promo{
    width:62px;
    height:62px;
    border:0;
    border-radius:15px;
    background:var(--panel2);
    font-size:40px;
    cursor:pointer;
}

.promo:hover{
    background:var(--accent);
}

.toast{
    position:fixed;
    left:50%;
    bottom:25px;
    transform:translate(-50%,20px);
    background:#171d2b;
    color:white;
    padding:12px 18px;
    border-radius:13px;
    opacity:0;
    pointer-events:none;
    transition:.25s;
    z-index:30;
    font-size:13px;
    font-weight:600;
}

.toast.show{
    opacity:1;
    transform:translate(-50%,0);
}

@media(max-width:1000px){
    .layout{
        grid-template-columns:minmax(300px,720px);
    }

    .sidebar{
        display:grid;
        grid-template-columns:1fr 1fr;
    }

    .panel:first-child{
        grid-column:span 2;
    }
}

@media(max-width:650px){
    .app{
        padding:10px;
    }

    .game-card{
        padding:10px;
        border-radius:18px;
    }

    .topbar{
        margin-bottom:10px;
    }

    .brand h1{
        font-size:19px;
    }

    .logo{
        width:42px;
        height:42px;
    }

    .sidebar{
        display:flex;
    }

    .panel:first-child{
        grid-column:auto;
    }

    .moves{
        height:200px;
    }

    .piece{
        font-size:clamp(29px,10vw,48px);
    }

    .clock{
        min-width:78px;
        font-size:14px;
    }
}
</style>
</head>

<body>

<div class="app">

    <header class="topbar">
        <div class="brand">
            <div class="logo">♞</div>
            <div>
                <h1>Nova Chess</h1>
                <span>Think. Move. Conquer.</span>
            </div>
        </div>

        <div class="top-actions">
            <button class="icon-btn" id="themeBtn">☀️</button>
            <button class="icon-btn" id="soundBtn">🔊</button>
        </div>
    </header>

    <main class="layout">

        <section class="game-card">

            <div class="player">
                <div class="player-info">
                    <div class="avatar">🤖</div>
                    <div>
                        <div class="player-name" id="blackName">Nova AI</div>
                        <div class="player-status">Black</div>
                    </div>
                </div>
                <div class="clock" id="blackClock">10:00</div>
            </div>

            <div class="board-wrap">
                <div class="board" id="board"></div>
            </div>

            <div class="player">
                <div class="player-info">
                    <div class="avatar">♟</div>
                    <div>
                        <div class="player-name">You</div>
                        <div class="player-status">White</div>
                    </div>
                </div>
                <div class="clock active" id="whiteClock">10:00</div>
            </div>

            <div class="bottom-tools">
                <button class="btn" id="undoBtn">↶ Undo</button>
                <button class="btn primary" id="restartBtn">↻ New Game</button>
                <button class="btn" id="flipBtn">⇅ Flip</button>
            </div>

        </section>

        <aside class="sidebar">

            <div class="panel">

                <div class="status" id="status">
                    Your turn — make a move
                </div>

                <div class="panel-title">
                    <h2>Game Mode</h2>
                    <span class="badge">LIVE</span>
                </div>

                <div class="mode-select">
                    <button class="mode active" data-mode="ai">VS COMPUTER</button>
                    <button class="mode" data-mode="local">2 PLAYERS</button>
                </div>

            </div>

            <div class="panel">

                <div class="panel-title">
                    <h2>Move History</h2>
                    <span class="badge" id="moveCount">0 MOVES</span>
                </div>

                <div class="moves" id="moves"></div>

            </div>

            <div class="panel">

                <div class="panel-title">
                    <h2>Captured Pieces</h2>
                </div>

                <div class="captured" id="capturedWhite"></div>
                <div style="height:6px"></div>
                <div class="captured" id="capturedBlack"></div>

            </div>

            <div class="panel">

                <div class="panel-title">
                    <h2>Game Stats</h2>
                </div>

                <div class="stats">
                    <div class="stat">
                        <strong id="statMoves">0</strong>
                        <span>MOVES</span>
                    </div>
                    <div class="stat">
                        <strong id="statCaptures">0</strong>
                        <span>CAPTURES</span>
                    </div>
                    <div class="stat">
                        <strong id="statChecks">0</strong>
                        <span>CHECKS</span>
                    </div>
                </div>

            </div>

        </aside>

    </main>
</div>

<div class="modal" id="gameModal">
    <div class="modal-box">
        <h2 id="modalTitle">Game Over</h2>
        <p id="modalText"></p>
        <button class="btn primary" id="modalRestart">Play Again</button>
    </div>
</div>

<div class="modal" id="promotionModal">
    <div class="modal-box">
        <h2>Choose Promotion</h2>
        <p>Choose what your pawn should become.</p>
        <div class="promotion">
            <button class="promo" data-piece="q">♛</button>
            <button class="promo" data-piece="r">♜</button>
            <button class="promo" data-piece="b">♝</button>
            <button class="promo" data-piece="n">♞</button>
        </div>
    </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* =========================================================
   NOVA CHESS ENGINE
   ========================================================= */

const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const statusEl = document.getElementById("status");
const capturedWhiteEl = document.getElementById("capturedWhite");
const capturedBlackEl = document.getElementById("capturedBlack");

const whiteClockEl = document.getElementById("whiteClock");
const blackClockEl = document.getElementById("blackClock");

const PIECES = {
    w:{
        k:"♔",
        q:"♕",
        r:"♖",
        b:"♗",
        n:"♘",
        p:"♙"
    },
    b:{
        k:"♚",
        q:"♛",
        r:"♜",
        b:"♝",
        n:"♞",
        p:"♟"
    }
};

const VALUES = {
    p:100,
    n:320,
    b:330,
    r:500,
    q:900,
    k:20000
};

const files = ["a","b","c","d","e","f","g","h"];

let board;
let turn = "w";
let selected = null;
let legalMoves = [];
let history = [];
let snapshots = [];
let captured = {w:[],b:[]};
let mode = "ai";
let flipped = false;
let soundOn = true;
let gameOver = false;
let promotionResolve = null;

let clocks = {
    w:600,
    b:600
};

let timer = null;
let checks = 0;


/* =========================================================
   START POSITION
   ========================================================= */

function createInitialBoard(){

    const b = Array.from({length:8},()=>Array(8).fill(null));

    const back = ["r","n","b","q","k","b","n","r"];

    for(let x=0;x<8;x++){
        b[0][x] = {c:"b",p:back[x]};
        b[1][x] = {c:"b",p:"p"};

        b[6][x] = {c:"w",p:"p"};
        b[7][x] = {c:"w",p:back[x]};
    }

    return b;
}

board = createInitialBoard();


/* =========================================================
   DRAW BOARD
   ========================================================= */

function drawBoard(){

    boardEl.innerHTML="";

    for(let displayRow=0;displayRow<8;displayRow++){

        for(let displayCol=0;displayCol<8;displayCol++){

            const r = flipped ? 7-displayRow : displayRow;
            const c = flipped ? 7-displayCol : displayCol;

            const square = document.createElement("div");

            square.className =
                "square " +
                ((r+c)%2===0 ? "light":"dark");

            square.dataset.r=r;
            square.dataset.c=c;

            const piece = board[r][c];

            if(selected &&
               selected.r===r &&
               selected.c===c){

                square.classList.add("selected");
            }

            if(lastMove &&
               ((lastMove.from.r===r && lastMove.from.c===c) ||
                (lastMove.to.r===r && lastMove.to.c===c))){

                square.classList.add("last");
            }

            if(piece &&
               piece.p==="k" &&
               piece.c===turn &&
               isInCheck(board,turn)){

                square.classList.add("check");
            }

            const possible = legalMoves.find(m=>m.r===r&&m.c===c);

            if(possible){

                if(board[r][c]){
                    const ring=document.createElement("div");
                    ring.className="capture-ring";
                    square.appendChild(ring);
                }else{
                    const dot=document.createElement("div");
                    dot.className="move-dot";
                    square.appendChild(dot);
                }
            }

            if(piece){

                const span=document.createElement("span");

                span.className =
                    "piece " +
                    (piece.c==="w" ? "white-piece":"black-piece");

                span.textContent=PIECES[piece.c][piece.p];

                square.appendChild(span);
            }

            if(displayCol===0){

                const coord=document.createElement("span");
                coord.className="coord rank";
                coord.textContent=8-r;
                square.appendChild(coord);
            }

            if(displayRow===7){

                const coord=document.createElement("span");
                coord.className="coord file";
                coord.textContent=files[c];
                square.appendChild(coord);
            }

            square.addEventListener("click",()=>clickSquare(r,c));

            boardEl.appendChild(square);
        }
    }

    updateUI();
}


/* =========================================================
   MOVE GENERATION
   ========================================================= */

function cloneBoard(b){
    return b.map(row=>row.map(p=>p?{...p}:null));
}

function inside(r,c){
    return r>=0 && r<8 && c>=0 && c<8;
}

function opponent(c){
    return c==="w" ? "b":"w";
}

function findKing(b,color){

    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){

            if(
                b[r][c] &&
                b[r][c].c===color &&
                b[r][c].p==="k"
            ){
                return {r,c};
            }
        }
    }

    return null;
}

function squareAttacked(b,r,c,byColor){

    const pawnDir = byColor==="w" ? -1:1;

    for(const dc of [-1,1]){

        const rr=r-pawnDir;
        const cc=c-dc;

        if(inside(rr,cc) &&
           b[rr][cc] &&
           b[rr][cc].c===byColor &&
           b[rr][cc].p==="p"){

            return true;
        }
    }

    const knightMoves=[
        [-2,-1],[-2,1],[-1,-2],[-1,2],
        [1,-2],[1,2],[2,-1],[2,1]
    ];

    for(const [dr,dc] of knightMoves){

        const rr=r+dr;
        const cc=c+dc;

        if(
            inside(rr,cc) &&
            b[rr][cc] &&
            b[rr][cc].c===byColor &&
            b[rr][cc].p==="n"
        ){
            return true;
        }
    }

    const diag=[
        [-1,-1],[-1,1],[1,-1],[1,1]
    ];

    for(const [dr,dc] of diag){

        let rr=r+dr;
        let cc=c+dc;

        while(inside(rr,cc)){

            const p=b[rr][cc];

            if(p){

                if(
                    p.c===byColor &&
                    (p.p==="b" || p.p==="q")
                ){
                    return true;
                }

                break;
            }

            rr+=dr;
            cc+=dc;
        }
    }

    const straight=[
        [-1,0],[1,0],[0,-1],[0,1]
    ];

    for(const [dr,dc] of straight){

        let rr=r+dr;
        let cc=c+dc;

        while(inside(rr,cc)){

            const p=b[rr][cc];

            if(p){

                if(
                    p.c===byColor &&
                    (p.p==="r" || p.p==="q")
                ){
                    return true;
                }

                break;
            }

            rr+=dr;
            cc+=dc;
        }
    }

    for(let dr=-1;dr<=1;dr++){
        for(let dc=-1;dc<=1;dc++){

            if(dr===0 && dc===0) continue;

            const rr=r+dr;
            const cc=c+dc;

            if(
                inside(rr,cc) &&
                b[rr][cc] &&
                b[rr][cc].c===byColor &&
                b[rr][cc].p==="k"
            ){
                return true;
            }
        }
    }

    return false;
}

function isInCheck(b,color){

    const king=findKing(b,color);

    if(!king) return true;

    return squareAttacked(
        b,
        king.r,
        king.c,
        opponent(color)
    );
}


/* =========================================================
   PSEUDO MOVES
   ========================================================= */

function pseudoMoves(b,r,c){

    const piece=b[r][c];

    if(!piece) return [];

    const moves=[];
    const color=piece.c;

    const add=(rr,cc,extra={})=>{

        if(!inside(rr,cc)) return;

        if(
            !b[rr][cc] ||
            b[rr][cc].c!==color
        ){

            moves.push({
                r:rr,
                c:cc,
                ...extra
            });
        }
    };

    if(piece.p==="p"){

        const dir=color==="w" ? -1:1;
        const start=color==="w" ? 6:1;

        if(
            inside(r+dir,c) &&
            !b[r+dir][c]
        ){

            moves.push({
                r:r+dir,
                c,
                promotion:
                    r+dir===0 ||
                    r+dir===7
            });

            if(
                r===start &&
                !b[r+dir*2][c]
            ){

                moves.push({
                    r:r+dir*2,
                    c
                });
            }
        }

        for(const dc of [-1,1]){

            const rr=r+dir;
            const cc=c+dc;

            if(
                inside(rr,cc) &&
                b[rr][cc] &&
                b[rr][cc].c!==color
            ){

                moves.push({
                    r:rr,
                    c:cc,
                    promotion:
                        rr===0 ||
                        rr===7
                });
            }
        }

        // En passant
        if(lastMove &&
           lastMove.piece &&
           lastMove.piece.p==="p" &&
           Math.abs(lastMove.from.r-lastMove.to.r)===2 &&
           lastMove.to.r===r &&
           Math.abs(lastMove.to.c-c)===1){

            moves.push({
                r:r+dir,
                c:lastMove.to.c,
                enPassant:true
            });
        }
    }

    if(piece.p==="n"){

        const arr=[
            [-2,-1],[-2,1],[-1,-2],[-1,2],
            [1,-2],[1,2],[2,-1],[2,1]
        ];

        arr.forEach(([dr,dc])=>add(r+dr,c+dc));
    }

    if(piece.p==="b" || piece.p==="q"){

        const dirs=[
            [-1,-1],[-1,1],[1,-1],[1,1]
        ];

        for(const [dr,dc] of dirs){

            let rr=r+dr;
            let cc=c+dc;

            while(inside(rr,cc)){

                if(!b[rr][cc]){

                    moves.push({r:rr,c:cc});

                }else{

                    if(b[rr][cc].c!==color){
                        moves.push({r:rr,c:cc});
                    }

                    break;
                }

                rr+=dr;
                cc+=dc;
            }
        }
    }

    if(piece.p==="r" || piece.p==="q"){

        const dirs=[
            [-1,0],[1,0],[0,-1],[0,1]
        ];

        for(const [dr,dc] of dirs){

            let rr=r+dr;
            let cc=c+dc;

            while(inside(rr,cc)){

                if(!b[rr][cc]){

                    moves.push({r:rr,c:cc});

                }else{

                    if(b[rr][cc].c!==color){
                        moves.push({r:rr,c:cc});
                    }

                    break;
                }

                rr+=dr;
                cc+=dc;
            }
        }
    }

    if(piece.p==="k"){

        for(let dr=-1;dr<=1;dr++){

            for(let dc=-1;dc<=1;dc++){

                if(dr===0 && dc===0) continue;

                add(r+dr,c+dc);
            }
        }

        // Castling
        if(!piece.moved && !isInCheck(b,color)){

            // King side
            if(
                b[r][7] &&
                b[r][7].p==="r" &&
                b[r][7].c===color &&
                !b[r][5] &&
                !b[r][6] &&
                !b[r][7].moved &&
                !squareAttacked(b,r,5,opponent(color)) &&
                !squareAttacked(b,r,6,opponent(color))
            ){

                moves.push({
                    r,
                    c:6,
                    castle:"king"
                });
            }

            // Queen side
            if(
                b[r][0] &&
                b[r][0].p==="r" &&
                b[r][0].c===color &&
                !b[r][1] &&
                !b[r][2] &&
                !b[r][3] &&
                !b[r][0].moved &&
                !squareAttacked(b,r,3,opponent(color)) &&
                !squareAttacked(b,r,2,opponent(color))
            ){

                moves.push({
                    r,
                    c:2,
                    castle:"queen"
                });
            }
        }
    }

    return moves;
}


/* =========================================================
   LEGAL MOVES
   ========================================================= */

function applyMoveToBoard(b,from,move,promotion="q"){

    const nb=cloneBoard(b);

    const piece=nb[from.r][from.c];

    nb[from.r][from.c]=null;

    if(move.enPassant){

        nb[from.r][move.c]=null;
    }

    nb[move.r][move.c]={
        ...piece,
        moved:true
    };

    if(move.promotion){

        nb[move.r][move.c].p=promotion;
    }

    if(move.castle==="king"){

        const rook=nb[from.r][7];

        nb[from.r][7]=null;

        nb[from.r][5]={
            ...rook,
            moved:true
        };
    }

    if(move.castle==="queen"){

        const rook=nb[from.r][0];

        nb[from.r][0]=null;

        nb[from.r][3]={
            ...rook,
            moved:true
        };
    }

    return nb;
}

function legalMovesForPiece(b,r,c){

    const piece=b[r][c];

    if(!piece) return [];

    const pseudo=pseudoMoves(b,r,c);
    const legal=[];

    for(const move of pseudo){

        const nb=applyMoveToBoard(
            b,
            {r,c},
            move
        );

        if(!isInCheck(nb,piece.c)){
            legal.push(move);
        }
    }

    return legal;
}

function allLegalMoves(b,color){

    const result=[];

    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){

            if(
                b[r][c] &&
                b[r][c].c===color
            ){

                for(const m of legalMovesForPiece(b,r,c)){

                    result.push({
                        from:{r,c},
                        ...m
                    });
                }
            }
        }
    }

    return result;
}


/* =========================================================
   CLICK HANDLING
   ========================================================= */

function clickSquare(r,c){

    if(gameOver) return;

    if(mode==="ai" && turn==="b") return;

    const piece=board[r][c];

    if(selected){

        const move=legalMoves.find(
            m=>m.r===r && m.c===c
        );

        if(move){

            if(move.promotion){

                openPromotion(selected,move);

            }else{

                makeMove(selected,move);
            }

            return;
        }

        if(
            piece &&
            piece.c===turn
        ){

            selected={r,c};
            legalMoves=legalMovesForPiece(board,r,c);
            drawBoard();
            return;
        }

        selected=null;
        legalMoves=[];
        drawBoard();
        return;
    }

    if(
        piece &&
        piece.c===turn
    ){

        selected={r,c};
        legalMoves=legalMovesForPiece(board,r,c);
        drawBoard();
    }
}


/* =========================================================
   MAKE MOVE
   ========================================================= */

let lastMove=null;

function makeMove(from,move,promotion="q"){

    snapshots.push({
        board:cloneBoard(board),
        turn,
        captured:JSON.parse(JSON.stringify(captured)),
        history:[...history],
        clocks:{...clocks},
        checks
    });

    const movingPiece=board[from.r][from.c];

    const capturedPiece =
        move.enPassant
        ? board[from.r][move.c]
        : board[move.r][move.c];

    if(capturedPiece){

        captured[movingPiece.c].push(
            capturedPiece
        );
    }

    board=applyMoveToBoard(
        board,
        from,
        move,
        promotion
    );

    lastMove={
        from:{...from},
        to:{r:move.r,c:move.c},
        piece:{...movingPiece}
    };

    const notation=createNotation(
        from,
        move,
        movingPiece,
        capturedPiece,
        promotion
    );

    history.push({
        color:movingPiece.c,
        notation
    });

    if(isInCheck(board,opponent(turn))){

        checks++;
        playSound("check");
    }else{

        playSound(capturedPiece ? "capture":"move");
    }

    selected=null;
    legalMoves=[];

    turn=opponent(turn);

    updateUI();
    drawBoard();

    checkGameState();

    if(
        !gameOver &&
        mode==="ai" &&
        turn==="b"
    ){

        statusEl.textContent="Nova AI is thinking…";

        setTimeout(aiMove,450);
    }
}


/* =========================================================
   NOTATION
   ========================================================= */

function createNotation(
    from,
    move,
    piece,
    capturedPiece,
    promotion
){

    if(move.castle==="king") return "O-O";
    if(move.castle==="queen") return "O-O-O";

    let text="";

    if(piece.p!=="p"){
        text+=piece.p.toUpperCase();
    }

    if(capturedPiece){

        if(piece.p==="p"){
            text+=files[from.c];
        }

        text+="x";
    }

    text+=files[move.c]+(8-move.r);

    if(move.promotion){

        text+="="+promotion.toUpperCase();
    }

    return text;
}


/* =========================================================
   GAME STATE
   ========================================================= */

function checkGameState(){

    const moves=allLegalMoves(board,turn);
    const check=isInCheck(board,turn);

    if(moves.length===0){

        gameOver=true;

        if(check){

            const winner=turn==="w" ? "Black":"White";

            statusEl.textContent=
                "Checkmate — "+winner+" wins!";

            showGameModal(
                "♚ Checkmate!",
                winner+" wins the game."
            );

        }else{

            statusEl.textContent="Draw — stalemate.";

            showGameModal(
                "½ Stalemate",
                "The game ends in a draw."
            );
        }

        playSound("gameover");
        return;
    }

    if(check){

        statusEl.textContent=
            turn==="w"
            ? "⚠️ Check! Your king is under attack."
            : "⚠️ Check!";

    }else{

        if(mode==="local"){

            statusEl.textContent=
                turn==="w"
                ? "White's turn"
                : "Black's turn";

        }else{

            statusEl.textContent=
                turn==="w"
                ? "Your turn — make a move"
                : "Nova AI's turn";
        }
    }
}


/* =========================================================
   UI
   ========================================================= */

function updateUI(){

    renderMoves();
    renderCaptured();

    document.getElementById("moveCount").textContent =
        history.length+" MOVES";

    document.getElementById("statMoves").textContent =
        history.length;

    document.getElementById("statCaptures").textContent =
        captured.w.length+captured.b.length;

    document.getElementById("statChecks").textContent =
        checks;

    whiteClockEl.textContent=formatTime(clocks.w);
    blackClockEl.textContent=formatTime(clocks.b);

    whiteClockEl.classList.toggle(
        "active",
        turn==="w" && !gameOver
    );

    blackClockEl.classList.toggle(
        "active",
        turn==="b" && !gameOver
    );

    whiteClockEl.classList.toggle(
        "danger",
        clocks.w<=30
    );

    blackClockEl.classList.toggle(
        "danger",
        clocks.b<=30
    );
}

function renderMoves(){

    movesEl.innerHTML="";

    for(let i=0;i<history.length;i+=2){

        const row=document.createElement("div");

        row.className="move-row";

        const num=document.createElement("div");
        num.className="move-number";
        num.textContent=(i/2+1)+".";

        const white=document.createElement("div");
        white.textContent=history[i]?.notation || "";

        const black=document.createElement("div");
        black.textContent=history[i+1]?.notation || "";

        row.append(num,white,black);

        movesEl.appendChild(row);
    }

    movesEl.scrollTop=movesEl.scrollHeight;
}

function renderCaptured(){

    capturedWhiteEl.innerHTML =
        captured.w
        .map(p=>PIECES[p.c][p.p])
        .join("");

    capturedBlackEl.innerHTML =
        captured.b
        .map(p=>PIECES[p.c][p.p])
        .join("");
}

function formatTime(sec){

    sec=Math.max(0,Math.ceil(sec));

    const m=Math.floor(sec/60);
    const s=sec%60;

    return String(m).padStart(2,"0")+
        ":"+
        String(s).padStart(2,"0");
}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer(){

    clearInterval(timer);

    timer=setInterval(()=>{

        if(gameOver) return;

        clocks[turn]-=.1;

        if(clocks[turn]<=0){

            clocks[turn]=0;
            gameOver=true;

            const winner=turn==="w" ? "Black":"White";

            showGameModal(
                "⏱ Time!",
                winner+" wins on time."
            );

            playSound("gameover");
        }

        updateUI();

    },100);
}


/* =========================================================
   UNDO
   ========================================================= */

function undoMove(){

    if(!snapshots.length || gameOver) return;

    if(mode==="ai" && turn==="b") return;

    let snap=snapshots.pop();

    board=snap.board;
    turn=snap.turn;
    captured=snap.captured;
    history=snap.history;
    clocks=snap.clocks;
    checks=snap.checks;

    lastMove=null;

    if(mode==="ai" && snapshots.length){

        snap=snapshots.pop();

        board=snap.board;
        turn=snap.turn;
        captured=snap.captured;
        history=snap.history;
        clocks=snap.clocks;
        checks=snap.checks;
    }

    selected=null;
    legalMoves=[];

    drawBoard();
    checkGameState();
}


/* =========================================================
   RESET
   ========================================================= */

function newGame(){

    board=createInitialBoard();
    turn="w";
    selected=null;
    legalMoves=[];
    history=[];
    snapshots=[];
    captured={w:[],b:[]};
    lastMove=null;
    clocks={w:600,b:600};
    gameOver=false;
    checks=0;

    document.getElementById("gameModal")
        .classList.remove("show");

    statusEl.textContent =
        mode==="ai"
        ? "Your turn — make a move"
        : "White's turn";

    drawBoard();
    startTimer();
}


/* =========================================================
   PROMOTION
   ========================================================= */

function openPromotion(from,move){

    const modal=
        document.getElementById("promotionModal");

    modal.classList.add("show");

    promotionResolve=(piece)=>{

        modal.classList.remove("show");

        makeMove(
            from,
            move,
            piece
        );

        promotionResolve=null;
    };
}

document.querySelectorAll(".promo")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(promotionResolve){

            promotionResolve(
                btn.dataset.piece
            );
        }
    });
});


/* =========================================================
   AI
   ========================================================= */

function evaluateBoard(b){

    let score=0;

    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){

            const p=b[r][c];

            if(!p) continue;

            let value=VALUES[p.p];

            // Small positional bonus
            const center =
                3.5-Math.abs(3.5-r)+
                3.5-Math.abs(3.5-c);

            if(p.p==="p") value+=center*3;
            if(p.p==="n") value+=center*5;
            if(p.p==="b") value+=center*3;

            score += p.c==="b" ? value:-value;
        }
    }

    return score;
}

function minimax(b,depth,alpha,beta,maximizing){

    if(depth===0){
        return evaluateBoard(b);
    }

    const color=maximizing ? "b":"w";
    const moves=allLegalMoves(b,color);

    if(moves.length===0){

        if(isInCheck(b,color)){
            return maximizing ? 999999:-999999;
        }

        return 0;
    }

    if(maximizing){

        let best=-Infinity;

        for(const move of moves){

            const nb=applyMoveToBoard(
                b,
                move.from,
                move
            );

            const score=minimax(
                nb,
                depth-1,
                alpha,
                beta,
                false
            );

            best=Math.max(best,score);

            alpha=Math.max(alpha,score);

            if(beta<=alpha) break;
        }

        return best;

    }else{

        let best=Infinity;

        for(const move of moves){

            const nb=applyMoveToBoard(
                b,
                move.from,
                move
            );

            const score=minimax(
                nb,
                depth-1,
                alpha,
                beta,
                true
            );

            best=Math.min(best,score);

            beta=Math.min(beta,score);

            if(beta<=alpha) break;
        }

        return best;
    }
}

function aiMove(){

    if(
        gameOver ||
        mode!=="ai" ||
        turn!=="b"
    ) return;

    const moves=allLegalMoves(board,"b");

    if(!moves.length){

        checkGameState();
        return;
    }

    let bestScore=-Infinity;
    let bestMoves=[];

    // Depth 2 gives a decent mobile-friendly opponent.
    const depth=2;

    for(const move of moves){

        const nb=applyMoveToBoard(
            board,
            move.from,
            move
        );

        const score=minimax(
            nb,
            depth-1,
            -Infinity,
            Infinity,
            false
        );

        // Slight randomness among equal moves
        if(score>bestScore){

            bestScore=score;
            bestMoves=[move];

        }else if(score===bestScore){

            bestMoves.push(move);
        }
    }

    const chosen=
        bestMoves[
            Math.floor(
                Math.random()*bestMoves.length
            )
        ];

    if(chosen.promotion){

        makeMove(
            chosen.from,
            chosen,
            "q"
        );

    }else{

        makeMove(
            chosen.from,
            chosen
        );
    }
}


/* =========================================================
   SOUND
   ========================================================= */

let audioCtx=null;

function playSound(type){

    if(!soundOn) return;

    try{

        if(!audioCtx){

            audioCtx=
                new (window.AudioContext ||
                window.webkitAudioContext)();
        }

        const osc=audioCtx.createOscillator();
        const gain=audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now=audioCtx.currentTime;

        let freq=420;

        if(type==="capture") freq=280;
        if(type==="check") freq=650;
        if(type==="gameover") freq=180;

        osc.frequency.value=freq;
        osc.type="sine";

        gain.gain.setValueAtTime(.0001,now);
        gain.gain.exponentialRampToValueAtTime(
            .08,
            now+.01
        );

        gain.gain.exponentialRampToValueAtTime(
            .0001,
            now+.13
        );

        osc.start(now);
        osc.stop(now+.14);

    }catch(e){}
}


/* =========================================================
   MODAL
   ========================================================= */

function showGameModal(title,text){

    document.getElementById("modalTitle")
        .textContent=title;

    document.getElementById("modalText")
        .textContent=text;

    document.getElementById("gameModal")
        .classList.add("show");
}


/* =========================================================
   BUTTONS
   ========================================================= */

document.getElementById("restartBtn")
.addEventListener("click",newGame);

document.getElementById("modalRestart")
.addEventListener("click",newGame);

document.getElementById("undoBtn")
.addEventListener("click",undoMove);

document.getElementById("flipBtn")
.addEventListener("click",()=>{

    flipped=!flipped;

    drawBoard();
});

document.getElementById("themeBtn")
.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    document.getElementById("themeBtn")
        .textContent=
        document.body.classList.contains("light")
        ? "🌙"
        : "☀️";
});

document.getElementById("soundBtn")
.addEventListener("click",()=>{

    soundOn=!soundOn;

    document.getElementById("soundBtn")
        .textContent=soundOn ? "🔊":"🔇";
});

document.querySelectorAll(".mode")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".mode")
            .forEach(x=>x.classList.remove("active"));

        btn.classList.add("active");

        mode=btn.dataset.mode;

        document.getElementById("blackName")
            .textContent=
            mode==="ai"
            ? "Nova AI"
            : "Player 2";

        newGame();
    });
});


/* =========================================================
   INITIALIZE
   ========================================================= */

drawBoard();
startTimer();

</script>

</body>
</html>id<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Nova Chess</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

:root{
    --bg:#070a12;
    --panel:#101522;
    --panel2:#151b2b;
    --text:#f5f7ff;
    --muted:#8992a8;
    --accent:#7c5cff;
    --accent2:#00d4ff;
    --light:#e8edf5;
    --dark:#657087;
    --selected:#f6d365;
    --possible:rgba(80,220,130,.75);
    --danger:#ff5364;
    --shadow:0 25px 70px rgba(0,0,0,.45);
}

body.light{
    --bg:#eef2f8;
    --panel:#ffffff;
    --panel2:#f4f6fb;
    --text:#151927;
    --muted:#667085;
    --shadow:0 20px 60px rgba(40,50,80,.15);
}

body{
    min-height:100vh;
    background:
        radial-gradient(circle at 10% 10%,rgba(124,92,255,.18),transparent 30%),
        radial-gradient(circle at 90% 80%,rgba(0,212,255,.12),transparent 30%),
        var(--bg);
    color:var(--text);
    font-family:Inter,Arial,sans-serif;
    transition:.3s;
}

.app{
    width:min(1400px,100%);
    margin:auto;
    padding:20px;
}

.topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:22px;
    gap:15px;
}

.brand{
    display:flex;
    align-items:center;
    gap:13px;
}

.logo{
    width:50px;
    height:50px;
    display:grid;
    place-items:center;
    border-radius:16px;
    background:linear-gradient(135deg,var(--accent),var(--accent2));
    box-shadow:0 10px 30px rgba(124,92,255,.3);
    font-size:28px;
}

.brand h1{
    font-size:23px;
    font-weight:800;
}

.brand span{
    color:var(--muted);
    font-size:12px;
}

.top-actions{
    display:flex;
    gap:8px;
}

.icon-btn,.btn{
    border:0;
    cursor:pointer;
    color:var(--text);
    background:var(--panel);
    border:1px solid rgba(255,255,255,.08);
    transition:.2s;
}

.icon-btn{
    width:45px;
    height:45px;
    border-radius:14px;
    font-size:20px;
}

.icon-btn:hover,.btn:hover{
    transform:translateY(-2px);
    border-color:var(--accent);
}

.layout{
    display:grid;
    grid-template-columns:minmax(300px,760px) 340px;
    gap:24px;
    justify-content:center;
    align-items:start;
}

.game-card{
    background:rgba(16,21,34,.8);
    border:1px solid rgba(255,255,255,.07);
    border-radius:25px;
    padding:18px;
    box-shadow:var(--shadow);
    backdrop-filter:blur(20px);
}

body.light .game-card{
    background:rgba(255,255,255,.82);
}

.player{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:9px 5px 14px;
}

.player-info{
    display:flex;
    align-items:center;
    gap:11px;
}

.avatar{
    width:39px;
    height:39px;
    border-radius:13px;
    display:grid;
    place-items:center;
    background:linear-gradient(135deg,#242b3d,#111624);
    font-size:21px;
}

.player-name{
    font-size:14px;
    font-weight:700;
}

.player-status{
    color:var(--muted);
    font-size:11px;
    margin-top:3px;
}

.clock{
    min-width:92px;
    text-align:center;
    background:var(--panel2);
    padding:9px 13px;
    border-radius:12px;
    font-weight:800;
    font-size:17px;
    letter-spacing:1px;
}

.clock.active{
    background:linear-gradient(135deg,var(--accent),#6043e8);
    color:white;
}

.clock.danger{
    background:var(--danger);
    color:white;
}

.board-wrap{
    width:100%;
    max-width:720px;
    margin:auto;
    aspect-ratio:1;
    border-radius:15px;
    overflow:hidden;
    box-shadow:
        0 15px 50px rgba(0,0,0,.35),
        0 0 0 5px rgba(255,255,255,.03);
}

.board{
    width:100%;
    height:100%;
    display:grid;
    grid-template-columns:repeat(8,1fr);
    grid-template-rows:repeat(8,1fr);
}

.square{
    position:relative;
    display:grid;
    place-items:center;
    cursor:pointer;
    user-select:none;
    -webkit-user-select:none;
    transition:filter .12s;
}

.square.light{
    background:#e9edf3;
}

.square.dark{
    background:#667188;
}

.square:hover{
    filter:brightness(1.08);
}

.piece{
    position:relative;
    z-index:3;
    font-family:"Times New Roman",serif;
    font-size:clamp(32px,7vw,67px);
    line-height:1;
    transition:transform .12s;
    text-shadow:
        0 2px 2px rgba(0,0,0,.3),
        0 5px 12px rgba(0,0,0,.15);
}

.white-piece{
    color:#fff;
    -webkit-text-stroke:1px #555;
}

.black-piece{
    color:#171b25;
    -webkit-text-stroke:1px #000;
}

.square.selected{
    box-shadow:inset 0 0 0 5px rgba(246,211,101,.85);
}

.square.last{
    background:#b7a449 !important;
}

.square.check{
    background:radial-gradient(circle,#ff5364 0%,#9b2c3b 45%,inherit 75%) !important;
}

.move-dot{
    position:absolute;
    width:20%;
    height:20%;
    border-radius:50%;
    background:rgba(30,100,50,.55);
    z-index:2;
}

.capture-ring{
    position:absolute;
    width:78%;
    height:78%;
    border:6px solid rgba(220,60,70,.6);
    border-radius:50%;
    z-index:2;
}

.coord{
    position:absolute;
    font-size:10px;
    font-weight:700;
    opacity:.7;
    z-index:4;
}

.rank{
    left:5px;
    top:4px;
}

.file{
    right:5px;
    bottom:3px;
}

.light .coord{
    color:#667188;
}

.dark .coord{
    color:#e9edf3;
}

.bottom-tools{
    display:flex;
    gap:9px;
    margin-top:15px;
}

.btn{
    flex:1;
    padding:12px 15px;
    border-radius:13px;
    font-weight:700;
    font-size:13px;
}

.btn.primary{
    background:linear-gradient(135deg,var(--accent),#6043e8);
    color:#fff;
    border:0;
}

.btn.danger{
    color:#ff7582;
}

.sidebar{
    display:flex;
    flex-direction:column;
    gap:15px;
}

.panel{
    background:rgba(16,21,34,.8);
    border:1px solid rgba(255,255,255,.07);
    border-radius:22px;
    padding:18px;
    box-shadow:var(--shadow);
    backdrop-filter:blur(20px);
}

body.light .panel{
    background:rgba(255,255,255,.82);
}

.panel-title{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}

.panel-title h2{
    font-size:15px;
}

.badge{
    font-size:10px;
    padding:5px 8px;
    border-radius:7px;
    background:rgba(124,92,255,.15);
    color:#a898ff;
}

.moves{
    height:310px;
    overflow-y:auto;
    padding-right:4px;
}

.moves::-webkit-scrollbar{
    width:5px;
}

.moves::-webkit-scrollbar-thumb{
    background:#333b50;
    border-radius:10px;
}

.move-row{
    display:grid;
    grid-template-columns:35px 1fr 1fr;
    padding:9px 7px;
    border-radius:9px;
    font-size:13px;
}

.move-row:nth-child(even){
    background:rgba(255,255,255,.025);
}

.move-number{
    color:var(--muted);
}

.captured{
    display:flex;
    flex-wrap:wrap;
    gap:1px;
    min-height:29px;
    font-size:21px;
}

.stats{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:8px;
}

.stat{
    background:var(--panel2);
    border-radius:12px;
    padding:11px;
    text-align:center;
}

.stat strong{
    display:block;
    font-size:17px;
}

.stat span{
    display:block;
    color:var(--muted);
    font-size:9px;
    margin-top:3px;
}

.mode-select{
    display:flex;
    gap:7px;
}

.mode{
    flex:1;
    padding:10px 5px;
    border:1px solid rgba(255,255,255,.07);
    background:var(--panel2);
    color:var(--muted);
    border-radius:11px;
    cursor:pointer;
    font-weight:700;
    font-size:11px;
}

.mode.active{
    background:var(--accent);
    color:white;
}

.status{
    text-align:center;
    font-size:13px;
    font-weight:700;
    padding:9px;
    border-radius:10px;
    background:var(--panel2);
    margin-bottom:12px;
}

.modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.72);
    display:none;
    place-items:center;
    z-index:20;
    backdrop-filter:blur(10px);
}

.modal.show{
    display:grid;
}

.modal-box{
    width:min(420px,90%);
    background:var(--panel);
    border:1px solid rgba(255,255,255,.1);
    border-radius:24px;
    padding:25px;
    text-align:center;
    box-shadow:var(--shadow);
}

.modal-box h2{
    font-size:25px;
    margin-bottom:8px;
}

.modal-box p{
    color:var(--muted);
    font-size:13px;
    margin-bottom:20px;
}

.promotion{
    display:flex;
    justify-content:center;
    gap:10px;
}

.promo{
    width:62px;
    height:62px;
    border:0;
    border-radius:15px;
    background:var(--panel2);
    font-size:40px;
    cursor:pointer;
}

.promo:hover{
    background:var(--accent);
}

.toast{
    position:fixed;
    left:50%;
    bottom:25px;
    transform:translate(-50%,20px);
    background:#171d2b;
    color:white;
    padding:12px 18px;
    border-radius:13px;
    opacity:0;
    pointer-events:none;
    transition:.25s;
    z-index:30;
    font-size:13px;
    font-weight:600;
}

.toast.show{
    opacity:1;
    transform:translate(-50%,0);
}

@media(max-width:1000px){
    .layout{
        grid-template-columns:minmax(300px,720px);
    }

    .sidebar{
        display:grid;
        grid-template-columns:1fr 1fr;
    }

    .panel:first-child{
        grid-column:span 2;
    }
}

@media(max-width:650px){
    .app{
        padding:10px;
    }

    .game-card{
        padding:10px;
        border-radius:18px;
    }

    .topbar{
        margin-bottom:10px;
    }

    .brand h1{
        font-size:19px;
    }

    .logo{
        width:42px;
        height:42px;
    }

    .sidebar{
        display:flex;
    }

    .panel:first-child{
        grid-column:auto;
    }

    .moves{
        height:200px;
    }

    .piece{
        font-size:clamp(29px,10vw,48px);
    }

    .clock{
        min-width:78px;
        font-size:14px;
    }
}
</style>
</head>

<body>

<div class="app">

    <header class="topbar">
        <div class="brand">
            <div class="logo">♞</div>
            <div>
                <h1>Nova Chess</h1>
                <span>Think. Move. Conquer.</span>
            </div>
        </div>

        <div class="top-actions">
            <button class="icon-btn" id="themeBtn">☀️</button>
            <button class="icon-btn" id="soundBtn">🔊</button>
        </div>
    </header>

    <main class="layout">

        <section class="game-card">

            <div class="player">
                <div class="player-info">
                    <div class="avatar">🤖</div>
                    <div>
                        <div class="player-name" id="blackName">Nova AI</div>
                        <div class="player-status">Black</div>
                    </div>
                </div>
                <div class="clock" id="blackClock">10:00</div>
            </div>

            <div class="board-wrap">
                <div class="board" id="board"></div>
            </div>

            <div class="player">
                <div class="player-info">
                    <div class="avatar">♟</div>
                    <div>
                        <div class="player-name">You</div>
                        <div class="player-status">White</div>
                    </div>
                </div>
                <div class="clock active" id="whiteClock">10:00</div>
            </div>

            <div class="bottom-tools">
                <button class="btn" id="undoBtn">↶ Undo</button>
                <button class="btn primary" id="restartBtn">↻ New Game</button>
                <button class="btn" id="flipBtn">⇅ Flip</button>
            </div>

        </section>

        <aside class="sidebar">

            <div class="panel">

                <div class="status" id="status">
                    Your turn — make a move
                </div>

                <div class="panel-title">
                    <h2>Game Mode</h2>
                    <span class="badge">LIVE</span>
                </div>

                <div class="mode-select">
                    <button class="mode active" data-mode="ai">VS COMPUTER</button>
                    <button class="mode" data-mode="local">2 PLAYERS</button>
                </div>

            </div>

            <div class="panel">

                <div class="panel-title">
                    <h2>Move History</h2>
                    <span class="badge" id="moveCount">0 MOVES</span>
                </div>

                <div class="moves" id="moves"></div>

            </div>

            <div class="panel">

                <div class="panel-title">
                    <h2>Captured Pieces</h2>
                </div>

                <div class="captured" id="capturedWhite"></div>
                <div style="height:6px"></div>
                <div class="captured" id="capturedBlack"></div>

            </div>

            <div class="panel">

                <div class="panel-title">
                    <h2>Game Stats</h2>
                </div>

                <div class="stats">
                    <div class="stat">
                        <strong id="statMoves">0</strong>
                        <span>MOVES</span>
                    </div>
                    <div class="stat">
                        <strong id="statCaptures">0</strong>
                        <span>CAPTURES</span>
                    </div>
                    <div class="stat">
                        <strong id="statChecks">0</strong>
                        <span>CHECKS</span>
                    </div>
                </div>

            </div>

        </aside>

    </main>
</div>

<div class="modal" id="gameModal">
    <div class="modal-box">
        <h2 id="modalTitle">Game Over</h2>
        <p id="modalText"></p>
        <button class="btn primary" id="modalRestart">Play Again</button>
    </div>
</div>

<div class="modal" id="promotionModal">
    <div class="modal-box">
        <h2>Choose Promotion</h2>
        <p>Choose what your pawn should become.</p>
        <div class="promotion">
            <button class="promo" data-piece="q">♛</button>
            <button class="promo" data-piece="r">♜</button>
            <button class="promo" data-piece="b">♝</button>
            <button class="promo" data-piece="n">♞</button>
        </div>
    </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* =========================================================
   NOVA CHESS ENGINE
   ========================================================= */

const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const statusEl = document.getElementById("status");
const capturedWhiteEl = document.getElementById("capturedWhite");
const capturedBlackEl = document.getElementById("capturedBlack");

const whiteClockEl = document.getElementById("whiteClock");
const blackClockEl = document.getElementById("blackClock");

const PIECES = {
    w:{
        k:"♔",
        q:"♕",
        r:"♖",
        b:"♗",
        n:"♘",
        p:"♙"
    },
    b:{
        k:"♚",
        q:"♛",
        r:"♜",
        b:"♝",
        n:"♞",
        p:"♟"
    }
};

const VALUES = {
    p:100,
    n:320,
    b:330,
    r:500,
    q:900,
    k:20000
};

const files = ["a","b","c","d","e","f","g","h"];

let board;
let turn = "w";
let selected = null;
let legalMoves = [];
let history = [];
let snapshots = [];
let captured = {w:[],b:[]};
let mode = "ai";
let flipped = false;
let soundOn = true;
let gameOver = false;
let promotionResolve = null;

let clocks = {
    w:600,
    b:600
};

let timer = null;
let checks = 0;


/* =========================================================
   START POSITION
   ========================================================= */

function createInitialBoard(){

    const b = Array.from({length:8},()=>Array(8).fill(null));

    const back = ["r","n","b","q","k","b","n","r"];

    for(let x=0;x<8;x++){
        b[0][x] = {c:"b",p:back[x]};
        b[1][x] = {c:"b",p:"p"};

        b[6][x] = {c:"w",p:"p"};
        b[7][x] = {c:"w",p:back[x]};
    }

    return b;
}

board = createInitialBoard();


/* =========================================================
   DRAW BOARD
   ========================================================= */

function drawBoard(){

    boardEl.innerHTML="";

    for(let displayRow=0;displayRow<8;displayRow++){

        for(let displayCol=0;displayCol<8;displayCol++){

            const r = flipped ? 7-displayRow : displayRow;
            const c = flipped ? 7-displayCol : displayCol;

            const square = document.createElement("div");

            square.className =
                "square " +
                ((r+c)%2===0 ? "light":"dark");

            square.dataset.r=r;
            square.dataset.c=c;

            const piece = board[r][c];

            if(selected &&
               selected.r===r &&
               selected.c===c){

                square.classList.add("selected");
            }

            if(lastMove &&
               ((lastMove.from.r===r && lastMove.from.c===c) ||
                (lastMove.to.r===r && lastMove.to.c===c))){

                square.classList.add("last");
            }

            if(piece &&
               piece.p==="k" &&
               piece.c===turn &&
               isInCheck(board,turn)){

                square.classList.add("check");
            }

            const possible = legalMoves.find(m=>m.r===r&&m.c===c);

            if(possible){

                if(board[r][c]){
                    const ring=document.createElement("div");
                    ring.className="capture-ring";
                    square.appendChild(ring);
                }else{
                    const dot=document.createElement("div");
                    dot.className="move-dot";
                    square.appendChild(dot);
                }
            }

            if(piece){

                const span=document.createElement("span");

                span.className =
                    "piece " +
                    (piece.c==="w" ? "white-piece":"black-piece");

                span.textContent=PIECES[piece.c][piece.p];

                square.appendChild(span);
            }

            if(displayCol===0){

                const coord=document.createElement("span");
                coord.className="coord rank";
                coord.textContent=8-r;
                square.appendChild(coord);
            }

            if(displayRow===7){

                const coord=document.createElement("span");
                coord.className="coord file";
                coord.textContent=files[c];
                square.appendChild(coord);
            }

            square.addEventListener("click",()=>clickSquare(r,c));

            boardEl.appendChild(square);
        }
    }

    updateUI();
}


/* =========================================================
   MOVE GENERATION
   ========================================================= */

function cloneBoard(b){
    return b.map(row=>row.map(p=>p?{...p}:null));
}

function inside(r,c){
    return r>=0 && r<8 && c>=0 && c<8;
}

function opponent(c){
    return c==="w" ? "b":"w";
}

function findKing(b,color){

    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){

            if(
                b[r][c] &&
                b[r][c].c===color &&
                b[r][c].p==="k"
            ){
                return {r,c};
            }
        }
    }

    return null;
}

function squareAttacked(b,r,c,byColor){

    const pawnDir = byColor==="w" ? -1:1;

    for(const dc of [-1,1]){

        const rr=r-pawnDir;
        const cc=c-dc;

        if(inside(rr,cc) &&
           b[rr][cc] &&
           b[rr][cc].c===byColor &&
           b[rr][cc].p==="p"){

            return true;
        }
    }

    const knightMoves=[
        [-2,-1],[-2,1],[-1,-2],[-1,2],
        [1,-2],[1,2],[2,-1],[2,1]
    ];

    for(const [dr,dc] of knightMoves){

        const rr=r+dr;
        const cc=c+dc;

        if(
            inside(rr,cc) &&
            b[rr][cc] &&
            b[rr][cc].c===byColor &&
            b[rr][cc].p==="n"
        ){
            return true;
        }
    }

    const diag=[
        [-1,-1],[-1,1],[1,-1],[1,1]
    ];

    for(const [dr,dc] of diag){

        let rr=r+dr;
        let cc=c+dc;

        while(inside(rr,cc)){

            const p=b[rr][cc];

            if(p){

                if(
                    p.c===byColor &&
                    (p.p==="b" || p.p==="q")
                ){
                    return true;
                }

                break;
            }

            rr+=dr;
            cc+=dc;
        }
    }

    const straight=[
        [-1,0],[1,0],[0,-1],[0,1]
    ];

    for(const [dr,dc] of straight){

        let rr=r+dr;
        let cc=c+dc;

        while(inside(rr,cc)){

            const p=b[rr][cc];

            if(p){

                if(
                    p.c===byColor &&
                    (p.p==="r" || p.p==="q")
                ){
                    return true;
                }

                break;
            }

            rr+=dr;
            cc+=dc;
        }
    }

    for(let dr=-1;dr<=1;dr++){
        for(let dc=-1;dc<=1;dc++){

            if(dr===0 && dc===0) continue;

            const rr=r+dr;
            const cc=c+dc;

            if(
                inside(rr,cc) &&
                b[rr][cc] &&
                b[rr][cc].c===byColor &&
                b[rr][cc].p==="k"
            ){
                return true;
            }
        }
    }

    return false;
}

function isInCheck(b,color){

    const king=findKing(b,color);

    if(!king) return true;

    return squareAttacked(
        b,
        king.r,
        king.c,
        opponent(color)
    );
}


/* =========================================================
   PSEUDO MOVES
   ========================================================= */

function pseudoMoves(b,r,c){

    const piece=b[r][c];

    if(!piece) return [];

    const moves=[];
    const color=piece.c;

    const add=(rr,cc,extra={})=>{

        if(!inside(rr,cc)) return;

        if(
            !b[rr][cc] ||
            b[rr][cc].c!==color
        ){

            moves.push({
                r:rr,
                c:cc,
                ...extra
            });
        }
    };

    if(piece.p==="p"){

        const dir=color==="w" ? -1:1;
        const start=color==="w" ? 6:1;

        if(
            inside(r+dir,c) &&
            !b[r+dir][c]
        ){

            moves.push({
                r:r+dir,
                c,
                promotion:
                    r+dir===0 ||
                    r+dir===7
            });

            if(
                r===start &&
                !b[r+dir*2][c]
            ){

                moves.push({
                    r:r+dir*2,
                    c
                });
            }
        }

        for(const dc of [-1,1]){

            const rr=r+dir;
            const cc=c+dc;

            if(
                inside(rr,cc) &&
                b[rr][cc] &&
                b[rr][cc].c!==color
            ){

                moves.push({
                    r:rr,
                    c:cc,
                    promotion:
                        rr===0 ||
                        rr===7
                });
            }
        }

        // En passant
        if(lastMove &&
           lastMove.piece &&
           lastMove.piece.p==="p" &&
           Math.abs(lastMove.from.r-lastMove.to.r)===2 &&
           lastMove.to.r===r &&
           Math.abs(lastMove.to.c-c)===1){

            moves.push({
                r:r+dir,
                c:lastMove.to.c,
                enPassant:true
            });
        }
    }

    if(piece.p==="n"){

        const arr=[
            [-2,-1],[-2,1],[-1,-2],[-1,2],
            [1,-2],[1,2],[2,-1],[2,1]
        ];

        arr.forEach(([dr,dc])=>add(r+dr,c+dc));
    }

    if(piece.p==="b" || piece.p==="q"){

        const dirs=[
            [-1,-1],[-1,1],[1,-1],[1,1]
        ];

        for(const [dr,dc] of dirs){

            let rr=r+dr;
            let cc=c+dc;

            while(inside(rr,cc)){

                if(!b[rr][cc]){

                    moves.push({r:rr,c:cc});

                }else{

                    if(b[rr][cc].c!==color){
                        moves.push({r:rr,c:cc});
                    }

                    break;
                }

                rr+=dr;
                cc+=dc;
            }
        }
    }

    if(piece.p==="r" || piece.p==="q"){

        const dirs=[
            [-1,0],[1,0],[0,-1],[0,1]
        ];

        for(const [dr,dc] of dirs){

            let rr=r+dr;
            let cc=c+dc;

            while(inside(rr,cc)){

                if(!b[rr][cc]){

                    moves.push({r:rr,c:cc});

                }else{

                    if(b[rr][cc].c!==color){
                        moves.push({r:rr,c:cc});
                    }

                    break;
                }

                rr+=dr;
                cc+=dc;
            }
        }
    }

    if(piece.p==="k"){

        for(let dr=-1;dr<=1;dr++){

            for(let dc=-1;dc<=1;dc++){

                if(dr===0 && dc===0) continue;

                add(r+dr,c+dc);
            }
        }

        // Castling
        if(!piece.moved && !isInCheck(b,color)){

            // King side
            if(
                b[r][7] &&
                b[r][7].p==="r" &&
                b[r][7].c===color &&
                !b[r][5] &&
                !b[r][6] &&
                !b[r][7].moved &&
                !squareAttacked(b,r,5,opponent(color)) &&
                !squareAttacked(b,r,6,opponent(color))
            ){

                moves.push({
                    r,
                    c:6,
                    castle:"king"
                });
            }

            // Queen side
            if(
                b[r][0] &&
                b[r][0].p==="r" &&
                b[r][0].c===color &&
                !b[r][1] &&
                !b[r][2] &&
                !b[r][3] &&
                !b[r][0].moved &&
                !squareAttacked(b,r,3,opponent(color)) &&
                !squareAttacked(b,r,2,opponent(color))
            ){

                moves.push({
                    r,
                    c:2,
                    castle:"queen"
                });
            }
        }
    }

    return moves;
}


/* =========================================================
   LEGAL MOVES
   ========================================================= */

function applyMoveToBoard(b,from,move,promotion="q"){

    const nb=cloneBoard(b);

    const piece=nb[from.r][from.c];

    nb[from.r][from.c]=null;

    if(move.enPassant){

        nb[from.r][move.c]=null;
    }

    nb[move.r][move.c]={
        ...piece,
        moved:true
    };

    if(move.promotion){

        nb[move.r][move.c].p=promotion;
    }

    if(move.castle==="king"){

        const rook=nb[from.r][7];

        nb[from.r][7]=null;

        nb[from.r][5]={
            ...rook,
            moved:true
        };
    }

    if(move.castle==="queen"){

        const rook=nb[from.r][0];

        nb[from.r][0]=null;

        nb[from.r][3]={
            ...rook,
            moved:true
        };
    }

    return nb;
}

function legalMovesForPiece(b,r,c){

    const piece=b[r][c];

    if(!piece) return [];

    const pseudo=pseudoMoves(b,r,c);
    const legal=[];

    for(const move of pseudo){

        const nb=applyMoveToBoard(
            b,
            {r,c},
            move
        );

        if(!isInCheck(nb,piece.c)){
            legal.push(move);
        }
    }

    return legal;
}

function allLegalMoves(b,color){

    const result=[];

    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){

            if(
                b[r][c] &&
                b[r][c].c===color
            ){

                for(const m of legalMovesForPiece(b,r,c)){

                    result.push({
                        from:{r,c},
                        ...m
                    });
                }
            }
        }
    }

    return result;
}


/* =========================================================
   CLICK HANDLING
   ========================================================= */

function clickSquare(r,c){

    if(gameOver) return;

    if(mode==="ai" && turn==="b") return;

    const piece=board[r][c];

    if(selected){

        const move=legalMoves.find(
            m=>m.r===r && m.c===c
        );

        if(move){

            if(move.promotion){

                openPromotion(selected,move);

            }else{

                makeMove(selected,move);
            }

            return;
        }

        if(
            piece &&
            piece.c===turn
        ){

            selected={r,c};
            legalMoves=legalMovesForPiece(board,r,c);
            drawBoard();
            return;
        }

        selected=null;
        legalMoves=[];
        drawBoard();
        return;
    }

    if(
        piece &&
        piece.c===turn
    ){

        selected={r,c};
        legalMoves=legalMovesForPiece(board,r,c);
        drawBoard();
    }
}


/* =========================================================
   MAKE MOVE
   ========================================================= */

let lastMove=null;

function makeMove(from,move,promotion="q"){

    snapshots.push({
        board:cloneBoard(board),
        turn,
        captured:JSON.parse(JSON.stringify(captured)),
        history:[...history],
        clocks:{...clocks},
        checks
    });

    const movingPiece=board[from.r][from.c];

    const capturedPiece =
        move.enPassant
        ? board[from.r][move.c]
        : board[move.r][move.c];

    if(capturedPiece){

        captured[movingPiece.c].push(
            capturedPiece
        );
    }

    board=applyMoveToBoard(
        board,
        from,
        move,
        promotion
    );

    lastMove={
        from:{...from},
        to:{r:move.r,c:move.c},
        piece:{...movingPiece}
    };

    const notation=createNotation(
        from,
        move,
        movingPiece,
        capturedPiece,
        promotion
    );

    history.push({
        color:movingPiece.c,
        notation
    });

    if(isInCheck(board,opponent(turn))){

        checks++;
        playSound("check");
    }else{

        playSound(capturedPiece ? "capture":"move");
    }

    selected=null;
    legalMoves=[];

    turn=opponent(turn);

    updateUI();
    drawBoard();

    checkGameState();

    if(
        !gameOver &&
        mode==="ai" &&
        turn==="b"
    ){

        statusEl.textContent="Nova AI is thinking…";

        setTimeout(aiMove,450);
    }
}


/* =========================================================
   NOTATION
   ========================================================= */

function createNotation(
    from,
    move,
    piece,
    capturedPiece,
    promotion
){

    if(move.castle==="king") return "O-O";
    if(move.castle==="queen") return "O-O-O";

    let text="";

    if(piece.p!=="p"){
        text+=piece.p.toUpperCase();
    }

    if(capturedPiece){

        if(piece.p==="p"){
            text+=files[from.c];
        }

        text+="x";
    }

    text+=files[move.c]+(8-move.r);

    if(move.promotion){

        text+="="+promotion.toUpperCase();
    }

    return text;
}


/* =========================================================
   GAME STATE
   ========================================================= */

function checkGameState(){

    const moves=allLegalMoves(board,turn);
    const check=isInCheck(board,turn);

    if(moves.length===0){

        gameOver=true;

        if(check){

            const winner=turn==="w" ? "Black":"White";

            statusEl.textContent=
                "Checkmate — "+winner+" wins!";

            showGameModal(
                "♚ Checkmate!",
                winner+" wins the game."
            );

        }else{

            statusEl.textContent="Draw — stalemate.";

            showGameModal(
                "½ Stalemate",
                "The game ends in a draw."
            );
        }

        playSound("gameover");
        return;
    }

    if(check){

        statusEl.textContent=
            turn==="w"
            ? "⚠️ Check! Your king is under attack."
            : "⚠️ Check!";

    }else{

        if(mode==="local"){

            statusEl.textContent=
                turn==="w"
                ? "White's turn"
                : "Black's turn";

        }else{

            statusEl.textContent=
                turn==="w"
                ? "Your turn — make a move"
                : "Nova AI's turn";
        }
    }
}


/* =========================================================
   UI
   ========================================================= */

function updateUI(){

    renderMoves();
    renderCaptured();

    document.getElementById("moveCount").textContent =
        history.length+" MOVES";

    document.getElementById("statMoves").textContent =
        history.length;

    document.getElementById("statCaptures").textContent =
        captured.w.length+captured.b.length;

    document.getElementById("statChecks").textContent =
        checks;

    whiteClockEl.textContent=formatTime(clocks.w);
    blackClockEl.textContent=formatTime(clocks.b);

    whiteClockEl.classList.toggle(
        "active",
        turn==="w" && !gameOver
    );

    blackClockEl.classList.toggle(
        "active",
        turn==="b" && !gameOver
    );

    whiteClockEl.classList.toggle(
        "danger",
        clocks.w<=30
    );

    blackClockEl.classList.toggle(
        "danger",
        clocks.b<=30
    );
}

function renderMoves(){

    movesEl.innerHTML="";

    for(let i=0;i<history.length;i+=2){

        const row=document.createElement("div");

        row.className="move-row";

        const num=document.createElement("div");
        num.className="move-number";
        num.textContent=(i/2+1)+".";

        const white=document.createElement("div");
        white.textContent=history[i]?.notation || "";

        const black=document.createElement("div");
        black.textContent=history[i+1]?.notation || "";

        row.append(num,white,black);

        movesEl.appendChild(row);
    }

    movesEl.scrollTop=movesEl.scrollHeight;
}

function renderCaptured(){

    capturedWhiteEl.innerHTML =
        captured.w
        .map(p=>PIECES[p.c][p.p])
        .join("");

    capturedBlackEl.innerHTML =
        captured.b
        .map(p=>PIECES[p.c][p.p])
        .join("");
}

function formatTime(sec){

    sec=Math.max(0,Math.ceil(sec));

    const m=Math.floor(sec/60);
    const s=sec%60;

    return String(m).padStart(2,"0")+
        ":"+
        String(s).padStart(2,"0");
}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer(){

    clearInterval(timer);

    timer=setInterval(()=>{

        if(gameOver) return;

        clocks[turn]-=.1;

        if(clocks[turn]<=0){

            clocks[turn]=0;
            gameOver=true;

            const winner=turn==="w" ? "Black":"White";

            showGameModal(
                "⏱ Time!",
                winner+" wins on time."
            );

            playSound("gameover");
        }

        updateUI();

    },100);
}


/* =========================================================
   UNDO
   ========================================================= */

function undoMove(){

    if(!snapshots.length || gameOver) return;

    if(mode==="ai" && turn==="b") return;

    let snap=snapshots.pop();

    board=snap.board;
    turn=snap.turn;
    captured=snap.captured;
    history=snap.history;
    clocks=snap.clocks;
    checks=snap.checks;

    lastMove=null;

    if(mode==="ai" && snapshots.length){

        snap=snapshots.pop();

        board=snap.board;
        turn=snap.turn;
        captured=snap.captured;
        history=snap.history;
        clocks=snap.clocks;
        checks=snap.checks;
    }

    selected=null;
    legalMoves=[];

    drawBoard();
    checkGameState();
}


/* =========================================================
   RESET
   ========================================================= */

function newGame(){

    board=createInitialBoard();
    turn="w";
    selected=null;
    legalMoves=[];
    history=[];
    snapshots=[];
    captured={w:[],b:[]};
    lastMove=null;
    clocks={w:600,b:600};
    gameOver=false;
    checks=0;

    document.getElementById("gameModal")
        .classList.remove("show");

    statusEl.textContent =
        mode==="ai"
        ? "Your turn — make a move"
        : "White's turn";

    drawBoard();
    startTimer();
}


/* =========================================================
   PROMOTION
   ========================================================= */

function openPromotion(from,move){

    const modal=
        document.getElementById("promotionModal");

    modal.classList.add("show");

    promotionResolve=(piece)=>{

        modal.classList.remove("show");

        makeMove(
            from,
            move,
            piece
        );

        promotionResolve=null;
    };
}

document.querySelectorAll(".promo")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(promotionResolve){

            promotionResolve(
                btn.dataset.piece
            );
        }
    });
});


/* =========================================================
   AI
   ========================================================= */

function evaluateBoard(b){

    let score=0;

    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){

            const p=b[r][c];

            if(!p) continue;

            let value=VALUES[p.p];

            // Small positional bonus
            const center =
                3.5-Math.abs(3.5-r)+
                3.5-Math.abs(3.5-c);

            if(p.p==="p") value+=center*3;
            if(p.p==="n") value+=center*5;
            if(p.p==="b") value+=center*3;

            score += p.c==="b" ? value:-value;
        }
    }

    return score;
}

function minimax(b,depth,alpha,beta,maximizing){

    if(depth===0){
        return evaluateBoard(b);
    }

    const color=maximizing ? "b":"w";
    const moves=allLegalMoves(b,color);

    if(moves.length===0){

        if(isInCheck(b,color)){
            return maximizing ? 999999:-999999;
        }

        return 0;
    }

    if(maximizing){

        let best=-Infinity;

        for(const move of moves){

            const nb=applyMoveToBoard(
                b,
                move.from,
                move
            );

            const score=minimax(
                nb,
                depth-1,
                alpha,
                beta,
                false
            );

            best=Math.max(best,score);

            alpha=Math.max(alpha,score);

            if(beta<=alpha) break;
        }

        return best;

    }else{

        let best=Infinity;

        for(const move of moves){

            const nb=applyMoveToBoard(
                b,
                move.from,
                move
            );

            const score=minimax(
                nb,
                depth-1,
                alpha,
                beta,
                true
            );

            best=Math.min(best,score);

            beta=Math.min(beta,score);

            if(beta<=alpha) break;
        }

        return best;
    }
}

function aiMove(){

    if(
        gameOver ||
        mode!=="ai" ||
        turn!=="b"
    ) return;

    const moves=allLegalMoves(board,"b");

    if(!moves.length){

        checkGameState();
        return;
    }

    let bestScore=-Infinity;
    let bestMoves=[];

    // Depth 2 gives a decent mobile-friendly opponent.
    const depth=2;

    for(const move of moves){

        const nb=applyMoveToBoard(
            board,
            move.from,
            move
        );

        const score=minimax(
            nb,
            depth-1,
            -Infinity,
            Infinity,
            false
        );

        // Slight randomness among equal moves
        if(score>bestScore){

            bestScore=score;
            bestMoves=[move];

        }else if(score===bestScore){

            bestMoves.push(move);
        }
    }

    const chosen=
        bestMoves[
            Math.floor(
                Math.random()*bestMoves.length
            )
        ];

    if(chosen.promotion){

        makeMove(
            chosen.from,
            chosen,
            "q"
        );

    }else{

        makeMove(
            chosen.from,
            chosen
        );
    }
}


/* =========================================================
   SOUND
   ========================================================= */

let audioCtx=null;

function playSound(type){

    if(!soundOn) return;

    try{

        if(!audioCtx){

            audioCtx=
                new (window.AudioContext ||
                window.webkitAudioContext)();
        }

        const osc=audioCtx.createOscillator();
        const gain=audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now=audioCtx.currentTime;

        let freq=420;

        if(type==="capture") freq=280;
        if(type==="check") freq=650;
        if(type==="gameover") freq=180;

        osc.frequency.value=freq;
        osc.type="sine";

        gain.gain.setValueAtTime(.0001,now);
        gain.gain.exponentialRampToValueAtTime(
            .08,
            now+.01
        );

        gain.gain.exponentialRampToValueAtTime(
            .0001,
            now+.13
        );

        osc.start(now);
        osc.stop(now+.14);

    }catch(e){}
}


/* =========================================================
   MODAL
   ========================================================= */

function showGameModal(title,text){

    document.getElementById("modalTitle")
        .textContent=title;

    document.getElementById("modalText")
        .textContent=text;

    document.getElementById("gameModal")
        .classList.add("show");
}


/* =========================================================
   BUTTONS
   ========================================================= */

document.getElementById("restartBtn")
.addEventListener("click",newGame);

document.getElementById("modalRestart")
.addEventListener("click",newGame);

document.getElementById("undoBtn")
.addEventListener("click",undoMove);

document.getElementById("flipBtn")
.addEventListener("click",()=>{

    flipped=!flipped;

    drawBoard();
});

document.getElementById("themeBtn")
.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    document.getElementById("themeBtn")
        .textContent=
        document.body.classList.contains("light")
        ? "🌙"
        : "☀️";
});

document.getElementById("soundBtn")
.addEventListener("click",()=>{

    soundOn=!soundOn;

    document.getElementById("soundBtn")
        .textContent=soundOn ? "🔊":"🔇";
});

document.querySelectorAll(".mode")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".mode")
            .forEach(x=>x.classList.remove("active"));

        btn.classList.add("active");

        mode=btn.dataset.mode;

        document.getElementById("blackName")
            .textContent=
            mode==="ai"
            ? "Nova AI"
            : "Player 2";

        newGame();
    });
});


/* =========================================================
   INITIALIZE
   ========================================================= */

drawBoard();
startTimer();

</script>

</body>
</html>
