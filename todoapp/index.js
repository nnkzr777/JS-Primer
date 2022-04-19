import { App } from "./src/App.js";
const app = new App();
//app.mount();
//ページのロードが完了したときのイベント
window.addEventListener("load", () => {
    app.mount();
    console.log("loadイベントが発生しました");
});

//ページがアンロードされたときのイベント
window.addEventListener("unload", () => { 
    app.unmount();
    console.log("unloadイベントが発生しました");
});