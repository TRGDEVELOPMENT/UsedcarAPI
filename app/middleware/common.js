const getUID = (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const users = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  return users["id"];
};

const commonMiddleware = {
  getUID: getUID,
};

module.exports = commonMiddleware;
