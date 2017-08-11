function(context, args){ // t:#s.an.example
    var pw = new Array("open", "release", "unlock")
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
    function nlck(str){
        var un = "UNLOCK"
        if(str.includes(un)){
            d = true;
            return true;
        }
        return false;
    }
    /*function brk(str){
        return (str.includes("Den") || nlck(str))
    }*/
    function ps(str){//passed
        return (str.includes("Req") || nlck(str))
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
        var tl = lr.indexOf("EZ")
        if (tl > -1){
            tp = lr.substr(tl,5)
            brute(pw,tp)
            if (tp == "EZ_35" && !d){
                var di = new Array(0,1,2,3,4,5,6,7,8,9)
                brute(di,"digit")
            }
            else if (tp == "EZ_40" && !d){
                var pri = new Array(2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97)
                brute(pri,"ez_prime")
            }
            return{ok:true,msg:rlog()}
        }else{
            return{ok:false,msg:"!EZ"}
        }
    }
}