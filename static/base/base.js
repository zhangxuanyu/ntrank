import axios from 'axios';
window.baseurl = 'http://service.tokenrank.net'
class basefn{
    //数据
    constructor() {
          
    }
    //返回时间
    timeuse(aaa,lengthflag,separatarr){
        var ddd = new Date(aaa*1000)
        var year = ddd.getFullYear()
        var month = ddd.getMonth()+1
        if(month < 10){
            month = '0' + month
        }
        var day=ddd.getDate();
        if(day < 10){
            day = '0' + day
        }
        var h = ddd.getHours()
        if(h < 10){
            h = '0' + h
        }
        var m = ddd.getMinutes()
        if(m < 10){
            m = '0' + m
        }
        var s = ddd.getSeconds()
        if(s < 10){
            s = '0' + s
        }
        if(lengthflag){
            return year+separatarr[0]+month+separatarr[1]+day + separatarr[2]+h+separatarr[3]+m+separatarr[4]+s
        }else{
            return year+separatarr[0]+month+separatarr[1]+day
        }
        
    }
    //数据请求
    fornew(url,argument){
        return new Promise(function(resolve,reject){
            axios.post(window.baseurl+url,
                argument,
             {
                 headers: {'Content-Type': "application/x-www-form-urlencoded"}
             }).then(res=>{
                resolve(res)
             })
        })
    }
    //排序方法
    rank(num,string,arr){      
        var list = arr
        setTimeout(()=>{         
            if(-1 == num ){
                 //从小到大
                list.sort(function(a,b){
                    return  parseFloat(a[string].replace(/,/g,""))-parseFloat(b[string].replace(/,/g,""))
                })
            }else{
                 //从大到小
                list.sort(function(a,b){
                    return  parseFloat(b[string].replace(/,/g,""))-parseFloat(a[string].replace(/,/g,""))
                })
            }
        },500)
    }
    //数字字符串添加逗号
    conversion(aa){
        if(typeof(aa)=='string'){
            var str = aa
        }else{
            var str = aa.toString()
        }
        if(/\./.test(str)){
            return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
        }else{
            return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
        }
    }
    //获取页面传值
    getid(){
        let href = window.location.href;
                if(href.indexOf('?')>-1){
                    var code = window.location.href.split('?')[1].split('=')[0];
                    var num = window.location.href.split('?')[1].split('=')[1];
                    // this.code = num
                    var num1 = num.replace(/(%[0-9]+)/, ' ')
                    var num2 =  num.replace(/(%[0-9]+)/, '-')
                    return num
                }
    }
}

var newfn = new basefn()

export default newfn