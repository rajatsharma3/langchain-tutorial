import { config } from "dotenv";
import { OpenAIEmbeddings, OpenAI } from "@langchain/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

config();

const vectorStore = await FaissStore.load(
  "./vectorstore",
  new OpenAIEmbeddings()
);
const model = new OpenAI({ temperature: 0.6 });

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model),
  retriever: vectorStore.asRetriever(),
  returnSourceDocuments: true,
});

const res = await chain.invoke({
  query: "tell me something about drapcode",
});

console.log(res.text);
