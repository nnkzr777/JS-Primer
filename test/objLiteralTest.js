//引数をそのまま変数にするほう
export class ObjLiteralTest {
    constructor (title, completed){
        this.title = title;
        this.completed = completed;
    }

    ShowMembers(){
        console.log(this);
    }
}

//引数をオブジェクトリテラルにするほう
export class ObjLiteralTest2{
    constructor({title, completed}){
        this.title = title;
        this.completed = completed;
    }

    ShowMembers(){
        console.log(this);
    }
}