import { config } from "dotenv";
import { OpenAIEmbeddings, OpenAI } from "@langchain/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

config();

// const vectorStore = await FaissStore.load(
//   "./vectorstore",
//   new OpenAIEmbeddings()
// );

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pc.index("testing");

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);

const model = new OpenAI({ temperature: 0.6 });

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model),
  retriever: vectorStore.asRetriever(),
  returnSourceDocuments: true,
});

const res = await chain.invoke({
  query: "tell me something about imaginePay",
});

console.log(res.text);
