function wait(n,f){
    let cnt = 0;
    let inv = setInterval(() => {
        cnt++;
        if(cnt == 1){
            f();
            clearInterval(inv);
        }
    },n);
}
async function setup_sub(s){
    $.ajax({
        type: "GET",
        url: `/kclc-kaisei.github.io/assets/html/${s}.html`,
    }).done((data) => {
        $(`#${s}`).after(data);
    })
}
async function table(table_id,active_element){
    $.ajax({
        type: "GET",
        url: `/kclc-kaisei.github.io/assets/html/table${table_id}.html`,
    }).done((data) => {
        $(`#table${table_id}`).after(data);
        $(".table-seg").eq(active_element).addClass("active");
    })
}

//priority:
//header navbar table mathjax
function setup(vec){
    setup_sub("header").then(() => {
        let cnt = 0;
        wait(50,function(){
            if(cnt === 1)clearTimeout(timeout);
            cnt++;
            vec.forEach(ele => {
                if(ele.match(/table/) !== null){
                    ele = ele.replace("table","").split(" ");
                    table(Number(ele[0]),Number(ele[1]));
                }
                else if(ele != "header")setup_sub(ele);
            });
        })
    }).then(() => {
        wait(250,() => $(".main").css("display","block"));
    })
}