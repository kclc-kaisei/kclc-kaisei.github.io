1.12.文字列と文字
===========

[APG4bの該当ページ](https://atcoder.jp/contests/APG4b/tasks/APG4b_m){:target="_blank"}

### コメント

APG4b内では文字列 \(S\) の \(i\) 番目にアクセスするときに `S.at(i)` という書き方をしていますが、
`S[i]` という書き方をすることもでき、多くの人がこちらの記法を使っています。  
`S[i]` は添字の範囲が正しくなくてもエラーを出してくれないのですが、`S.at(i)` よりも `S[i]`
の方が見やすいのでこちらを使うことを推奨します。


### 演習問題

文字列を扱う問題も数多くあります。

- [EX12 - 足したり引いたり](https://atcoder.jp/contests/APG4b/tasks/APG4b_ck){:target="_blank"}
- [A - 居合を終え、青い絵を覆う / UOIAUAI](https://atcoder.jp/contests/abc049/tasks/abc049_a){:target="_blank"}
- [A - AtCoder *** Contest](https://atcoder.jp/contests/abc048/tasks/abc048_a){:target="_blank"}
- [A - Addition and Subtraction Easy](https://atcoder.jp/contests/abc050/tasks/abc050_a){:target="_blank"}
- [A - 添字](https://atcoder.jp/contests/abc041/tasks/abc041_a){:target="_blank"}
- [A - お茶](https://atcoder.jp/contests/abc038/tasks/abc038_a){:target="_blank"}
- [A - 複数形](https://atcoder.jp/contests/abc029/tasks/abc029_a){:target="_blank"}
- [A - 高橋くんの研修](https://atcoder.jp/contests/abc015/tasks/abc015_1){:target="_blank"}
- [A - ハンドルネーム](https://atcoder.jp/contests/abc010/tasks/abc010_1){:target="_blank"}

余裕がある人向けの問題(少し難しいです)

- [B - Minesweeper](https://atcoder.jp/contests/abc075/tasks/abc075_b){:target="_blank"}
- [B - Multiple of 9](https://atcoder.jp/contests/abc176/tasks/abc176_b){:target="_blank"}

ヒント:  
`(文字列){:target="_blank"}[i] - '0'` でその文字列のi番目の**文字**を**数字**として取得できます。