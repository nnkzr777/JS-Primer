import { CallTest } from "./CallTest.js";
import { ObjLiteralTest,ObjLiteralTest2 } from "./objLiteralTest.js";

const obj = new ObjLiteralTest("タイトル",true);
obj.ShowMembers();

const obj2 = new ObjLiteralTest2({title:"タイトル", completed:true});
obj2.ShowMembers();

// const test = new CallTest();

// //関数の登録
// test.TestAddListener(() => {
//     console.log("リスナー１");
// });
// test.TestAddListener(() => {
//     console.log("リスナー２");
// });
// test.TestAddListener(() => {
//     console.log("リスナー３");
// });

// //Callメソッド使わないバージョン
// console.log("//Callメソッド使わないバージョン");
// test.TestEmit1();

// //Callメソッド使うバージョン
// console.log("//Callメソッド使うバージョン");
// test.TestEmit2();