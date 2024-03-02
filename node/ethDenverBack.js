import express from "express";
import cors from "cors";
import { Wallet } from "ethers";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.raw({ type: '*/*', limit: '150mb' }));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/createCaster", async (req, res) => {
  try {
    console.log(req.body);
    const { privateKey } = req.body;
    const wallet = new Wallet(privateKey);
    res.send(wallet.address);
  } catch (error) {
    console.log(error)
    res.status(500).send("Interval Server Error");
  }
});

app.post("/file", async (req, res) => {
  try {
    const file = Buffer.from(req.body);
    const hexString = file.toString('hex');
    const hex = hexString.slice(326, 335798)
    res.send(hexString);
  } catch (error) {
    console.log(error)
    res.status(500).send("Interval Server Error");
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
