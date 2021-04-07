3.01.数値型
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_y){:target="_blank"}

### コメント

`int64_t` 型は `long long` と書かれることもよくあります。見つけた時に64bit整数だと分かればいいです。
APG4bで出てきた要点をまとめると、

- double型を出力するときは
```c++
cout << fixed << setprecision(10);
```
などとしておくと便利

- 数が大きい時は `int` 型ではなく `int64_t` 型を使う
- `printf` や `scanf` を使っても出力、入力ができる
- **オーバーフロー**や**桁落ち**に気を付ける

特にオーバーフローには気をつけましょう。気を付けずに問題が合わないという経験を競技プログラミングをしている人は何度も経験しています。(多分)  
オーバーフローのバグはとても見つけにくいです。そこで、ここではいくつかオーバーフローをさける方法を紹介します。

#### 常に64bit整数を使う

`int` と書くところも常に `int64_t` と書いておけば(基本的には)オーバーフローはしませんね？(暴論)
ただし、64bit整数にも限界があるのでそれを超える整数は格納できません。
また、64bit整数は32bit整数よりも2倍多くメモリを取るので、稀にMLE(メモリ使用料超過)になることがあります。

#### #define int long longをする

これはとても強力な手法ですが、**非推奨**です。
方法としては、
```c++
#include <bits/stdc++.h>
```
の下に
```c++
#define int long long
```
と書き、`int main` を `signed main` と書き直すだけです。
こうすることで全ての `int` が `long long` に置き換えられます。
しかし、これはあくまで**非推奨**です。なぜなら、`int` のようなキーワードをdefineするのは未定義動作だからです。
未定義動作というのは実行環境によって結果が変わることがあります。

使うのは悪魔に魂を売るようなものだと考えて使ってください。

### 演習問題

- [B - Lucas Number](https://atcoder.jp/contests/abc079/tasks/abc079_b)

余裕がある人向けの問題

- [B - Multiplication 2](https://atcoder.jp/contests/abc169/tasks/abc169_b)
- [C - Multiplication 3](https://atcoder.jp/contests/abc169/tasks/abc169_c)