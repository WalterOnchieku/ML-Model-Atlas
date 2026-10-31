
/*
 * RAG Visualizer — Sample Knowledge Base
 *
 * Contains demonstration documents used by the frontend RAG simulator.
 * These are educational examples, not clinical guidance.
 */

export const SAMPLE_DOCUMENTS = [
  {
    id: "doc-001",
    title: "Understanding Malaria",
    source: "Malaria Education Guide",
    category: "Fundamentals",
    content: `
      Malaria is a disease caused by Plasmodium parasites.
      It is transmitted to humans through the bites of infected
      female Anopheles mosquitoes.

      Common malaria symptoms include fever, chills, headache,
      muscle aches, tiredness, nausea and vomiting.

      Symptoms may appear several days or weeks after an
      infected mosquito bite. Early diagnosis and appropriate
      treatment are important.
    `,
  },
  {
    id: "doc-002",
    title: "Severe Malaria",
    source: "Malaria Clinical Reference",
    category: "Symptoms",
    content: `
      Severe malaria is a medical emergency. Warning signs can
      include impaired consciousness, seizures, difficulty
      breathing, severe weakness, jaundice and abnormal bleeding.

      Anyone suspected of having severe malaria should receive
      urgent medical assessment and treatment.

      Delays in seeking medical attention can increase the risk
      of serious complications.
    `,
  },
  {
    id: "doc-003",
    title: "Malaria Prevention",
    source: "Community Health Handbook",
    category: "Prevention",
    content: `
      Malaria prevention includes sleeping under insecticide
      treated mosquito nets, using appropriate mosquito
      repellents and reducing mosquito breeding sites.

      Indoor residual spraying can also help reduce mosquito
      populations when implemented appropriately.

      Communities can reduce exposure by using protective
      measures, especially during periods when mosquito
      activity is high.
    `,
  },
  {
    id: "doc-004",
    title: "Malaria Diagnosis",
    source: "Diagnostic Methods Handbook",
    category: "Diagnosis",
    content: `
      Malaria diagnosis should be confirmed through appropriate
      laboratory testing.

      Common diagnostic methods include rapid diagnostic tests
      and microscopy of blood films.

      Symptoms alone cannot reliably confirm malaria because
      other illnesses may produce similar symptoms.

      Prompt testing helps healthcare professionals determine
      whether malaria is present and guide appropriate care.
    `,
  },
  {
    id: "doc-005",
    title: "Malaria Transmission",
    source: "Vector Biology Notes",
    category: "Transmission",
    content: `
      Malaria is primarily transmitted through infected female
      Anopheles mosquitoes.

      When an infected mosquito bites a person, Plasmodium
      parasites can enter the bloodstream.

      Environmental conditions such as rainfall, temperature
      and humidity can influence mosquito breeding and
      transmission patterns.

      Standing water can provide breeding habitats for
      mosquitoes, depending on local environmental conditions.
    `,
  },
];

export const DEMO_QUERIES = [
  "What are the common symptoms of malaria?",
  "How can people prevent malaria?",
  "What are the warning signs of severe malaria?",
  "How is malaria diagnosed?",
  "How does rainfall affect malaria transmission?",
];

export const RAG_PIPELINE_STAGES = [
  {
    id: "ingestion",
    title: "Document ingestion",
    description: "Load source documents into the knowledge base.",
    input: "PDFs, text files, webpages or database records",
    output: "Extracted document text and metadata",
  },
  {
    id: "chunking",
    title: "Chunking",
    description: "Split documents into smaller, manageable passages.",
    input: "Extracted document text",
    output: "Overlapping or independent text chunks",
  },
  {
    id: "embedding",
    title: "Embedding generation",
    description: "Convert text into numerical representations.",
    input: "Individual document chunks",
    output: "Numerical vectors representing text",
  },
  {
    id: "indexing",
    title: "Vector indexing",
    description: "Store vectors so they can be searched efficiently.",
    input: "Document vectors and metadata",
    output: "Searchable vector index",
  },
  {
    id: "retrieval",
    title: "Retrieval",
    description: "Find knowledge-base passages relevant to a query.",
    input: "User query and indexed documents",
    output: "A ranked set of candidate chunks",
  },
  {
    id: "reranking",
    title: "Reranking",
    description: "Improve the ordering of retrieved candidates.",
    input: "Query and candidate chunks",
    output: "A more relevant context ranking",
  },
  {
    id: "generation",
    title: "Answer generation",
    description: "Generate a response using the retrieved context.",
    input: "User query and selected context",
    output: "A grounded response with source references",
  },
];

