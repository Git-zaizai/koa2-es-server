/**
 * @param {{[string]:string}} data
 * */
export function stringToType(data) {
    const result = data
    for (const itemKey in data) {
        if (data[itemKey] === 'true') {
            result[itemKey] = true
        } else if (data[itemKey] === 'false') {
            result[itemKey] = false
        } else if (/^(-?\d+)\.?(\d*)$/.test(data[itemKey])) {
            result[itemKey] = Number(data[itemKey])
        }
    }
    return result
}


export function typeOf(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
}