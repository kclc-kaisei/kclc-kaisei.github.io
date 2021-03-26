1.14.STLの関数
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_o){:target="_blank"}

### コメント

STLの関数はAPG4bで紹介されたもの以外にも色々あります。興味がある人は調べてみるといいでしょう。
`min`,`max`,`swap`,`sort`,`reverse` はよく使うので覚えておいてください。

### 豆知識

```c++
#include <bits/stdc++.h>
using namespace std;
int main(){
    vector<int> vec = {2,4,1,3};
    sort(vec.begin(),vec.end());
    reverse(vec.begin(),vec.end());
    for(int i = 0;i < 4;i++)cout << vec[i] << "\n";
}
```
このコードを実行してみてください。
```
4
3
2
1
```
と表示されたかと思います。  
このように、配列の要素を大きい順番に並べ替えたいときは上のコードのように一旦小さい順に並び替えてから配列全体を逆転させることで出来ます。

### 演習問題

関数は問題を解いていくうちに自然と覚えていくと思います。

- [EX14 - 三人兄弟の身長差](https://atcoder.jp/contests/apg4b/tasks/APG4b_ci){:target="_blank"}
- [B - Card Game for Two](https://atcoder.jp/contests/abc088/tasks/abc088_b){:target="_blank"}
- [B - Kagami Mochi](https://atcoder.jp/contests/abc085/tasks/abc085_b){:target="_blank"}
- [B - Mix Juice](https://atcoder.jp/contests/abc171/tasks/abc171_b){:target="_blank"}

余裕がある人向けの問題

- [C - Fennec vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_c){:target="_blank"}
- [C - Distinct or Not](https://atcoder.jp/contests/abc154/tasks/abc154_c){:target="_blank"}