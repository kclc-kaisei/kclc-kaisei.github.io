1.13.配列
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_n){:target="_blank"}

### コメント

配列もめっちゃ使います。前回と同じ理由で配列 \(vec\) の \(i\) 番目にアクセスしたいときは `vec[i]` と書くことを推奨します。

一応APG4bで出てきたことで大事なことと、注意を書いておきます。

#### 配列の宣言

- 配列を使いたい時(宣言する時)は `vector<int> vec(N);` のように書く。  
※このように書くと全ての要素は \(0\) になる  
- `vector<int> vec(N,10);` と書くことで長さ \(N\) で全ての要素が \(10\) の配列が使える
- \(N\) 個の数を受け取りたいときは
```c++
vector<int> vec(N);
for(int i = 0;i < N;i++)cin >> vec[i];
//repを使った書き方
rep(i,N)cin >> vec[i];
```

#### 注意

APG4b内で
```c++
#define _GLIBCXX_DEBUG
```
というコードがあったかと思いますが、これを書き加えると**著しくコードの実行速度が遅くなる可能性**があります。
しかし、手元でコードを実行する分にはあまり遅さが気になることはないです。
もし上のコードを付け加える時は、代わりに
```c++
#ifndef ONLINE_JUDGE
#define _GLIBCXX_DEBUG
#endif
```
と書いてください。
これをすることによって、手元で実行するときは配列外参照をするとエラーを出してくれ、AtCoderにコードを提出するときはコードの実行速度が遅くなることがなくなります。
これがどのように動いているのかはここでは説明しません。興味があったら調べてみてください。

### 演習問題

問題をたくさん解くのだ～

- [EX13 - 平均との差](https://atcoder.jp/contests/APG4b/tasks/APG4b_cj){:target="_blank"}
- [B - Picture Frame](https://atcoder.jp/contests/abc062/tasks/abc062_b){:target="_blank"}
- [B - Counting Roads](https://atcoder.jp/contests/abc061/tasks/abc061_b){:target="_blank"}
- [B - Trained?](https://atcoder.jp/contests/abc065/tasks/abc065_b){:target="_blank"}
- [B - Go to Jail](https://atcoder.jp/contests/abc179/tasks/abc179_b){:target="_blank"}
- [B - Orthogonality](https://atcoder.jp/contests/abc188/tasks/abc188_b){:target="_blank"}

余裕がある人向けの問題

- [B - Two Colors Card Game](https://atcoder.jp/contests/abc091/tasks/abc091_b){:target="_blank"}
- [B - Card Game for Two](https://atcoder.jp/contests/abc088/tasks/abc088_b){:target="_blank"}
- [B - Kagami Mochi](https://atcoder.jp/contests/abc085/tasks/abc085_b){:target="_blank"}
- [B - Remove It](https://atcoder.jp/contests/abc191/tasks/abc191_b){:target="_blank"}
- [C - Go to School](https://atcoder.jp/contests/abc142/tasks/abc142_c){:target="_blank"}