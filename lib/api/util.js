
export function handleError (error, res) {
  let err = {}
  if (!error) {
    err.message = 'An error has occurred'
  } else if ('string' === typeof error) {
    err.message = error
  }

  return res.status(500).send(err)
}
