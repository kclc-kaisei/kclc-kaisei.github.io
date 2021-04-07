3.02.pair／tupleとauto
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_z){:target="_blank"}

2つほど補足します。

### 型エイリアス

APG4bのページで型エイリアスが取り上げられていました。これと、[3.01.数値型](../3-1/index.md)で紹介した 「常に64bit整数を使う」という手法を組み合わせて、
```c++
using ll = long long;
```
のように書くと `ll` と書くだけで64bit整数を使うことが出来ます。

### tupleの補足

`tuple` の補足をします。
`pair` は `first`,`second` を使うことで要素にアクセスできます。
では `tuple` でそれぞれの要素にアクセスするにはどうすればいいのでしょうか？
ここではAPG4bで紹介されていた方法ともう一つの方法を紹介します。

#### tieで分解

APG4bで紹介されていた手法です
```c++
tuple<int,bool,double> tup(12,true,3.14);
int a;
bool b;
double c;
tie(a,b,c) = tup; // a:12 b:true c:3.14
```

#### get

```c++
get<n>(tuple)
```
とすることで `tuple` の \(n\) 番目(0-indexed)の要素にアクセスできます。
```c++
tuple<int,bool,double> tup(12,true,3.14);
int a = get<0>(tup); // 12
bool b = get<1>(tup); // true
double c = get<2>(tup); // 3.14
```

### 演習問題

- [EX22 - 2つ目の値でソート](https://atcoder.jp/contests/apg4b/tasks/APG4b_ca)
- [B - Guidebook](https://atcoder.jp/contests/abc128/tasks/abc128_b)
