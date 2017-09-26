/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(){
    let url = window.location.search
    let obj = {}
    // 正则表达式
    /**
     * [?&]：匹配一个 "?" 或者 "&"，
     * [^?&]+：后面紧跟着一个或多个非 "?" 或 "&" 的字符
     * =：匹配 "="
     * [^?&]+："=" 后面跟着一个或多个非 "?" 或 "&" 的字符
     */
    let reg = /[?&][^?&]+=[^?&/]+/g
    let arr = url.match(reg)
    // ["?id=12345",'&a=b']
    if(arr){
        arr.forEach((item)=>{
            let tempArr = item.substring(1).split('=')
            let key =decodeURIComponent( tempArr[0])
            let value = decodeURIComponent(tempArr[1])
            obj[key]=value
        })
    }
    
    return obj
}