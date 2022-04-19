//EventEmitterクラスを継承する。
//このクラスは、TodoItemModel(リストの中の１つ１つの要素)の配列を保持し、
//新しいTodoアイテムが追加されたらこの配列に追加する。
//このとき、TodoListModelの状態が変化したことを通知する為に、
//自分自身へchangeイベントをディスパッチする。

import { EventEmitter } from "../EventEmitter.js";
import { TodoItemModel } from "./TodoItemModel.js";

export class TodoListModel extends EventEmitter {
    /**
     * @param {TodoItemModel[]} items 初期アイテム一覧(デフォルトは空の配列)
     */
    constructor(items = []) {
        //親クラスのコンストラクタ呼び出し
        super();
        this.items = items;
    }

    /**
     *TodoItemの合計個数を返す
     *
     * @returns {number} 
     * @memberof TodoListModel
     */
    getTotalCount() {
        return this.items.length;
    }

    /**
     *表示できる(？)TodoItemの配列を返す
     *
     * @returns {TodoItemModel[]} 
     */
    getTodoItems(){
        return this.items;
    }
    /**
     *TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
     *
     * @param {Function} listener
     */
    onChange(listener){
        this.addEventListener("change", listener);
    }

    /**
     *状態が変更されたときに呼ぶ。登録済のリスナー関数を呼びだす
     *
     */
    emitChange(){
        this.emit("change");
    }

    /**
     *"change"に登録されているイベントリスナーを全て削除する
     *
     */
    removeChange(){
        this.removeAllEventListeners("change");
    }

    /**
     *TodoItemを追加する
     *
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem){
        //items配列に新しいリスト要素を追加
        this.items.push(todoItem);
        //changeイベントをディスパッチ
        this.emitChange();
    }

    /**
     *指定したidのTodoItemのcompletedを更新する
     *
     * @param {{id, completed}} 
     */
    updateTodo({id, completed}){
        //引数で与えられたidと一致するTodoItemを見つけ、あるなら完了状態の値を更新する
        const todoItem = this.items.find(todo => todo.id === id);
        if(!todoItem){
            return;
        }
        todoItem.completed = completed;
        //changeイベントをディスパッチ
        this.emitChange();
    }

    /**
     *指定したidのTodoItemを削除する
     *
     * @param {{id: number}} 
     */
    deleteTodo({id}){
        //指定した`id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
        this.items = this.items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }
}