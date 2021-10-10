const err404 = (req, res) => {
  console.log(req.originalUrl, "Error 404: URL")
  res.send({message: "not found"})
}

module.exports = err404