const err404 = (req, res) => {
  res.send({message: "not found"})
}

module.exports = err404