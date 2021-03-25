function sethtml(s,html){
    if(s.match(/table/) !== null){
        let ps = s.replace("table","").split(" ");
        $(`#table${ps[0]}`).after(html);
        $(".table-seg").eq(Number(ps[1])).addClass("active");
        let has = setInterval(() => {
            if($(".table-seg").eq(Number(ps[1])).hasClass("active")){
                console.log($(".table-seg.active").offset());
                $(".table").scrollTop($(".table-seg.active").offset().top - $(".table").offset().top - 10);
                clearInterval(has);
            }
        },50);
    }
    else{
        if(s === "header")$("head").prepend(html);
        else $(`#${s}`).after(html);
    }
}

function setup(vec){
    let htmls = new Object();
    vec.forEach((s) => {
        if(s.match(/table/) !== null){
            let tab = s.replace("table","").split(" ");
            return $.ajax({
                type: "GET",
                url: `/kclc-kaisei.github.io/assets/html/table${Number(tab[0])}.html`,
                success: function(data){
                    htmls[s] = data;
                }
            })
        }
        else{
            $.ajax({
                type: "GET",
                url: `/kclc-kaisei.github.io/assets/html/${s}.html`,
                success: function(data){
                    htmls[s] = data;
                }
            })
        }
    });
    //全要素埋まったら表示
    let eleok = setInterval(() => {
        let ok = true;
        vec.forEach((id) => {
            if(htmls[id] === undefined)ok = false;
        })
        if(ok){
            for(let i = 0;i < vec.length;i++){
                sethtml(vec[i],htmls[vec[i]]);
            }
            $(".main").css("display","block");
            clearInterval(eleok);
        }
    },50);
}
