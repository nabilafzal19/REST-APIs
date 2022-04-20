const http = require("http");
const {
  getDatas,
  getData,
  deleteData,
  updateData,
  sendDataToServer,
} = require("./controller");
const { getBodyData } = require("./utils");
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/data" && req.method === "GET") {
    const allData = getDatas();

    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(allData));
  } else if (req.url.match(/\/api\/data\/[0-9]+/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const data = getData(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the data
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/api\/data\/[0-9]+/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[3];
      const datas = deleteData(id);
      console.log(datas);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(datas));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/api\/data\/([0-9]+)/) && req.method === "PATCH") {
    try {
      const id = req.url.split("/")[3];
      const data = updateData(id);
      console.log("entered");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url === "/api/data" && req.method === "POST") {
    try {
      const clientData = await getBodyData(req);

      const data = sendDataToServer(JSON.parse(clientData));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("YOU are at another url");
  }
});

server.listen(port, function () {
  console.log(`server running on port ${port}`);
});
