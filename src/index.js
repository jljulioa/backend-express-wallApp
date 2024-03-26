import app from "./app.js";
import { connectDb } from "./db.js";
import  { styleText } from 'node:util'

connectDb();

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(styleText('bold',styleText( 'blue',`🚀  Server ready at http://localhost:${port}`)));
});
