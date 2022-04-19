//commanderモジュールをprogramとしてインポートする
const program = require("commander");

//fsモジュールをfsオブジェクトとしてインポートする
const fs = require("fs");

//md2htmlモジュールをインポートする
const md2html = require("./md2html");

//gfmオプションを定義する
program.option("--gfm","GFMを有効にする");
// program.option("--hoge","GFMを有効にする");
// program.option("--huga","GFMを有効にする");


//コマンドライン引数をパースする
program.parse(process.argv);

//パースしたコマンドライン引数の配列から、ファイルパスを取得する
const filePath = program.args[0];

//コマンドライン引数のオプションを取得する
// const options = program.opts();

//コマンドライン引数でもしオプションが指定されていなかったら、
//デフォルト値(false)で上書きする
const cliOptions = {
    // gfm: options.gfm ?? false,
    gfm: false,
    ...program.opts(),
};

//ファイルを非同期で読み込む
fs.readFile(filePath,{encoding:"utf8"},(err,file) => {
    if(err){
        console.error(err.message);
        //終了ステータス１(一般的なエラー)としてプロセスを終了する
        process.exit(1);
        return;
    }
//     //オプションの値を使用し、MarkdownファイルをHTML文字列に変換する
//     const html = marked.parse(file,{
//         gfm:cliOptions.gfm,
//     });
//    console.log(html);

        //md2htmlモジュールを使ってHTMLに変換する
        const html = md2html(file, cliOptions);
        console.log(html);
});