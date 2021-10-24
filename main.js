const x = 5; // 横のマスの数
const y = 5; // 縦のマスの数
let score = 0; // 点数
let viewScore = document.querySelector(".score"); // 点数表示
const main = document.getElementById("main");
const modal = document.getElementById("modal");
const button = document.querySelector(".button");
// スタートボタンが押された時の処理
button.addEventListener("click", () => {
  modal.setAttribute("class", "hidden2");
  main.setAttribute("class", "main");
  init();
});
// ゲーム画面生成
function init() {
  const table = document.querySelector("table");
  let id = 0;
  for (let i = 0; i < y; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < x; j++) {
      let td = document.createElement("td");
      td.classList.add("hidden");
      td.id = id;
      id++;
      // パネルをクリックした時の処理
      td.addEventListener("click", (e) => {
        if (td.className === "visible") {
          td.setAttribute("class", "hidden");
          score += 2;
          viewScore.textContent = `SCORE: ${score}`;
          return;
        }
        if (td.className === "visible2") {
          td.setAttribute("class", "hidden");
          score++;
          viewScore.textContent = `SCORE: ${score}`;
          return;
        }
        if (td.className === "visible3") {
          td.setAttribute("class", "hidden");
          score--;
          viewScore.textContent = `SCORE: ${score}`;
          return;
        }
      });
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  mainLoop();
}

function mainLoop() {
  // カウントダウンタイマー
  let time = document.querySelector("h2");
  let cnt = 10;
  // 10秒たったらすべての処理を止める
  let timer = setInterval(() => {
    time.textContent = `TIME: ${cnt}`;
    cnt--;
    if (cnt < 0) {
      document.querySelector("table").style.pointerEvents = "none";
      clearInterval(timer);
      clearInterval(shwoPanel);
      time.textContent = "RETRY";
      time.style =
        "background: rgba(0, 0, 0, 0.4);color:black;width: 200px;border-radius: 8px;";
      time.addEventListener("click", () => {
        document.location.reload();
      });
    }
  }, 1000);
  // パネルをランダムに表示させる
  let shwoPanel = setInterval(() => {
    const n = Math.random();
    let id = Math.floor(Math.random() * (x * y));
    let panel = document.getElementById(id);
    if (panel.className === "hidden") {
      // 確率10%でピンクパネル
      if (n < 0.1) {
        // visibleクラスを付けてピンクパネルを表示
        panel.setAttribute("class", "visible");
        // hiddenクラスを付けてパネル非表示
        // 第二引数にパネルを非表示にするまでの時間をミリ秒で設定
        setTimeout(() => {
          panel.setAttribute("class", "hidden");
        }, 1000);
      }
      // 確率30%でブルーパネル
      else if (n < 0.4) {
        panel.setAttribute("class", "visible2");
        setTimeout(() => {
          panel.setAttribute("class", "hidden");
        }, 1500);
      }
      // 確率60%でブラックパネル
      else {
        panel.setAttribute("class", "visible3");
        setTimeout(() => {
          panel.setAttribute("class", "hidden");
        }, 2000);
      }
    }
  }, 250);
}
