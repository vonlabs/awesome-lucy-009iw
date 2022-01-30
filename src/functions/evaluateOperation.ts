import { parse, eval as eval2 } from 'expression-eval';

export default function evaluateOperation (expression: string): boolean {
    let result;
    try {
        expression = expression.replaceAll('AND', '&&').replaceAll('XOR', '^').replaceAll('OR', '||').replaceAll('NOT', '!');
        let parsedTree = parse(expression);
        result = eval2(parsedTree, {})
    } catch(e) {
        console.log('all is ok')
    }

    if (result === 0) result = false
    else if (result === 1) result = true

    return result;
};

