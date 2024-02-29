import { OpenAIEmbeddings } from "@langchain/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import dotenv from "dotenv";
import parsePdf from "./parsepdf.js";
import { vectorStore } from "./createStore.js";

dotenv.config();

const pdf_text = await parsePdf("ImaginePay.pdf");

const splitter = new CharacterTextSplitter({
  separator: " ",
  chunkSize: 100,
  chunkOverlap: 25,
});

const document = await splitter.createDocuments([pdf_text]);

const embeddings = new OpenAIEmbeddings();

const vectorStore2 = await FaissStore.fromDocuments(document, embeddings);

await vectorStore2.mergeFrom(vectorStore);

const directory = "./vectorstore";
await vectorStore.save(directory);

console.log("done! :)");
