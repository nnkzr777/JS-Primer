import {Type} from "./model/Type.js";

export class EventEmitter {
    constructor () {
        /**
         * 登録する[イベント名, Set(リスナー関数)]を管理するWeakMap
         * @type {WeakMap<Type, Set>}
         * @private
         */
        this._listeners = new WeakMap();
        /**
         * 登録するイベント名を管理する配列
         * @type {Type[]}
         * @private
         */
        this._types = [];
    }

    /**
     *指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
     * @param {string} type イベント名
     * @param {function} listener イベントリスナー
     */
    addEventListener (type, listener) {
        //指定したイベントに対応するSetを作成し、リスナー関数を登録する
        //配列typesのプロパティに、与えられた引数と同じ値を持つオブジェクトがあるかどうか判定し、なければ作成して配列に追加する。
        if (!this._types.some(obj => obj.type === type)) {
            this._types.push(new Type(type));
        }
        //次に、typesオブジェクトの値をキーにして、対応する_listenersがあるかどうか判定し、なければWeakMapにセットする。
        const typeObj = this._types.find(obj => obj.type === type);
        if (!this._listeners.has(typeObj)){
            this._listeners.set(typeObj, new Set());
        }
        //イベント名に対応するイベントリスナーのセットを取得し、イベントリスナーを追加する
        const listenerSet = this._listeners.get(typeObj);
        listenerSet.add(listener);
    }

    /**
     *指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
    emit (type) {
        //指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
        const typeObj = this._types.find(obj => obj.type === type);
        const listenerSet = this._listeners.get(typeObj);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    /**
     * 指定したイベント名の登録されているイベントリスナーを全て削除する
     * @param {string} type イベント名
     */
    removeAllEventListeners (type) {
        const typeObj = this._types.find(obj => obj.type === type);
        const listenerSet = this._listeners.get(typeObj);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            this.removeEventListener(type, listener);
        })
    }

    /**
     * イベント名とイベントリスナーを指定して、イベントリスナーを削除する
     * @param {string} type イベント名
     * @param {function} listener イベントリスナー
     */
    removeEventListener (type, listener) {
        //指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
        const typeObj = this._types.find(obj => obj.type === type);
        const listenerSet = this._listeners.get(typeObj);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listenerSet.delete(listener);
            }
        });
    }
}