const app = require("./src/app");
const env = require("./src/utils/env");

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
