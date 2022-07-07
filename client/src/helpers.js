export const getVariables = string => {
    const foundVariables = string.match(/\$\{[^\{]+\}/g);
    return foundVariables ? [...new Set(foundVariables.map(variable => variable.replace(/(\$|\{|\})/g, "")))] : [];
}