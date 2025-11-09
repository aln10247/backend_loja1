import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Carregar produtos de um arquivo JSON
const produtosFile = "./produtos.json";

// Rota para listar produtos
app.get("/produtos", (req, res) => {
  const data = fs.readFileSync(produtosFile, "utf-8");
  res.json(JSON.parse(data));
});

// Rota para adicionar produto
app.post("/produtos", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(produtosFile, "utf-8"));
  produtos.push(req.body);
  fs.writeFileSync(produtosFile, JSON.stringify(produtos, null, 2));
  res.json({ message: "Produto adicionado!" });
});

app.get('/', (req, res) => {
  res.send('✅ Servidor backend_loja1 está funcionando!');
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

