// This class serves as a repository of all utility functionalities and can be used globally
export const getBookIdFromElementId = (elementId) => {
    var index = elementId.indexOf('__');
    var len = elementId.len;
    return elementId.toString().slice(index + 2);
}