const pipe = functions => arg => functions.reduce((result, f) => f(result), arg)

export default pipe
