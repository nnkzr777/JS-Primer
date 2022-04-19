export class CallTest {
    constructor(){
        this._listeners = new Set();
    }
    
    /**
     * @param {Function} listener
     */
    TestAddListener(listener){
        this._listeners.add(listener);
    }

    //callメソッド使わないとき
    TestEmit1(){
        this._listeners.forEach(listener => {
            listener();
        });
    }

    //callメソッド使ったとき
    TestEmit2(){
        this._listeners.forEach(listener => {
            listener.call(this);
        })
    }
}