function(context, args){ // t:#s.an.example
    var p = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
    var pass = ["open", "release", "unlock"];
    var d = false;
    var prms = {};
    var t = args.t;
    var type = "";
    var l = #s.scripts.lib();
    
    function rlog(){
        r = "";
        logs = l.get_log();
        for (l in logs){
            r = r + "\n" + l;
        }
        return {ok:false, msg:r}
    }
    function nlck(str){
        var un = "!LOCK_UNLOCKED";
        if(str.substr(0, un.length) === un){
            d = true;
            return true;
        }
        return false;
    }
    function brk(str){
        return (str.substr(0,2) === "De" || nlck(str));
    }
    //submits target to save space
    function s(args){
        var rtn = t.call(prms);
        return rtn;
    }
    
    while (!d){
        #D("started while")
        var r = s(args);
        var l = r.indexOf("EZ");
        if (l > -1){
            type = r.substr(l,5);
            var k = -1;
            do{
                k += 1;
                prms[type] = pass[k];
            }while(!brk(s(args)) && !d)
            if (type === "EZ_21"){
                return {ok:success, msg:"21 in"};
            }
            else if (type === "EZ_35"){
                var i = -1;
                do{
                    i += 1;
                    prms.digit = i;
                }while(!brk(s(args)) && !d)
            }
            else if (type === "EZ_40"){
                var i=-1;
                do{
                    i += 1
                    prms.ez_prime = p[i]
                }while (!brk(s(args)) && !d)
            }
            return {ok:true, msg:"!EZ "};
        }
        else{
            return {ok:false, msg:"np"};
            break;
        }
    }
}