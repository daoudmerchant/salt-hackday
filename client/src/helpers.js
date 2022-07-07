export const getVariables = string => {
    const foundVariables = string.match(/\$\{[^\{]+\}/g);
    return foundVariables ? foundVariables.map(variable => variable.replace(/(\$|\{|\})/g, "")) : [];
}