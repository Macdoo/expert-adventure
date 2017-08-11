function(context, args){ // t:#s.an.example
    var p = [2]
    var pass = ["open", "release", "unlock"]
    var d = false
    var prms = {}
    var t = args.t
    var type = ""
    var l = #s.scripts.lib();
    function rlog(){
        var r = ""
        var logs = l.get_log()
        for (l in logs){
            r = r + "\n" + logs[l]
        }
        return r
    }
    function nlck(str){
        var un = "!LOCK_UNLOCKED"
        if(str.substr(0, un.length) === un){
            d = true;
            return true;
        }
        return false;
    }
    function brk(str){
        return (str.substr(0,2) === "De" || nlck(str))
    }
    function ps(str){
        return str.substr(0,2) === "Re"
    }
    //submits target to save space
    function s(args){
        var rtn = t.call(prms)
        return rtn
    }
    
    while (!d){
        l.log("e:while");
        var r = s(args)
        var lc = r.indexOf("EZ")
        if (lc > -1){
            type = r.substr(l,5)
            l.log("type:"+type);
            var k = -1
            do{
                l.log("e:word do");
                k += 1
                prms[type] = pass[k]
                return {ok:true, msg:rlog()+"\n"+s(args)}
            }while(!ps(s(args)) && !d)
            return {ok:true, msg:rlog()}
            if (type === "EZ_21"){
                return {ok:true, msg:"21 in"}
            }
            else if (type === "EZ_35"){
                var i = -1
                do{
                    i += 1
                    prms.digit = i
                }while(!brk(s(args)) && !d)
            }
            else if (type === "EZ_40"){
                var i=-1
                do{
                    i += 1
                    prms.ez_prime = p[i]
                }while (!brk(s(args)) && !d)
            }
            return {ok:true, msg:"!EZ "}
        }
        else{
            return {ok:false, msg:"np"}
            break;
        }
    }
    return {ok:true, msg:"I'm in"}
}