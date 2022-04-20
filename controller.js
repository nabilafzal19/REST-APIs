const datas = require("./data");

function getDatas() {
  // return all todos
  return datas;
}
function getData(id) {
  const data = datas.find((item) => item.id == id);
  if (data) return data;
  else return "The id not found";
}
function deleteData(id) {
  const idx = datas.findIndex((item) => item.id === parseInt(id));

  if (idx > -1) {
    datas.splice(idx, 1);
    return datas;
  } else return "no data found with this particular id";
}

function updateData(id) {
  // get the todo.

  let todo = datas.find((todo) => todo.id === parseInt(id));
  // if no todo, return an error

  if (!todo) {
    return "todo";
  } else return "YES you updated the data";
}

function sendDataToServer(clientData) {
  let newData = {
    id: Math.floor(4 + Math.random() * 10),
    ...clientData,
  };

  datas.push(newData);
  return datas;
}
module.exports = {
  getDatas,
  getData,
  deleteData,
  updateData,
  sendDataToServer,
};
