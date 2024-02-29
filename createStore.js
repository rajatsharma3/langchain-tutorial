import { OpenAIEmbeddings } from "@langchain/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import dotenv from "dotenv";
import parsePdf from "./parsepdf.js";

dotenv.config();

const pdf_text = await parsePdf("drapcodeintro.pdf");

const splitter = new CharacterTextSplitter({
  separator: " ",
  chunkSize: 100,
  chunkOverlap: 25,
});

const document = await splitter.createDocuments([pdf_text]);

const embeddings = new OpenAIEmbeddings();

export const vectorStore = await FaissStore.fromDocuments(document, embeddings);

const directory = "./vectorstore";

await vectorStore.save(directory);

console.log("store created done! :)");
