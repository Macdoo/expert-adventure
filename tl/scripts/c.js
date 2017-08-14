function(context, args){ // t:#s.an.example
    var co = new Array("red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple")
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
    function brutec(a,pa){
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
            if (tp == "c001" && !d){
                
            }
            else if (tp == "c002" && !d){
                
            }
            return{ok:true,msg:rlog()}
        }else{
            return{ok:false,msg:"!EZ"}
        }
    }
}