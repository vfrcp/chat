const err404 = (req, res) => {
  res.status(404)
  res.send({message: "not found"})
}

module.exports = err404