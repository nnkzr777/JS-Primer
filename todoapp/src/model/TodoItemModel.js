//ユニークなIDを管理する変数
let  todoIdx = 0;

// ↑このtodoIdx変数って、
// 宣言はクラス外でされてるからexportしたことにはならんのかな？
// export先からアクセスできるのか、後で確かめてみよう。
// 予想：アクセスできない
// グローバル且つプライベート変数扱いにしたいから、class外で宣言してるのかなと予想。

// 予想訂正
// idはクラスをnewするたびにリセットしたくないから、クラス外のグローバル変数として宣言したんやな。
// クラス内に宣言するならstatic変数やろか。でもなんでそうせーへんかったんかな？

export class TodoItemModel{
    constructor({title, completed}){
        //↑あーーこの書き方なんやったっけ？？{ }ナシで書くとどうなるんや？
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }
    // constructor (title, completed){
    //     this.id = todoIdx++;
    //     this.title = title;
    //     this.completed = completed;
    // }
}