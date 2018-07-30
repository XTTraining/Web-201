export const convertToFloat = (val) => {

    let convertedVal = 0;
    if (val != null) {
        convertedVal = parseFloat(val);
    }
    return convertedVal;
};
