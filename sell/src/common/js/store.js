export function saveToLocal(id, key, value) {
    let seller = window.localStorage.__seller__
    // 如果没有localStorage.__seller__，初始化
    if (!seller) {
        seller = {}
        seller[id] = {}
    } 
    // 如果有localStorage.__seller__,把他解析为对象
    else {
        seller = JSON.parse(seller)
        // 判断是否有这个id,如果没有，初始化
        if (!seller[id]) {
            seller[id] = {}
        }
    }
    // 转化为对象字符串写入
    seller[id][key] = value
    window.localStorage.__seller__ = JSON.stringify(seller)
}
export function loadFromLocal(id, key, def) {
    // 判断是否有这个localStorage.__seller__
    let seller = window.localStorage.__seller__
    // 如果没有直接返回false
    if (!seller) {
        return def
    }
    //如果有判断是否有这个id，如果没有直接返回false
    seller = JSON.parse(seller)[id]
    if (!seller) {
        return def
    }
    // 如果有返回他的value
    let ret = seller[key]
    return ret || def
}
