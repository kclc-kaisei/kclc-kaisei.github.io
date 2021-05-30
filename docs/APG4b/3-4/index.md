3.04.構造体
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_ab){:target="_blank"}

### コメント

構造体にしてみることでコードがシンプルになることがあります。
また、演算子オーバーロードを使ったソートと同じような考えでこのように配列を逆順にソートすることもできます。

```c++
#include <bits/stdc++.h>
using namespace std;

bool compare(int a,int b){
    return a > b;
}
int main(){
    vector<int> vec = {5,3,1,4,2};
    sort(vec.begin(),vec.end(),compare); // 関数を引数に渡す
    for(int i = 0;i < 5;i++){
        cout << vec[i] << endl;
    }
}
// 出力結果:
// 5
// 4
// 3
// 2
// 1
```
これは、 `int` 型の比較関数を `sort` に渡すことで逆順にソートしています。
結構便利なので慣れてきたら使ってみてください。

### 演習問題

- [EX24 - 時計の実装](https://atcoder.jp/contests/apg4b/tasks/APG4b_by){:targe="blank"}
