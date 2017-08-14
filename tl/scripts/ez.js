function(context, args){ // t:#s.an.example
    var pw = new Array("open", "release", "unlock")
    var co = new Array("red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple")
    var lo = new Array("vc2c7q", "5c7e1r", "cmppiq", "4jitu5", "uphlaw", "xwz7ja", "vthf6e", "tvfkyq", "6hh8xw", "sa23uw", "72umy0")
    var d = false
    var prms = {}
    var tp = ""
    var l = #s.scripts.lib();
    var lr = ""
    var c = ""
    function rlog(){
        var r = ""
        var logs = l.get_log()
        for (l in logs){
            r = r + "\n" + logs[l]
        }
        return r
    }
    function ps(str){//passed
        return (str.includes("Req") || brk(str))
    }
    function brk(str){//broken
        return (str.includes("Deni") || nlck(str))
    }
    function nlck(str){
        var un = "UNLOCK"
        if(str.includes(un) && !str.includes("CK_ER")){
            d = true;
            return true;
        }
        return false;
    }
    
    
    function s(args){//submit
        var rtn = args.t.call(prms)
        lr = rtn
        c = "t{"
        for (var p in prms){
            c+=p+":"+prms[p]+","
        }
        c+="}"
        l.log(c)
        return rtn
    }
    function brute(a,pa){
        for (var i=0;i<=a.length;i++){
            prms[pa] = a[i]
            s(args)
            l.log("r:"+lr)
            if (ps(lr)){
                break
            }
        }
    }
    while (!d)
    {
        s(args)
        if(nlck(lr)){return{ok:true,msg:"!lk"+lr}}
        //return{ok:false,msg:rlog()}
        tp = /(?!N)(\w+)(?=` lock\.)/.exec(lr)[0]
        l.log("t:"+tp)
        if (tp.includes("EZ")){
            brute(pw,tp)
            if (tp === "EZ_35" && !d){
                var di = new Array(0,1,2,3,4,5,6,7,8,9)
                brute(di,"digit")
                //return{ok:false,msg:"35"+rlog()}
            }
            else if (!d){
                var pri = new Array(2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97)
                brute(pri,"ez_prime")
                //return{ok:false,msg:"40"+rlog()}
            }
            //return{ok:false,msg:"while"+rlog()}
        }else if (tp.includes("c0")){
            //return{ok:false,msg:"c0"+rlog()}
            brute(co,tp)
            var ci = co.indexOf(prms[tp])
            if (tp === "c001"){
                prms.color_digit = prms[tp].length
            }
            else if (tp === "c002"){
                prms.c002_complement = co[(ci+4)%8]
            }
            else{
                //return{ok:false,msg:"03"+rlog()}
                prms.c003_triad_1 = co[(ci+3)%8]
                prms.c003_triad_2 = co[(ci+5)%8]
                //return{ok:false,msg:"c003"+rlog()}
                l.log(s(args))
                if (!brk(lr)){
                    prms.c003_triad_2 = co[(ci+3)%8]
                    prms.c003_triad_1 = co[(ci+5)%8]
                }
            }
            l.log(s(args))
            nlck(lr)
        }else if (tp=="l0cket"){
            brute(lo,tp)
        }else{return{ok:false,msg:"!1"+rlog()}}
    }
    return {ok:true,msg:"d"+rlog()}
}