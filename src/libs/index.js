/**
 * ID generator
 */
export const makeID = () => '_' + Math.random().toString(36).substr(2, 9);


/**
 * Filter unique items
 * @param {Any} val Current value
 * @param {Number} idx Element index
 * @param {Array<any>} arr Array of items
 */
export const unique = (val, idx, arr) => arr.indexOf(val) === idx