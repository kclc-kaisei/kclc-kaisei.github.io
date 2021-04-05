2.02.多重ループ
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_s){:target="_blank"}

### コメント

多重ループを使うとこの後学習する多次元配列の中身を簡単に知ることができます。
```c++
for(int i = 0;i < N;i++){
    for(int j = 0;j < M;j++){
        // 処理
    }
}
```
のように書きます。
`rep`を使いたい場合も同様にして下のように書くことができます。
```c++
rep(i,N){
    rep(j,M){
        // 処理
    }
}
```
**カウンタの名前が被らないように注意してください。**

### 演習問題

- [EX17 - 果物屋さんでお買い物](https://atcoder.jp/contests/apg4b/tasks/APG4b_cf){:target="_blank"}

余裕がある人向けの問題

- [C - Mandarin Orange](https://atcoder.jp/contests/abc189/tasks/abc189_c){:target="_blank"}