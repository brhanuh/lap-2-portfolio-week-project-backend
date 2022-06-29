const app = require("./server");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
