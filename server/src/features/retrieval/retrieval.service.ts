import { cosineSimilarity } from "./similarity.js";
import { RetrievedBullet } from "./retrieval.types.js";
import { generateEmbedding } from "../embeddings/services/embedding.service.js";
import { ResumeBullet } from "../leveling/schemas/bullet.schema.js";

export const retrieveRelevantBullets = async (
  bullets: ResumeBullet[],
  jobDescription: string,
  topK = 5,
): Promise<RetrievedBullet[]> => {
  const jdEmbedding = await generateEmbedding(jobDescription);

  const scoredBullets = bullets.map((bullet) => ({
    bulletId: bullet.bulletId,
    text: bullet.text,
    similarity: cosineSimilarity(
      bullet.embedding ?? [],
      jdEmbedding
    ),
  }));

  scoredBullets.sort(
    (a, b) => b.similarity - a.similarity
  );

  return scoredBullets.slice(0, topK);
};