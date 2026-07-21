import { gemini } from "../../../config/gemini.js";

export const generateEmbedding = async (
  text: string
): Promise<number[]> => {
  const response = await gemini.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings?.[0]?.values ?? [];
};