# 再帰関数のいろは
### はじめに

この章では、「再帰関数とは何か」から「再帰関数の実装方法」まで丁寧に説明します。  
この記事では、[APG4bの該当記事](https://atcoder.jp/contests/apg4b/tasks/APG4b_v)よりも**具体例**を多めに交えながら説明したつもりです。

APG4bを先に読んでから、こちらの記事の練習問題だけを解いていく形でも、こちらの記事を全て読んでいく形でも、どちらでも理解することができると思います。

ところで、再帰"関数"というように、再帰関数を理解するためにはある程度の関数の知識が必要となるので、関数ってなーに？という方は[こちら](https://kclc-kaisei.github.io/APG4b/1-15/)を読んでください。  
分からない言葉が出てきた時も、これより前の章を読んで復習することをおすすめします。  

### 再帰関数の雰囲気を知ろう

まず再帰関数とはなんでしょうか。  
簡潔に言えば、プログラム内で、<b>ある関数の中</b>にその関数<b>自身</b>の呼び出しが含まれているものです。といっても分かりにくいので、以下の例1で考えてみましょう。

#### 例1
!!! example "-例1-"  
    今、$4 \times 4$のブロックチョコレート🍫があり、これを半分に割ることを繰り返します。  
    何回割れば、$1 \times 1$のピース$16$つに分けられるでしょうか？

この問題は、計算で簡単に求められますが、あえて割っていくプロセスを言葉にすると以下のようになります。  

> 操作：今ある$4\times4$のチョコレートのピースを<b>半分に割り</b>、  
> 　　　それによってできた$2\times4$のピース$2$つをそれぞれ<b>半分ずつに割り</b>、  
> 　　　それによってできた$2\times2$のピース$4$つをそれぞれ<b>半分ずつに割り</b>、  
> 　　　それによってできた$2\times1$のピース$8$つをそれぞれ<b>半分ずつに割り</b>、  
> 　　　最後に$1\times1$のピース$16$つが残る。


上から順に、1回,2回,4回,8回と、割る操作を行うため、答えは15回とわかります。

これは「チョコレートのピースを<b>半分に割る</b>」という処理をする関数に、<u>複数回、引数としてチョコレートを渡す</u>ということを繰り返しているといえます。
イメージとしては、次のような関数です。
```cpp
void cut(チョコレート){
    チョコレートを半分に割る;
    cut(割った後のチョコレート);
    cut(割った後のチョコレート);
}
```
`cut(割った後のチョコレート)`という処理が<b>2回</b>書かれているのは、今あるチョコレートを半分に割って、割った後にできる<b>2つ</b>のピースをそれぞれまた割るためです。

この、複数回割るチョコレートですが、(操作を重ねると)大きさが変わっていくため、for文などを使ったループだと実装が難しく、再帰関数を使った方が実装が楽にすむということです。
現段階で、実装方法を理解する必要はありませんが、疑似コードを載せておきます。
```cpp
void cut(今のサイズ){//ブロックチョコレートの1辺の長さが引数
    if(今のサイズ == 1){
        return;//サイズが1だとこれ以上分けられません
    }
    割った回数の合計++;
    cut(今のサイズ / 2);//割った内の1ピース
    cut(今のサイズ / 2);//割った内のもう1ピース
}
```



### 再帰関数を実装してみよう
先ほどの例では、再帰関数の雰囲気しか伝わっていないと思うので、ここでは、もう少し簡単な例で実装してみましょう。

#### 例2

!!! example "-例2-"  
    再帰関数を使って、\(1\)から\(42\)を順に出力して下さい。
解説・ソースコードはこちら↓
```cpp
#include<bits/stdc++.h>
using namespace std;
void func(int n){
    if(n == 43){
        return;
    }
    cout << n << endl;
    func(n + 1);
}
int main(){
    func(1);
}
```

まず、`main`関数が実行されます。  
`main`関数には
```cpp
func(1);
```
と記述されています。これは、`func`関数に引数`1`を渡しています。  
次に`func`関数では
```cpp
if(n == 43)return;
cout << n << endl;
func(n + 1);
```
と記述されています。  
はじめに2行目に注目すると、これは`n`(=`func`関数の引数)を<b>出力する</b>処理なので、`1`を出力します。  
次に3行目に注目します。これは再度`func`関数を呼び出しているように見えますが、引数として新たに`n + 1`を渡しているため、呼び出された`func`関数では<b>別の処理</b>が行われます。  
具体的には、
> `main`関数で`func(1)`が呼び出され、  
> `func(1)`で`func(2)`が呼び出され、  
> `func(2)`で`func(3)`が呼び出され、  
> ...

という流れになります。
`func(n)`では2行目において`n`が出力されることを踏まえれば、`func(1)`,`func(2)`,...,`func(42)`が呼び出されれば、`1`,`2`,...,`42`が出力されることになります。  

ここで1行目に注目すると、これは、`n`が$43$の時(=`func(43)`が呼び出された時)に`return`していることが分かります。`return`はその関数を終了する処理です。この場合、返り値はありません。

ここで`return`をすると、`func(43)`での$43$の出力処理(2行目)や、`func(44)`の呼び出し処理(3行目)は行われないため、一連の処理は終了し、結果的に$1$から$42$を出力できたことになるのです。  

実際にAtcoderのコードテストなどで実行すると、正しい結果が得られたことが分かります。  
このように、関数がその関数自身を(引数を変えながら)繰り返し呼び出すことを再帰といいます。ある程度感覚は掴めてきたでしょうか？  
<br>

#### 練習問題1
!!! example "-練習問題1-"
    再帰関数を使って、\(1〜100\)の総和を出力してください。  
    分からない時も、ぜひヒントや解説を読んで、理解してみてください。


??? tip "クリックしてヒントを表示"
    例2のように、再帰関数<code>func</code>を作成し、<code>func</code>で数字を加算します。  
    グローバル変数を使うと簡単ですが、グローバル変数を使わないで実装するには、関数の返り値を設定すれば良いです(<code>x</code>を返り値にするには<code>return x;</code>と記述します)。
↓
??? note "クリックして解説・ソースコードを表示"
    <p>例2では、<code>func</code>関数を作成し、<code>func(N)</code>では<code>N</code>を出力する、という処理を行なっていました。
    <br>この問題も同様な考え方で解くことができます。<br>
    まず、大まかに、以下のような方針を立ててみます。</p>
    <blockquote>
    <code>func(1)</code>では\(1〜100\)の和を返り値に、<br>
    <code>func(2)</code>では\(2〜100\)の和を返り値に、<br>
    <code>func(3)</code>では\(3〜100\)の和を返り値に、<br>
    ...<br>
    <code>func(100)</code>では\(100〜100\)の和を返り値にする<br>
    </blockquote>
    <p>このように定めれば、この問題は<code>func(1)の返り値</code>が答えになります。<br>
    ここで、\(1 \leq\)<code>x</code> \(< 100\)を満たす<code>x</code>に対して、<code>func(x)の返り値</code>を<code>func(x + 1)の返り値</code>を使って求めることを考えます。</p>
    <p>例えば、<code>func(3)の返り値</code>を<code>func(4)の返り値</code>を使って求めることを考えてみます。<br>
    <code>func(3)の返り値</code>は\(3〜100\)の和で、<code>func(4)の返り値</code>は\(4〜100\)ですから、<br>
    <code>func(3)の返り値</code>\(=\)\(3 + \)<code>func(4)の返り値</code><br>
    が成り立っていることが分かります。</p>
    これより、\(1 \leq\)<code>x</code> \(< 100\)を満たす全て<code>x</code>に対して、<br>
    <p><code>func(x)の返り値</code>\(=\)<code>x</code>\(+\)<code>func(x + 1)の返り値</code><br>
    が成り立つことも分かります。これをそのまま実装すればよいです。  
    具体的には、以下のようにします。
    </p>

    ```cpp
    int func(int x){
        return x + func(x + 1);
        //func(x)の返り値 = x + fun(x + 1)の返り値
    }
    ```

    しかしこのままだと、永遠に`func`関数が呼び出され続ける、無限ループが起こります。  
    ここでは、<code>func(100)</code>の時の返り値が\(1〜100\)の和で、<code>func(101)</code>を呼び出す必要はありません。  
    よって、条件分岐を付け足せばよいです！
    完成形はこちら↓
    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    int func(int x){
        if(x == 100)return 100;
        return x + func(x + 1);
    }
    int main(){
        cout << func(1) << endl;
    }
    ```

<br>

#### 練習問題2
!!! example "-練習問題2-"
    下のリンク先の問題を再帰関数を用いて解いてください。  
    <a href = "https://atcoder.jp/contests/abc055/tasks/abc055_b">ABC055 B - Training Camp</a> (diff:<font color = "gray">332</font>)


??? tip "クリックしてヒントを表示"
    問題文より、\(1〜N\)の積を求めればよいです。<br>
    基本的には練習問題1と同じように解けますが、答えの数がとても大きくなるため、<code>long long</code>型などの大きな数を扱えるデータ型を使っても上限を超えてしまいます。<br>
    そこで、答えを\(10^9+7\)で割った余りを求めればよいことに注目しましょう！
↓
<details>
<summary>クリックして解説・ソースコードを表示</summary>
<p>基本的には練習問題1と同様に実装し、掛け算する毎ステップで、現在までの積を\(10^9+7\)で割った余りにしてあげればよいです。</p>
<p>これは、<br>
\((A_1 \times A_2 \times \dots \times A_N) \ \% \ M \ = 
(\dots(((A_1 \ \% \ M) \times A_2) \ \% \ M) \dots \times A_N) \ \% \ M\)<br>
が成立する(つまり、「数たちの<b>積の余り</b>」と「数たちの<b>余りの積</b>」は一致する)ことを利用しています。<br></p>
<p>詳しくは、<a href = "https://www.studyplus.jp/430">合同式の証明</a>を参照してください。<br>
このテクは競プロでよく使いますよ！<br></p>
<p>また、余りをとりながら計算していっても、掛け算する過程では約\(10^{18}\)の数が出てくるため、<code>int</code>型ではなく<code>long long</code>型を使いましょう。<br></p>
ソースコードは以下のようになります↓
```cpp
#include <bits/stdc++.h>
using namespace std;
long long func(long long x){
    if(x == 1){
        return 1;
    }
    return (x * func(x - 1)) % 1000000007;
}
int main(){
    long long n;
    cin >> n;
    cout << func(n) << endl;
}
```
</details>

<br>

### 再帰関数を役立てる！
今までは再帰関数を使わない方が簡単に解ける問題ばかり解いてきましたが、ここからは、再帰関数が大いに役立つ問題を解いていきます。  
練習問題は、全部解いてみましょう。最初は自力で考えてみたほうが良いですが、詰まったらどんどん解説を見ましょう。  
発展問題は、少し難しいのも混じっていますが、できるだけ解いてみてください。もちろん、解説を見て解くのも良いです。


<h3><li>列挙する</li></h3>

#### 練習問題3
!!! example "-練習問題3-"
    下のリンク先の問題を解いてください。<br>
    <a href = "https://www.hackerrank.com/contests/kclc-educational-contest/challenges/2-or-1">Hackerrank - *2 or +1</a>

これは、与えられた整数$N$に対して、$\times2$または$+1$するという操作を最大で$K$回行う必要があります。  
素直に、あり得る**全ての操作パターン**を実行して、得られた整数の個数をカウントしていくのが1番良いです。

具体的には、同じ操作を繰り返し行うことから、再帰関数を使った実装が便利です。何通りの整数が得られたかカウントする時は、<b>違う操作手順で同じ整数が得られる場合</b>も考慮して、グローバル配列を用いましょう。  
計算量は、$O(2^K)$になります。

詳しくは、以下のソースコードを参照してください。
```cpp
#include<bits/stdc++.h>
using namespace std;

int k;
bool can[200000];//can[i]は"k回以下の操作で整数iを得ることができるか"というbool値

//関数funcの引数は(現在の整数,累計操作回数)を表す
void func(int num,int nowk){
    //整数numが得られた
    can[num] = true;

    //累計操作回数がまだK回未満であれば次の操作へ
    if(nowk < k){
        //*2の操作を行なった時
        func(num * 2,nowk + 1);
        //+1の操作を行なった時
        func(num + 1,nowk + 1);
    }
}

int main(){
    int n;
    cin >> n >> k;//kはグローバル変数

    func(n,0);//操作を0回行なった時点での整数nからスタート

    int res = 0;
    for(int i = 0;i < 200000;i++){
        if(can[i]){
            res++;//得られた整数の個数をカウント
        }
    }
    cout << res << endl;
}
```
<br>

#### 発展問題1
!!! example "-発展問題1-"
    下のリンク先の問題を解いてください。<br>
    <a href = "https://www.hackerrank.com/contests/kclc-educational-contest/challenges/2-or-1-or-1">Hackerrank - *2 or +1 or -1</a>

??? tip "クリックしてヒントを表示"
    <p>基本的な考え方は、先ほどの練習問題3と同じです。<br>
    しかし、全く同じ実装をしても、入出力例3のような\(K\)が大きいケースでは時間がかかり過ぎてしまいます。そこでひと工夫が必要です。</p>
    <p>ここでは、再帰関数を呼び出す回数を減らせないか考えてみましょう。<br>
    再帰関数を呼び出す回数を約\(10^6\)回くらいにできれば、正解することができますよ！</p>
↓
<details>
<summary>クリックして解説・ソースコードを表示</summary>
<p>この問題での基本的な考え方は、練習問題3と同じです。<br>
しかし、この問題では、各数から\(3\)つの数が作れるため、愚直に\(K\)回の操作をシミュレーションすると、再帰関数の呼び出し回数は\(3^{20}=約3\times10^9\)回となってTLEしてしまいます。</p>
<p>では、どうやって再帰関数の呼び出し関数を減らせばよいでしょうか。</p>
<p>ここで、<b>メモ化再帰</b>という手法を使います。<br>
「メモ化再帰」とは、「途中の(計算)結果を配列などに格納しておいて、必要ならそれを使い回す」、というテクニックです。<br></p>
<p>今、この問題でどの部分を「メモ化」すれば良いか考えてみましょう。例えば、\(K=2\)の時での操作は以下のようになります。</p>
<blockquote>
0回の操作で<code>1</code>が<br>
1回の操作で<code>2</code>,<code>2</code>,<code>0</code>が<br>
2回の操作で<code>4,3,1</code> , <code>4,3,1</code> , <code>0,1,-1</code>が<br>
できる
</blockquote>
<p>ここで、\(2\)という整数が1回目の操作後に複数回登場していることに注目してください。<br>
当然ですが、どの、\(2\)という整数に操作をしても得られる整数は同じです。<br>
つまり、1回、ある整数が出現したら、その後にまたその整数が出現しても、それ以上操作を続ける必要はないということです。<br></p>
<p>よって、練習問題3の時のような、"整数が出現するか否か"を記録する配列をつくり、再帰関数の呼び出しをするときに、既に出現済みの整数については、その後の操作を打ち切れば(=再帰関数の呼び出しをやめれば)良いです。<br>
これによって、各整数が再帰関数の引数として呼び出される回数は、高々1回に抑えられるため、合計の呼び出し回数は最大\(2^{20}=約10^6\)回となり、この問題が解けました。</p>
ソースコード↓
<pre><code class = "cppcode">
</code></pre>
</details>
<br>

<h3><li>最大公約数</li></h3>

#### 練習問題4
!!! example "-練習問題4-"
    下のリンク先の問題を解いてください。<br>
    <a href = "https://www.hackerrank.com/contests/kclc-educational-contest/challenges/gcd-basic">Hackerrank - GCD (Basic)</a><br>
    ただし、この問題は前提知識がないと解くのが難しいので、わからない場合はヒントを見ることを推奨します。


??? tip "クリックしてヒントを表示"
    <p>この問題は正整数\(A,B\)がともに大きいため、\(1\)から順に素因数を探していく方法では、時間がかかり過ぎてしまいます。</p>
    <p>そこで<font color = "red"><big>\(Euclid\,\)の互除法</big></font>を利用して求めます。<br></p>
    <li><font color = "red">\(Euclid\,\)の互除法</font>とは</li><p>\(Euclid\,\)の互除法は、簡単にいえば2つの数の最大公約数を簡単に求める手法です。<br>
    これはみなさんが自分で最大公約数を求める時に役立つのはもちろん、コンピューターに大きな数の最大公約数を求めてもらう時にも役立ちます。</p>
    <p>具体的には、
    <div style="padding: 10px; margin-bottom: 10px; border: 5px double #333333;">
        \(a\)を\(b\)で割った余りを\(r\)としたとき<br>
        <big>\(GCD(a,b)=GCD(b,r)\)</big><br>
        (ただし、\(GCD(a,b)\)は\(a\)と\(b\)の最大公約数を表す)
    </div>
    という性質です。</p>
    <li><font color = "red">\(Euclid\,\)</font>の互除法はどうして成り立つのか</li>
    <p>この\(Euclid\,\)の互除法は、主に大きな数の最大公約数を求める時に役立つと述べましたが、これは与えられた\(2\)つの数を、\(GCD\)を変えずに小さく変形していっています。<br>
    具体的に、どのような変形をすれば、\(2\)つの数を、\(GCD\)を変えずに小さくできるか考えてみましょう。</p>
    <p>例として、\(63\)と\(49\)で考えてみます。\(GCD(63,49)=7\)です。<br>
    早速小さい数字に変形したいのですが、ここで、<b>\(63\)も\(49\)も\(GCD(63,49)\)の倍数</b>であることに注目してください。<br>
    最大公約数なんだから当たり前じゃん、と思うでしょうが、これはとても重要です。<br>
    なぜなら、これは<b>\(63\)と\(49\)の差(\(=14\))も\(GCD(63,49)\)の倍数</b>であることを意味しているからです。<br>
    つまり、\(GCD(63,49)= GCD(63,14)=GCD(14,49)\)が成り立つのです。</p>
    <font color = "gray">
    <details>
    <summary>(厳密には(難))</summary>
    \(a \leq b\)を満たす2つの整数\(a,b\)について、\(a=p \times GCD(a,b),b=q \times GCD(a,b)\)となるように整数\(p,q\)を定める。<br>
    すると、\(GCD\,\)の定義から、\(p\,\)と\(q\,\)は互いに素である。<br>
    ここで、\(GCD(b-a,a) \ne GCD(a,b)\,\)と仮定すると、<br>
    <br>
        \(GCD(b-a,a) \ne GCD(a,b)\)<br>
        \(\Leftrightarrow GCD((q - p) \times GCD(a,b),p \times GCD(a,b)) \ne GCD(a,b)\)<br>
        \(\Leftrightarrow GCD(q-p,p) > 1\)<br>
    <br>
    が成り立つ。<br>
    しかし、\(q-p\)と\(p\)が共通因数を持つということは、この2つの和である\(q\,\)も、\(p\,\)との共通因数を持っているということになり、これは矛盾。<br>
    よって、\(GCD(b-a,a) = GCD(a,b)\,\)が示された。<br>
    同様にして、\(GCD(b-a,b) = GCD(a,b)\,\)も成り立つ。<br>
    </details>
    </font>
    <br>
    <p>ここでは、より大きい数を小さくしたいので、\(63\)を\(14(63-49)\)に変えて、\(GCD(14,49)\,\)を求めることにします。</p>
    <p>同様に変形をすると、\(GCD(14,49)=GCD(14,35)\,\)となります。<br>
    さらに変形をしていくと、\(GCD(14,49)=GCD(14,35)=GCD(14,21)=GCD(14,7)\,\)となりますが、この3ステップでは、いずれも<b>小さい数が\(14\)</b>であるため、どれも、大きい数から\(14\)を引くという変形になっています。</p>
    <p>これは、「\(49\)」から「\(14\)」を<b>できるだけ引く</b>\(=\)「\(49\)」を「\(14\)」で<b>割った余りにする</b>、という操作にまとめられます。<br>
    つまり、\(a\,\)を\(b\,\)で割った余りを\(r\,\)としたとき、\(GCD(a,b)=GCD(b,r)\,\)が成り立つことがわかり、これはユークリッドの互除法そのものです！！<br>
    </p>
    <br>
    <p>これらを踏まえて、\(GCD(63,49)\)を求める流れは以下のようになります。</p>
    <p><blockquote>
    \(GCD(63,49)\)<br>
    \(=GCD(49,14)\)←\(63\)を\(49\)で割った余りは\(14\)<br>
    \(=GCD(14,7)\)←\(49\)を\(14\)で割った余りは\(7\)<br>
    </blockquote>
    </p>
    <p>今、\(14\)と\(7\)という数字が出てきましたが、\(14\)を\(7\)で割った余りは\(0\)であるため、最大公約数は\(7\)であることが容易にわかります。</p>
    <p>以上で、\(GCD(63,49)\)を求めることができました。</p>
    <p>あとは、この操作を再帰関数を用いて実装すればよいです。<br>
    詳しい実装方法は、下の解説に書いてあります。</p>

↓

??? note "クリックして解説を表示"
    <p>解法はヒントに書いてあります。ここでは、実装方法を述べます。<br>
    例えば、\(GCD(63,49)\)を求める時、変形の流れは以下のようになるのでした。</p>
    <p><blockquote>
    \(GCD(63,49)\)<br>
    \(=GCD(49,14)\)←\(63\)を\(49\)で割った余りは\(14\)<br>
    \(=GCD(14,7)\)←\(49\)を\(14\)で割った余りは\(7\)<br>
    </blockquote>
    </p>
    <p>よって、関数<code>MyGCD</code>をつくり、引数に<code>a</code>,<code>b</code>を指定し、返り値(=答え)に<code>GCD(b,a % b)</code>を指定すれば良いです。</p>
    <p>具体的には、以下のようになります。
    <pre><code class = "cpp code">long long MyGCD(long long A, long long B) {
        if (A % B == 0) return B;
        else return MyGCD(B, A % B);
    }
    </code></pre></p>
    <p>しかし、ヒントでは、「大きい数」を「大きい数を小さい数で割った余り」にする、と書かれていたのに、このコードでは<code>a</code>,<code>b</code>の大小を判定する記述はありません。</p>
    <p>これは、例えば、<code>MyGCD(49,64)</code>を呼び出した時、\(49\)を\(64\)で割った余りを計算しますが、結局次に呼び出されるのが<code>MyGCD(64,49 % 64)</code>\(=\)<code>MyGCD(64,49)</code>となるため、大小が逆転することを利用しています。</p>
    <p>よって大小を判定する記述は不要で、あとは関数内1行目に、<code>a</code>が<code>b</code>で割り切れた場合に<code>MyGCD(a,b)</code>は<code>b</code>である、という処理をつけています。</p>
    !!! warning "注意点"
        <p>自分で実装したこの関数名を<code>gcd</code>(小文字)として、Atcoderのコードテストなどで実行すると挙動がおかしくなります。</p>
        <p>なぜなら、C++の標準ライブラリに、最大公約数を求める<code>gcd</code>という関数があり、そちらが呼び出されることがあるからです。</p>
        <p>しかしこの<code>gcd</code>関数は<b>Atcoderで使用することはできます</b>が、<b>Hackerrankでは使用できません</b>(バージョンが古いため)。</p>
        <p>⚠️注意⚠️してください。</p>
        <p>代わりに、<code>__gcd</code>という関数を使用することはできます。<br>
        こちらであれば、この問題を正解することができます。ぜひやってみてください。</p>
<br>


#### 発展問題2
!!! example "-発展問題2-"
    下のリンク先の問題を解いてください。<br>
    <a href = "https://atcoder.jp/contests/abc070/tasks/abc070_c">ABC070 C - Multiple Blocks</a><br>

<details>
<summary>クリックして解説を表示</summary>
<p>この問題は、\(T\)全ての最小公倍数を求める問題です。<br>
どのように求めれば良いでしょうか。<br>
みなさんは、手計算で最小公倍数を求める時、下の図のようなものを使うかもしれません。</p>
<div>
<img src = "https://res.studyplus.jp/gR1dEekzX9VP658DZ2xY71pdglAJyYp6QA2Nnv0wQebrMWjEo3mRq4LGBKL6Wz4l" width = "50%" height = "50%">
<p>画像は<a href = "https://www.studyplus.jp/392">こちら</a>から引用</p>
</div>
<p>この図で、左側の列に書かれている数たちは、もとの数たちの共通因数ですから、左側の列の数たちの積は、最大公約数(\(GCD\))になっているはずです。<br>
つまり、コンピュータで最大公約数を求めてしまえば、私たちが手計算する時と同じ原理で、最小公倍数を求めることができます。</p>
<p>\(G=GCD(T_1,T_2,\dots,T_N)\),最小公倍数を\(LCM(\dots)\)として式にすると、
\[
    LCM(T_1,T_2,\dots,T_N)=(T_1/G)\times(T_2/G)\times \dots \times (T_N/G) \times G
\]
となります。</p>
<p>複数の数の最小公倍数/最大公約数は、前から2つずつ順に求めてけばいいことを利用すれば、ソースコードはこのような感じになります。</p>

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    long long n;
    cin >> n;
    vector&lt;long long> t(n);
    for(int i = 0;i < n;i++)cin >> t[i];

    long long MyLCM = t[0];//最小公倍数を格納する。初期値はa_0。

    for(int i = 1;i < n;i++){
        long long MyGCD = __gcd(MyLCM,t[i]);
        MyLCM = (MyLCM / MyGCD) * (t[i] / MyGCD) * MyGCD;//i以前の最小公約数とa_iの最小公約数を求めている。
    }

    cout << MyLCM << endl;
}
```
</details>

<br>

<h3><li>部分和問題</h3>

#### 練習問題5
!!! example "-練習問題5-"
    下のリンク先の問題を解いてください。<br>
    <a href = "https://www.hackerrank.com/contests/kclc-educational-contest/challenges/subbill-sum-problem/problem">Hackerrank - SubBill Sum Problem</a>


??? note "クリックして解説・ソースコードを表示"
    <a href = "https://qiita.com/drken/items/23a4f604fa3f505dd5ad#3-1-部分和問題">こちら</a>と同じ問題です。<br>
    ソースコード例だけ載せておきます。

    ```cpp
    #include <bits/stdc++.h>
    using namespace std;
    int a[100];
    bool solve(int i,int v){//0~i番目の紙幣を使って価値の和をvにすることは可能か？
        if(a[i] == v){//i番目の紙幣を使えば実現可能
            return true;
        }
        else{
            if(i == 0){//
                return false;
            }
            return solve(i - 1,v) || solve(i - 1,v - a[i]);
        }
    }
    int main(){
        int n,k;
        cin >> n >> k;
        for(int i = 0;i < n;i++){
            cin >> a[i];
        }
        if(solve(n - 1,k))cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    ```
<br>

#### 発展問題3
!!! example "-発展問題3-"
    下のリンク先の問題を解いてください。<br>
    <a href = "https://atcoder.jp/contests/tdpc/tasks/tdpc_contest">Atcoder - Typical DP Contest A - コンテスト</a>


??? tip "クリックしてヒントを表示"
    練習問題5とあまり変わらない解法で解けますが、全く同じように実装すると、計算量が\(O(2^N)\)となり、TLEします。<br>
    ここで、発展問題1で使った考え方を適用してみましょう。
↓
<details>
<summary>クリックして解説を表示</summary>
<a href = "https://www.creativ.xyz/tdpc-a-1-660/">こちらのサイト</a>がわかりやすいです。
</details>
<br>

### 章末問題
<p>ここまでお疲れ様でした。</p>
<p>最後に、以下の問題を解いてみましょう。<br>
全てを短時間で解くのは大変ですが、ここまで来た方ならきっと解けると思います。
中には、再帰関数を使わなくても解ける問題もありますが、ぜひ再帰関数を使ってチャレンジしてみてください。</p>

* [ABC148 C - Snack](https://atcoder.jp/contests/abc148/tasks/abc148_c)(diff:<font color = "gray">63</font>)

* [ABC079 C - Train Ticket](https://atcoder.jp/contests/abc079/tasks/abc079_c)(diff:<font color = "gray">337</font>)

* [ABC109 C - Skip](https://atcoder.jp/contests/abc109/tasks/abc109_c)(diff:<font color = "brown">542</font>)

* [ABC118 C - Monsters Battle Royale](https://atcoder.jp/contests/abc118/tasks/abc118_c)(diff:<font color = "brown">646</font>)

* <a href = "https://www.hackerrank.com/contests/kclc-educational-contest/challenges/cookie-factory">Hackerrank - Cookie Factory</a>(<font color = "brown">茶diff</font>相当,解説はここ)

* [ABC161 D - Lunlun Number](https://atcoder.jp/contests/abc161/tasks/abc161_d)(diff:<font color = "green">991</font>)

* [ABC114 C - 755](https://atcoder.jp/contests/abc114/tasks/abc114_c)(diff:<font color = "green">1055</font>)

* [ABC045 C - たくさんの数式](https://atcoder.jp/contests/arc061/tasks/arc061_a)(diff:<font color = "green">1089</font>)

* [JOIポスター](https://atcoder.jp/contests/joisc2010/tasks/joisc2010_poster)(JOI難易度5)
