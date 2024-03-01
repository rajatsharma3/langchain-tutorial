import { OpenAIEmbeddings } from "@langchain/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import dotenv from "dotenv";
import parsePdf from "./parsepdf.js";

import { faissStore } from "./createfaissstore.js";

dotenv.config();

const pdf_text1 = await parsePdf("drapcodeintro.pdf");
const pdf_text2 = await parsePdf("ImaginePay.pdf");

const splitter = new CharacterTextSplitter({
  separator: " ",
  chunkSize: 100,
  chunkOverlap: 25,
});

const document = await splitter.createDocuments([pdf_text1, pdf_text2]);

// const embeddings = new OpenAIEmbeddings();

// export const vectorStore = await FaissStore.fromDocuments(document, embeddings);

await faissStore.addDocuments(document);

// const directory = "./vectorstore";

// await faissStore.save(directory);

console.log(faissStore);

console.log("store created done! :)");
