import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
//html-util.jsで作ったelement関数とrender関数をインポートする
//element関数はTodoItemView/TodoListViewに改めて作ったのでインポートしないように変更
//import { element, render } from "./view/html-util.js";
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
//※TodoItemViewクラスは、TodoListView.js内でimport済

export class App {
    constructor() {
        this.todoListView = new TodoListView();
        //1. TodoListの初期化
        //this.todoListModel = new TodoListModel();
        this.todoListModel = new TodoListModel([]);
    }

    /**
     *Todoを追加するときに呼ばれるリスナー関数
     *
     * @param {string} title
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     *Todoの状態を更新したときに呼ばれるリスナー関数
     *
     * @param {{id:number,completed:boolean}} 
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     *Todoを削除したときに呼ばれるリスナー関数
     *
     * @param {{id:number}}
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    }

    mount() {
        //まずはフォーム要素自体の取得
        const formElement = document.querySelector("#js-form");
        //次にフォーム要素の中の、input要素を取得
        const inputElement = document.querySelector("#js-form-input");
        //アプリのメインとなるTodoリスト要素を取得
        const containerElement = document.querySelector("#js-todo-list");
        //Todoアイテム数の合計を表すspan要素を取得
        const todoItemCountElement = document.querySelector("#js-todo-count");

        //2. TodoListModelの状態が更新されたら表示を更新する
        this.todoListModel.onChange(() => {
            //TodoリストをまとめるList要素
            //ページ読み込み時に、文字列なしで空のul要素を作成してる
            //const todoListElement = element`<ul />`;
            //それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            // const todoListView = new TodoListView();
            //todoITemsに対応するTodoListViewを作成する
            //todoListViewはApp.jsのメンバになったのでthisつけて呼び出す
            const todoListElement = this.todoListView.createElement(todoItems, {
                //Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                //Appに定義したリスナー関数を呼び出す
                onUpdateTodo: ({ id, completed }) => {
                    //this.todoListModel.updateTodo({id,completed});
                    this.handleUpdate({ id, completed });
                },
                //Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                onDeleteTodo: ({ id }) => {
                    //this.todoListModel.deleteTodo({id});
                    this.handleDelete({ id });
                }
            });
            // todoItems.forEach(item => {
            //     //削除ボタン(x)をそれぞれ追加する
            //     //完了済みならchecked属性をつけ、未完了ならchecked属性を外す
            //     //input要素にはクラス名"checkbox"をつける
            //     const todoItemElement = item.completed
            //     ? element`<li><input type="checkbox" class="checkbox" checked>
            //     <s>${item.title}</s>
            //     <button class="delete">x</button>
            //     </li>`
            //     : element`<li><input type="checkbox" class="checkbox">
            //     ${item.title}
            //     <button class="delete">x</button>
            //     </li>`
            //     // const todoItemElement = element`<li>${item.title}</li>`;
            //     //チェックボックスがトグルしたときのイベントにリスナー関数を登録
            //     const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
            //     inputCheckboxElement.addEventListener("change",() => {
            //         //指定したTodoアイテムの完了状態を反転させる
            //         this.todoListModel.updateTodo({
            //             id:item.id,
            //             completed: !item.completed
            //         });
            //     });
            //     //削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
            //     const deleteButtonElement = todoItemElement.querySelector(".delete");
            //     deleteButtonElement.addEventListener("click", () => {
            //         this.todoListModel.deleteTodo({
            //             id: item.id
            //         });
            //     });
            //     todoListElement.appendChild(todoItemElement);
            // });
            //コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            //アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数：${this.todoListModel.getTotalCount()}`;
        });

        // 3.フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            if(!inputElement.value){
                return;
            }
            //新しいTodoItemをTodoListへ追加する
            this.handleAdd(inputElement.value);
            //this.todoListModel.addTodo(new TodoItemModel(
            //     {
            //     title: inputElement.value,
            //     CompositionEvent:false
            // }
            // inputElement.value,false
            // ));
            //入力欄を空文字にリセット
            inputElement.value = "";
        });

        // //Todoアイテム数
        // let todoItemCount = 0;
        // //イベントリスナーでsubmitイベントを受け取る
        // formElement.addEventListener("submit", (event) => {
        //     //submitイベントの本来の動作(フォームの内容を指定したURLに送る)を止める
        //     event.preventDefault();
        //     //追加するTodoアイテムの要素(li要素)を作成する(ガワのul要素はtodoListElementに作成済み)
        //     const todoItemElement = element`<li>${inputElement.value}</li>`;
        //     //TodoアイテムをtodoListElementに追加する
        //     todoListElement.appendChild(todoItemElement);
        //     //コンテナ要素(Todoリスト本体)の中身を、TodoリストをまとめるList要素で上書きする
        //     render(todoListElement, containerElement);
        //     //Todoアイテム数を+1し、表示されているテキストを更新する
        //     todoItemCount += 1;
        //     todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
        //     //入力欄を空文字列にしてリセットする
        //     inputElement.value = "";
        // });
    }

    unmount(){
        //onChangeイベントの解除
        this.todoListModel.removeChange();

        //フォームの送信イベントの解除
        const formElement = document.querySelector("#js-form");
        formElement.removeEventListener("submit", (event) => {
            event.preventDefault();
            this.handleAdd(inputElement.value);
            inputElement.value = "";
        });
    }
}