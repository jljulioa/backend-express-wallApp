import app from "./app.js";
import { whiteList } from "./config.js";
import { connectDb } from "./db.js";
import  { styleText } from 'node:util'

connectDb();

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(styleText('bold',styleText( 'blue',`🚀  Server ready at ${port}`)));
    console.log(whiteList)
});
