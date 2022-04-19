async function main(){
    try{
        const userId = getUserId();
        const userInfo = await fetchUserInfo(userId);
        const view = createView(userInfo);
        displayView(view);
    }catch(error){
        console.error(`エラーが発生しました(${error})`);
    }
}

function getUserId(){
    return document.getElementById("userId").value;
}

// function main() {
//     fetchUserInfo("js-primer-example")
//     //ここではJSONオブジェクトで解決されるPromise
//     .then((userInfo) => createView(userInfo))
//     //ここではHTML文字列で解決されるPromise
//     .then((view) => displayView(view))
//     //Promiseチェーンでエラーがあった場合はキャッチされる
//     .catch((error) =>{
//         //promiseチェーンの中で発生したエラーを受け取る
//         console.error(`エラーが発生しました${error}`);
//     });
// }

console.log("index.js: loaded");
const heading = document.querySelector("h2");
const headingText = heading.textContent;

function fetchUserInfo(userId) {
    //fetchの返り値のPromiseをreturnする
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                //エラーレスポンスからRejectedなPromiseを作成して返す
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                //JSONオブジェクトで解決されるPromiseを返す
                return response.json();
            }
        });
}

function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view){
    //HTMLの挿入
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}