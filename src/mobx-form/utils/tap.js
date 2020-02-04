const tap = f => arg => {
  f(arg)
  return arg
}

export default tap
