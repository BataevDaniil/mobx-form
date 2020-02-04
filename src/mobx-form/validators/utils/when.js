const when = mapError => condition => ([errors = [], value]) =>
  condition(value) ? [errors, value] : [mapError(errors), value]

export default when
