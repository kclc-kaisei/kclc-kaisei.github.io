3.05.ビット演算
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_ac){:target="_blank"}

### コメント

bit全探索についての補足です。
APG4bではbit全探索をするときに `bitset` を使っていますが、恐らく `bitset` よりも今から紹介する手法の方がよく使われてると思います。
例としてAPG4bでも紹介されていた次のような問題を考えてみます。

!!! 問題
    <font size="3%">
    \(A_1,A_2,...A_N\) の \(N\) コの整数が与えられます。これらの整数からいくつかを選んで、その総和が \(K\) となるような選び方が存在するかを求めてください。
    </font>
制約

- \(1 \leq N \leq 20\)
- \(0 \leq K \leq 100\)
- \(0 \leq A_i \leq 100\)

入力

> \(N\ K\)  
> \(A_1\ A_2\ ...\ A_N\)

出力

総和が \(K\) となるような整数の組合せが存在するなら1行に `YES` を、そうでなければ `NO` を出力してください。

例

入力例1
```
5 11
2 8 4 2 9
```
出力例1
```
YES
```

入力例2
```
5 3
2 8 4 2 9
```
出力例2
```
NO
```

入力例2
```
5 25
2 8 4 2 9
```
出力例2
```
YES
```

まず一度 `bitset`,再帰関数で解法を書いてみてください。下に `bitset`,再帰関数,多くの人が使ってる手法(特に名前がない...)の
3種類を紹介します。多くの人が3つ目を使っているのでこれを推奨しますが、書ければなんでもいいです。

以下解法です。

### bitset

APG4bのパクリですが許してください。

??? code
    <font size="3%">

    ```c++
    #include <bits/stdc++.h>
    using namespace std;
    
    int main () {
        int N, K;
        cin >> N >> K;
        vector<int> A(N);
        for (int i = 0; i < N; i++) {
            cin >> A.at(i);
        }
        
        bool ans = false;
    
        // すべての選び方を試して、総和がKになるものがあるかを調べる
        for (int tmp = 0; tmp < (1 << 20); tmp++) {
            bitset<20> s(tmp);  // 最大20個なので20ビットのビット列として扱う
        
            // ビット列の1のビットに対応する整数を選んだとみなして総和を求める
            int sum = 0;
            for (int i = 0; i < N; i++) {
                if (s.test(i)) {
                    sum += A.at(i);
                }
            }
            if (sum == K) {
                ans = true;
            }
        }
    
        if (ans) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }
    }
    ```
    </font>

### 再帰関数

??? code
    <font size="3%">

    ```c++
    #include <bits/stdc++.h>
    using namespace std;

    int N,K;
    vector<int> vec;
    bool dfs(int i,int now){ // vecのi番目以降の要素で総和をkにできるか？
        if(i == N){ // これ以上vecの要素がない
            if(now == 0)return true;
            else return false;
        }

        bool chose = dfs(i + 1,now - vec[i]); // i番目を選んだ場合
        bool didnt = dfs(i + 1,now); // i番目を選ばない場合

        if(chose || didnt)return true;
        else return false;
    }

    int main(){
        cin >> N >> K;
        vec = vector<int>(N);
        for(int i = 0;i < N;i++){
            cin >> vec[i];
        }
        if(dfs(0,K)){
            cout << "YES" << endl;
        }
        else{
            cout << "NO" << endl;
        }
    }
    ```

    </font>

### 多くの人が使ってる手法

??? code
    <font size="3%">

    ```c++
    #include <bits/stdc++.h>
    using namespace std;

    int main(){
        int N,K;
        cin >> N >> K;
        vector<int> vec(N);
        for(int i = 0;i < N;i++){
            cin >> vec[i];
        }
        
        // ループ1
        for(int i = 0;i < (1 << N);i++){ // 1 << N は 2^N
            int current = 0;
            //ループ2
            for(int j = 0;j < N;j++){
                if(i >> j & 1){
                    current += vec[j];
                }
            }
            if(current == K){
                cout << "YES" << endl;
                return 0;
            }
        }
        cout << "NO" << endl;
    }
    ```

    </font>
これは何をしているのかというと、ループ1で \(0\) から \(2^N\) までの数をそれぞれ部分集合として見て、ループ2でそれぞれの部分集合での数の総和を数えています。

例として
```
3 4
2 2 4
```
というケースを使って書くループの挙動を見てみましょう。

- \(i = 0\) の時
    - \(i >> 0\ \&\ 1\) は \(0\) なので何も足さない
    - \(i >> 1\ \&\ 1\) は \(0\) なので何も足さない
    - \(i >> 2\ \&\ 1\) は \(0\) なので何も足さない

総和は0で条件を満たさない

- \(i = 1\) の時
    - \(i >> 0\ \&\ 1\) は \(1\) なので \(2\) を足す
    - \(i >> 1\ \&\ 1\) は \(0\) なので何も足さない
    - \(i >> 2\ \&\ 1\) は \(0\) なので何も足さない

総和は2で条件を満たさない

- \(i = 2\) の時
    - \(i >> 0\ \&\ 1\) は \(0\) なので何も足さない
    - \(i >> 1\ \&\ 1\) は \(1\) なので \(2\) を足す
    - \(i >> 2\ \&\ 1\) は \(0\) なので何も足さない

総和は2で条件を満たさない

- \(i = 3\) の時
    - \(i >> 0\ \&\ 1\) は \(1\) なので \(2\) を足す
    - \(i >> 1\ \&\ 1\) は \(1\) なので \(2\) を足す
    - \(i >> 2\ \&\ 1\) は \(0\) なので何も足さない

総和は4で条件を**満たす**ので、 `YES` と出力してプログラムを終える(`return 0`)

初めのうちは分かりづらいかもしれませんが慣れと分かりやすいと思います。

### 演習問題

再帰関数の回で扱った問題の中にはbit全探索でも解けるものがたくさんあります。下の問題を `bitset` か上で紹介した多くの人が使う手法のどちらかを使って解いてみて下さい。

- [C - たくさんの数式](https://atcoder.jp/contests/arc061/tasks/arc061_a)
- [C - Train Ticket](https://atcoder.jp/contests/abc079/tasks/abc079_c)
- [A - 高橋君とお肉](https://atcoder.jp/contests/arc029/tasks/arc029_1)  
\(N\) の数字によって場合分けをしても解けますが、bit全探索を使って解いてみてください
- [D - 派閥](https://atcoder.jp/contests/abc002/tasks/abc002_4)
- [C - Skill Up](https://atcoder.jp/contests/abc167/tasks/abc167_c)

余裕がある人向けの問題

- [C - All Green](https://atcoder.jp/contests/abc104/tasks/abc104_c)
- [C - ORXOR](https://atcoder.jp/contests/abc197/tasks/abc197_c)
- [C - HonestOrUnkind2](https://atcoder.jp/contests/abc147/tasks/abc147_c)