
/*
 * RAG Visualizer — Client-side RAG Engine
 *
 * Implements educational RAG operations:
 * - Text chunking
 * - Tokenisation
 * - TF-IDF vectorisation
 * - Cosine similarity
 * - Top-K retrieval
 * - Prompt construction
 *
 * Retrieval currently uses lexical TF-IDF vectors,
 * not neural embedding models.
 */

// Normalize text into searchable tokens.
export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

// Split text into chunks with configurable overlap.
export function chunkText(text, chunkSize = 100, overlap = 20) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (!words.length) return [];

  if (chunkSize < 1) {
    throw new Error("Chunk size must be greater than zero.");
  }

  if (overlap < 0 || overlap >= chunkSize) {
    throw new Error("Overlap must be non-negative and smaller than chunk size.");
  }

  const chunks = [];
  const step = chunkSize - overlap;

  for (let start = 0; start < words.length; start += step) {
    const chunkWords = words.slice(start, start + chunkSize);

    chunks.push({
      id: `chunk-${chunks.length + 1}`,
      text: chunkWords.join(" "),
      startIndex: start,
      endIndex: start + chunkWords.length,
      wordCount: chunkWords.length,
    });

    if (start + chunkSize >= words.length) break;
  }

  return chunks;
}

// Calculate inverse document frequency for each term.
function calculateIDF(documents) {
  const documentFrequency = new Map();

  documents.forEach((document) => {
    const uniqueTerms = new Set(tokenize(document.text));

    uniqueTerms.forEach((term) => {
      documentFrequency.set(
        term,
        (documentFrequency.get(term) || 0) + 1
      );
    });
  });

  const totalDocuments = documents.length;
  const idf = new Map();

  documentFrequency.forEach((frequency, term) => {
    idf.set(
      term,
      Math.log((totalDocuments + 1) / (frequency + 1)) + 1
    );
  });

  return idf;
}

// Convert text into a normalized TF-IDF vector.
function createTFIDFVector(text, idf) {
  const tokens = tokenize(text);
  const termFrequency = new Map();

  tokens.forEach((term) => {
    termFrequency.set(term, (termFrequency.get(term) || 0) + 1);
  });

  const vector = new Map();

  termFrequency.forEach((frequency, term) => {
    const tf = frequency / Math.max(tokens.length, 1);
    const inverseFrequency = idf.get(term) || 0;

    vector.set(term, tf * inverseFrequency);
  });

  return vector;
}

// Calculate cosine similarity between two sparse vectors.
export function cosineSimilarity(vectorA, vectorB) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  vectorA.forEach((value, term) => {
    magnitudeA += value * value;

    if (vectorB.has(term)) {
      dotProduct += value * vectorB.get(term);
    }
  });

  vectorB.forEach((value) => {
    magnitudeB += value * value;
  });

  const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

  if (!denominator) return 0;

  return dotProduct / denominator;
}

// Prepare document chunks for retrieval.
export function prepareKnowledgeBase(documents, chunkSize = 100, overlap = 20) {
  const chunks = documents.flatMap((document) => {
    return chunkText(document.content, chunkSize, overlap).map((chunk) => ({
      ...chunk,
      documentId: document.id,
      documentTitle: document.title,
      source: document.source,
      category: document.category,
    }));
  });

  const idf = calculateIDF(chunks);

  const indexedChunks = chunks.map((chunk) => ({
    ...chunk,
    vector: createTFIDFVector(chunk.text, idf),
  }));

  return {
    chunks: indexedChunks,
    idf,
  };
}

// Retrieve the most relevant chunks for a query.
export function retrieveDocuments(query, knowledgeBase, topK = 3) {
  const queryVector = createTFIDFVector(query, knowledgeBase.idf);

  return knowledgeBase.chunks
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryVector, chunk.vector),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, topK));
}

// Construct the context sent to a language model.
export function buildPrompt(query, retrievedChunks) {
  const context = retrievedChunks
    .map((chunk, index) => {
      return `[Source ${index + 1}: ${chunk.documentTitle}]\n${chunk.text}`;
    })
    .join("\n\n");

  return `SYSTEM:
You are an assistant that answers questions using the supplied context.

Rules:
1. Use the supplied context as your primary source.
2. Do not invent information that is not present in the context.
3. If the context does not contain the answer, say so.
4. Identify the source documents used in your answer.

CONTEXT:
${context || "No relevant context was retrieved."}

USER QUESTION:
${query}

ANSWER:`;
}
