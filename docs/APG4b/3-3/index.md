3.03.STLのコンテナ
============

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_aa){:target="_blank"}


APG4bで紹介されたものをそれぞれざっとまとめておきます。忘れた時に見返すメモのように使ってください。
個人的にコンテストでの優先順位が高い順番に書いています。

### map

添え字が `int` 以外でも使える配列のイメージ

宣言
```c++
map<string,int> mp;
```
要素を追加、取得
```c++
mp["one"] = 1;
mp["two"] = 2;
cout << mp["one"] << endl; // 1
cout << mp["two"] << endl; // 2
```
要素を全て取得
```c++
mp["one"] = 1;
mp["two"] = 2;
mp["three"] = 3;
for(auto p : mp){
    cout << p.first << ":" << p.second << endl;
}
// 出力結果:
// one:1
// three:3
// two:2
```

### set

重複を無くしてくれる

宣言
```c++
set<int> S;
```
要素を追加、削除
```c++
S.insert(1);
S.insert(3);
S.insert(5);
S.erase(3);
S.erase(5);
```
要素を全て取得
```c++
S.insert(3);
S.insert(1);
S.insert(5);
for(int x : S){
    cout << x << endl;
}
// 出力結果:
// 1
// 3
// 5
```

### lower_bound,upper_bound(STLの関数)

**sort済みの配列**にのみ使える関数。この関数の中では二分探索が行われています。二分探索については後々説明します。

基本操作
```c++
vector<int> vec = {1,3,5,7,9};
cout << *lower_bound(vec.begin(),vec.end(),3) << endl; // 3
cout << *lower_bound(vec.begin(),vec.end(),4) << endl; // 5
cout << *upper_bound(vec.begin(),vec.end(),3) << endl; // 5
```

APG4bでは紹介されてなかった使い方
```c++
vector<int> vec = {1,3,5,7,9};
cout << lower_bound(vec.begin(),vec.end(),4) - vec.begin() << endl; // 2 (4以上の要素は5で、これは2番目の位置にあるため)
cout << lower_bound(vec.begin(),vec.end(),3) - vec.begin() << endl; // 1 (3以上の要素は3で、これは1番目の位置にあるため)
```

### priority_queue

大きい要素から取り出す。

宣言
```c++
priority_queue<int> pq;
```
基本操作
```c++
priority_queue<int> pq;
pq.push(10);
pq.push(3);
pq.push(6);
ps.push(1);
while(!pq.empty()){
    cout << pq.top() << endl;
    pq.pop();
}
// 出力結果:
// 10
// 6
// 3
// 1
```
小さいものから取り出す方法
```c++
priority_queue<int,vector<int>,greater<int>> pq;
```

### queue

後ろから入れて前から出す

宣言
```c++
queue<int> que;
```
基本操作
```c++
que.push(2);
que.push(1);
que.push(3);
while(!que.empty()){
    cout << que.front() << endl;
    que.pop(); // popをしないと無限ループ
}
// 出力結果:
// 2
// 1
// 3
```

### deque

前からも後ろからも入れられて前からも後ろからも出せる

宣言
```c++
deque<int> deq;
```
基本操作
```c++
deq.push_back(10);
deq.push_back(1);
deq.push_back(3);

cout << deq.front() << endl; // 10
deq.pop_front();

cout << deq.back() << endl;  // 3
deq.pop_back();

deq.push_front(5);
deq.push_back(2);

cout << deq[1] << endl; // 1
```

### stack

上にいれて上から出す

宣言
```c++
stack<int> st;
```
基本操作
```c++
st.push(2);
st.push(1);
st.push(3);
while(!st.empty()){
    cout << st.top() << endl;
    st.pop();
}
// 出力結果:
// 3
// 1
// 2
```

### unorderd_map

`map` よりも少し速い、基本的には `map` を使うことを推奨
操作は `map` と大体同じ

### unorderd_set

`unorderd_map` と同じで、`set` よりも少し速いが、基本的には `set` を使うことを推奨
操作は `set` と大体同じ

### 演習問題

- [EX23 - 最頻値](https://atcoder.jp/contests/apg4b/tasks/APG4b_bz)
- [C - 1-SAT](https://atcoder.jp/contests/abc187/tasks/abc187_c)
- [C - Poll](https://atcoder.jp/contests/abc155/tasks/abc155_c)
- [C - Tsundoku](https://atcoder.jp/contests/abc172/tasks/abc172_c)