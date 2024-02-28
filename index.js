import { OpenAI, ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const chatModel = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
});

const ans = await chatModel.invoke("give your complete model name?");
console.log("chatbot:- ", ans.content);
