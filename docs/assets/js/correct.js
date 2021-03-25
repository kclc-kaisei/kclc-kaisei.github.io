function check(i){
    const ans = $(".prob").eq(i),cor = $(".answer").eq(i);
    if(cor.attr("open") === "open")return;
    if(ans.val() === cor.attr("data-val"))alert("正解!");
    else alert("不正解!");
}
