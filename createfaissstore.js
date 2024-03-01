// import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { config } from "dotenv";
// config();

// export const faissStore = new FaissStore(new OpenAIEmbeddings(), {});

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";

config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pc.index("testing");

export const faissStore = new PineconeStore(new OpenAIEmbeddings(), {
  pineconeIndex,
  maxConcurrency: 5,
});

console.log("store created");
