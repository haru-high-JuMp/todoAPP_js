const form = document.getElementById("form");   // jsからformタグにアクセスする
const input = document.getElementById("input"); // jsからinputタグにアクセスする
const ul = document.getElementById("ul");        // jsからulタグにアクセスする

const todos = JSON.parse(localStorage.getItem("todos"));       //扱いやすいようにJSONから変換して変数に代入

if(todos) {     // ローカルに保存されているか確認
    todos.forEach(todo => {
        add(todo);          // todoの個数分addを呼び出してリロード時に表示
    })
}

form.addEventListener("submit", function(event) {
    event.preventDefault();     // webのリロードを防止する
    console.log(input.value);   // 確認としてconsoleに表示する
    add();                      //関数addでulリストを追加する
})

function add(todo) {
    let todoText = input.value;

    if(todo){               // todoがあるか確認　あればtodoTextに
        todoText = todo.text;
    }

    if (todoText.length > 0){                       // todoTextの文字数を比較
        const li = document.createElement("li");    // liタグを作成する
        li.innerText = todoText;                    // liのテキストとして入力を取得する
        li.classList.add("list-group-item");        // HTMLのクラスを指定する

        if (todo && todo.completed){
            li.classList.add("text-decoration-line-through")
        }

        li.addEventListener("contextmenu", function(event){
            event.preventDefault();                 // デフォルトのイベントを停止 
            li.remove();
            saveData();
        });          // liタグで右クリックされると検知

        li.addEventListener("click", function(){
            li.classList.toggle("text-decoration-line-through")     //打ち消し線をする
            saveData();
        })          // 左クリックを検知

        ul.appendChild(li);                         // ulタグの子供として設定する
        input.value = "";                           //入力フォームを空にする
        saveData();                                 //画面に出力されたデータをローカルに保存する
    }
}

function saveData(){
    const lists = document.querySelectorAll("li")   // liのデータを取得
    let todos = [];

    lists.forEach(list => {
        let todo = {                                                            //オブジェクト型を宣言
            text: list.innerText,                                               // textにタスク名
            completed: list.classList.contains("text-decoration-line-through")  // completedに線が引かれているかの状態検知
        };
        todos.push(todo);                 // 配列にデータを入れる
    });
    localStorage.setItem("todos", JSON.stringify(todos));    // JSONに変換してデータをローカルに保存
}