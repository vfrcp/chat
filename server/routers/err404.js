const err404 = (req, res) => {
  console.log({message: "404"})
  res.send({message: "not found"})
}

module.exports = err404