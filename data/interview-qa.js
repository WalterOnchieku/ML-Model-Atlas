const QUESTIONS = [
  {
    question: "What is machine learning?",
    category: "Machine Learning",
    difficulty: "Beginner",
    answer:
      "Machine learning is a branch of artificial intelligence that enables computers to learn patterns from data and use those patterns to make predictions or decisions without being explicitly programmed for every situation.",
    example:
      "A spam detection system learns from previously labelled spam and legitimate messages. It uses the patterns it discovers to classify new messages.",
    keyPoints: [
      "Models learn patterns from data.",
      "Training involves adjusting model parameters.",
      "Performance should be evaluated on unseen data.",
      "The quality and relevance of the training data matter.",
    ],
    related: ["Supervised Learning", "Training Data", "Classification"],
  },
  {
    question: "What is the difference between supervised and unsupervised learning?",
    category: "Machine Learning",
    difficulty: "Beginner",
    answer:
      "Supervised learning uses labelled data, meaning each training example has a known target. Unsupervised learning uses data without supplied target labels and attempts to discover patterns or structure.",
    example:
      "Training a model on SMS messages labelled as spam or legitimate is supervised learning. Grouping customers by purchasing behaviour without predefined groups is unsupervised learning.",
    keyPoints: [
      "Supervised learning includes classification and regression.",
      "Unsupervised learning includes clustering and dimensionality reduction.",
      "The availability of labelled data influences which approach is appropriate.",
    ],
    related: ["Classification", "Regression", "Clustering"],
  },
  {
    question: "What is overfitting, and how can you prevent it?",
    category: "Machine Learning",
    difficulty: "Beginner",
    answer:
      "Overfitting occurs when a model learns the training data too closely, including noise and unimportant details. It performs well on training data but poorly on unseen examples.",
    example:
      "A very deep decision tree might memorise individual training examples but struggle to classify new examples correctly.",
    keyPoints: [
      "Use cross-validation to assess generalisation.",
      "Apply regularisation where appropriate.",
      "Reduce unnecessary model complexity.",
      "Collect more representative training data.",
      "Use early stopping for iterative training where suitable.",
    ],
    related: ["Underfitting", "Regularization", "Cross-Validation"],
  },
  {
    question: "What is the difference between precision and recall?",
    category: "Machine Learning",
    difficulty: "Intermediate",
    answer:
      "Precision measures how many predicted positive cases are actually positive. Recall measures how many actual positive cases the model successfully identifies.",
    example:
      "For a fraud detector, high precision means that most transactions flagged as fraudulent really are fraudulent. High recall means the system catches most of the fraudulent transactions.",
    keyPoints: [
      "Precision = True Positives / (True Positives + False Positives).",
      "Recall = True Positives / (True Positives + False Negatives).",
      "Precision matters when false alarms are costly.",
      "Recall matters when missing a positive case is costly.",
      "F1 score combines precision and recall using their harmonic mean.",
    ],
    related: ["F1 Score", "Confusion Matrix", "Classification"],
  },
  {
    question: "What is the bias-variance trade-off?",
    category: "Machine Learning",
    difficulty: "Intermediate",
    answer:
      "The bias-variance trade-off describes the balance between a model being too simple to capture the underlying patterns and being too sensitive to the training data.",
    example:
      "A straight-line model may have high bias when the real relationship is nonlinear. A very deep decision tree may have high variance because small changes in training data can produce very different models.",
    keyPoints: [
      "High bias is commonly associated with underfitting.",
      "High variance is commonly associated with overfitting.",
      "Model complexity, training data and regularisation affect this balance.",
      "The goal is good performance on unseen data.",
    ],
    related: ["Overfitting", "Underfitting", "Regularization"],
  },
  {
    question: "What is the difference between a parameter and a hyperparameter?",
    category: "Machine Learning",
    difficulty: "Intermediate",
    answer:
      "A parameter is learned by the model during training. A hyperparameter is a configuration value chosen before or around training that influences the learning process or model structure.",
    example:
      "In logistic regression, the learned coefficients are parameters. The regularisation strength is a hyperparameter.",
    keyPoints: [
      "Parameters are learned from training data.",
      "Hyperparameters are configured by the practitioner or a tuning process.",
      "Hyperparameters can be selected using validation data or cross-validation.",
    ],
    related: ["Learning Rate", "Gradient Descent", "Cross-Validation"],
  },
  {
    question: "What is a neural network?",
    category: "Deep Learning",
    difficulty: "Beginner",
    answer:
      "A neural network is a machine learning model made up of interconnected computational units called neurons. These units are organised into layers and learn relationships between inputs and outputs by adjusting their weights and biases.",
    example:
      "An image classification network can learn visual patterns such as edges, shapes and object features before predicting an image's class.",
    keyPoints: [
      "Input layers receive features.",
      "Hidden layers transform information.",
      "Output layers produce predictions.",
      "Activation functions introduce non-linearity.",
      "Training adjusts weights to reduce a loss function.",
    ],
    related: ["Activation Function", "Backpropagation", "Gradient Descent"],
  },
  {
    question: "What is backpropagation?",
    category: "Deep Learning",
    difficulty: "Intermediate",
    answer:
      "Backpropagation is the process of calculating gradients of a neural network's loss with respect to its parameters. It applies the chain rule to determine how each parameter contributed to the prediction error.",
    example:
      "After a network makes an incorrect prediction, backpropagation calculates gradients. An optimiser then uses those gradients to update the network's weights.",
    keyPoints: [
      "A forward pass produces predictions.",
      "A loss function measures prediction error.",
      "Backpropagation calculates gradients.",
      "An optimiser updates the parameters.",
      "The process repeats over training batches and epochs.",
    ],
    related: ["Gradient Descent", "Loss Function", "Learning Rate"],
  },
  {
    question: "What is a Large Language Model (LLM)?",
    category: "LLMs & RAG",
    difficulty: "Beginner",
    answer:
      "A Large Language Model is a neural network trained on large amounts of text and other data to understand and generate language. Many modern LLMs use the Transformer architecture and predict tokens based on the context they receive.",
    example:
      "A conversational assistant receives a user's question, processes the conversation context and generates a response token by token.",
    keyPoints: [
      "LLMs are commonly based on Transformer architectures.",
      "Text is represented as tokens.",
      "The model generates output based on learned patterns and context.",
      "An LLM's response is not automatically guaranteed to be factual.",
      "Prompting, retrieval and fine-tuning can adapt how a model is used.",
    ],
    related: ["Transformer", "Tokenization", "Prompt Engineering"],
  },
  {
    question: "What is Retrieval-Augmented Generation (RAG)?",
    category: "LLMs & RAG",
    difficulty: "Intermediate",
    answer:
      "Retrieval-Augmented Generation combines information retrieval with language generation. Instead of relying only on knowledge learned during training, an application retrieves relevant external information and provides it as context to an LLM when answering a query.",
    example:
      "A company knowledge assistant can retrieve relevant sections from internal documentation and pass them to an LLM to generate an answer grounded in those documents.",
    keyPoints: [
      "Documents are collected and prepared.",
      "Content is split into chunks.",
      "Chunks are converted into embeddings and indexed.",
      "A user query retrieves relevant information.",
      "Retrieved context is passed to the LLM.",
      "The generated answer should be evaluated for relevance and faithfulness.",
    ],
    related: ["Embeddings", "Vector Database", "Chunking", "Semantic Search"],
  },
  {
    question: "What are embeddings?",
    category: "LLMs & RAG",
    difficulty: "Intermediate",
    answer:
      "Embeddings are numerical vector representations of data. They are designed to capture useful semantic or contextual relationships so that similar items can be compared mathematically.",
    example:
      "A semantic search application converts documents and user queries into vectors. It can retrieve documents with similar meanings even when they do not contain exactly the same words.",
    keyPoints: [
      "An embedding is a numerical vector.",
      "Similar representations are often close in vector space.",
      "Cosine similarity and dot product are common comparison methods.",
      "Embedding quality depends on the model and the data.",
      "Embeddings are commonly used in semantic search and RAG.",
    ],
    related: ["Vector Database", "Semantic Search", "Cosine Similarity"],
  },
  {
    question: "What is the difference between RAG and fine-tuning?",
    category: "LLMs & RAG",
    difficulty: "Intermediate",
    answer:
      "RAG gives a language model relevant external information at inference time. Fine-tuning updates model parameters using additional training data to adapt the model's behaviour, style or task performance.",
    example:
      "For an assistant answering questions about frequently changing company policies, RAG can retrieve the latest documents. Fine-tuning may be more suitable when adapting a model to consistently follow a specialised output format.",
    keyPoints: [
      "RAG adds retrieved context without necessarily changing model weights.",
      "Fine-tuning changes model parameters.",
      "RAG is useful when information changes frequently or needs to be sourced.",
      "Fine-tuning can help with specialised behaviour or task adaptation.",
      "The approaches can be combined.",
    ],
    related: ["Retrieval-Augmented Generation", "Embeddings", "LLM Evaluation"],
  },
  {
    question: "What is an AI agent?",
    category: "AI Engineering",
    difficulty: "Intermediate",
    answer:
      "An AI agent is a system that uses an AI model to interpret a goal, decide what action to take, and interact with tools or external systems. Depending on its design, it can perform multiple steps, observe results and adjust its next action.",
    example:
      "A support agent could interpret a customer request, look up an order through an API, check its delivery status and prepare a response.",
    keyPoints: [
      "The model helps interpret inputs and make decisions.",
      "Tools allow the agent to interact with external systems.",
      "State or memory can preserve relevant context.",
      "An execution loop coordinates actions and observations.",
      "Permissions, validation and limits are important safeguards.",
    ],
    related: ["Tool Calling", "Agentic Workflow", "LLM Evaluation"],
  },
  {
    question: "What is the difference between an AI agent and a traditional automation workflow?",
    category: "AI Engineering",
    difficulty: "Intermediate",
    answer:
      "Traditional automation usually follows predefined rules and steps. An AI agent can use a model to interpret less structured inputs and select actions dynamically. Agents offer flexibility, but they also introduce uncertainty and require stronger controls.",
    example:
      "A traditional workflow might send an email whenever an order status changes. An AI agent might interpret a customer's message, retrieve order information and decide which supported action is appropriate.",
    keyPoints: [
      "Traditional workflows are generally deterministic.",
      "Agents can make context-dependent decisions.",
      "Agents may require retries, validation and human approval.",
      "Use deterministic automation when the task is predictable.",
      "Use agents when flexible interpretation or decision-making adds value.",
    ],
    related: ["AI Agent", "Tool Calling", "Human-in-the-Loop"],
  },
  {
    question: "What is prompt engineering?",
    category: "AI Engineering",
    difficulty: "Beginner",
    answer:
      "Prompt engineering is the practice of designing and refining instructions and context given to a language model to improve the relevance, consistency and usefulness of its output.",
    example:
      "Instead of asking an LLM to 'analyse this data', a more structured prompt can specify the task, expected output format, constraints and relevant context.",
    keyPoints: [
      "Clearly define the task.",
      "Provide relevant context.",
      "Specify constraints and expected output.",
      "Use examples when they help communicate the desired behaviour.",
      "Test prompts against representative inputs.",
    ],
    related: ["LLM", "Few-Shot Prompting", "Structured Output"],
  },
  {
    question: "What is model serving?",
    category: "MLOps & Infrastructure",
    difficulty: "Intermediate",
    answer:
      "Model serving is the process of making a trained machine learning model available to applications so they can request predictions. It commonly involves an API or inference service that loads the model, validates inputs and returns predictions.",
    example:
      "A FastAPI application can load a trained scikit-learn model and expose a prediction endpoint that accepts an SMS message and returns a spam classification.",
    keyPoints: [
      "Training and inference are separate stages.",
      "The serving layer handles requests and responses.",
      "Input validation helps prevent invalid requests.",
      "Latency, throughput and resource usage should be monitored.",
      "Model versions and deployment changes should be managed.",
    ],
    related: ["FastAPI", "Inference", "Docker", "Model Monitoring"],
  },
  {
    question: "Why use Docker for an AI or machine learning application?",
    category: "MLOps & Infrastructure",
    difficulty: "Beginner",
    answer:
      "Docker packages an application and its dependencies into a container image. This helps create consistent environments across development, testing and deployment.",
    example:
      "A machine learning API can be packaged with its Python runtime and dependencies so it behaves more consistently on a developer's machine and a deployment server.",
    keyPoints: [
      "Containers package application dependencies.",
      "Images provide reproducible application environments.",
      "Docker Compose can coordinate multiple services.",
      "Containers simplify deployment workflows.",
      "Containers do not automatically solve scaling or security.",
    ],
    related: ["Containerization", "Docker Compose", "CI/CD"],
  },
  {
    question: "What is CI/CD, and why is it useful?",
    category: "MLOps & Infrastructure",
    difficulty: "Intermediate",
    answer:
      "Continuous Integration and Continuous Delivery or Deployment are practices that automate parts of the software delivery process. CI checks changes through activities such as testing and building. CD automates preparing or releasing validated changes.",
    example:
      "A GitHub Actions workflow can run backend tests whenever code is pushed. If the checks pass, a deployment workflow can publish the updated application.",
    keyPoints: [
      "CI helps detect problems early.",
      "Automated tests provide feedback on changes.",
      "Build steps produce deployable artifacts.",
      "CD automates release or deployment steps.",
      "Secrets and environment-specific configuration must be handled securely.",
    ],
    related: ["GitHub Actions", "Automated Testing", "Docker"],
  },
  {
    question: "How would you design a RAG application for company documents?",
    category: "System Design",
    difficulty: "Advanced",
    answer:
      "I would separate the application into an ingestion pipeline and a query pipeline. The ingestion pipeline processes documents, extracts text, creates chunks, generates embeddings and stores them with metadata. The query pipeline validates a question, retrieves relevant chunks, optionally reranks them, and passes the context to an LLM to generate an answer.",
    example:
      "For an internal HR assistant, documents could be indexed with metadata such as department, document type and access permissions. A query would retrieve only documents the requesting employee is authorised to access.",
    keyPoints: [
      "Document ingestion and querying should be separate workflows.",
      "Choose chunking and embedding strategies appropriate to the documents.",
      "Use metadata filtering and access controls.",
      "Consider hybrid search and reranking when retrieval quality needs improvement.",
      "Evaluate retrieval quality and answer faithfulness.",
      "Monitor latency, cost and failure rates.",
    ],
    related: ["RAG", "Vector Database", "Hybrid Search", "Reranking"],
  },
  {
    question: "How would you evaluate a RAG system?",
    category: "System Design",
    difficulty: "Advanced",
    answer:
      "I would evaluate both retrieval and generation. Retrieval evaluation checks whether the system finds relevant information. Generation evaluation checks whether the answer is accurate, relevant and supported by the retrieved context. I would combine automated metrics with human review on representative questions.",
    example:
      "For a company policy assistant, I could create a test set of questions with expected source documents and reference answers, then measure whether the correct documents are retrieved and whether the generated answers are grounded in them.",
    keyPoints: [
      "Measure retrieval relevance and context coverage.",
      "Assess answer faithfulness to retrieved evidence.",
      "Evaluate answer relevance and correctness.",
      "Test difficult cases, including missing or conflicting information.",
      "Include human evaluation for ambiguous cases.",
      "Track latency and cost alongside answer quality.",
    ],
    related: ["RAG", "Faithfulness", "Context Precision", "LLM Evaluation"],
  },
  {
    question: "How do you prevent an AI application from exposing sensitive information?",
    category: "System Design",
    difficulty: "Advanced",
    answer:
      "I would apply security controls across the complete application rather than relying on the language model alone. This includes authentication, authorisation, input validation, access-controlled retrieval, secure secret management, logging policies and output checks.",
    example:
      "In an enterprise RAG system, document permissions should be enforced during retrieval. The application should not retrieve restricted documents and then rely on the LLM to decide whether to reveal their contents.",
    keyPoints: [
      "Authenticate users and enforce server-side authorisation.",
      "Apply access controls to retrieved documents and tools.",
      "Validate and constrain tool inputs.",
      "Protect credentials and sensitive configuration.",
      "Avoid logging unnecessary personal or confidential data.",
      "Test for prompt injection and data leakage.",
    ],
    related: ["Prompt Injection", "RAG", "Authentication", "Authorisation"],
  },
  {
    question: "What is the difference between a list, tuple, set and dictionary in Python?",
    category: "Python & Software Engineering",
    difficulty: "Beginner",
    answer:
      "A list is an ordered, mutable collection. A tuple is an ordered, immutable collection. A set stores unique elements without guaranteeing a particular order. A dictionary stores key-value pairs and supports lookup by key.",
    example:
      "Use a list for a collection of messages, a tuple for fixed coordinates, a set for unique categories, and a dictionary to map user IDs to user records.",
    keyPoints: [
      "List: ordered and mutable.",
      "Tuple: ordered and immutable.",
      "Set: unique elements.",
      "Dictionary: key-value mapping.",
      "Choose the structure based on the operations and guarantees your application needs.",
    ],
    related: ["Python", "Data Structures", "Mutability"],
  },
  {
    question: "What is the difference between synchronous and asynchronous programming?",
    category: "Python & Software Engineering",
    difficulty: "Intermediate",
    answer:
      "Synchronous code generally executes one operation at a time, waiting for each operation to finish before continuing. Asynchronous programming allows a program to pause while waiting for an operation, such as network or database I/O, and perform other work in the meantime.",
    example:
      "An asynchronous FastAPI endpoint can await a database query without blocking the event loop in the same way that a blocking synchronous operation would.",
    keyPoints: [
      "Async programming is especially useful for I/O-bound workloads.",
      "In Python, async functions are declared with async def.",
      "The await keyword pauses an async function while an awaitable completes.",
      "Async does not automatically make CPU-intensive work faster.",
      "Blocking operations can still block an event loop.",
    ],
    related: ["Python", "FastAPI", "Event Loop", "Concurrency"],
  },
  {
    question: "What is the difference between authentication and authorisation?",
    category: "Python & Software Engineering",
    difficulty: "Beginner",
    answer:
      "Authentication verifies who a user is. Authorisation determines what that authenticated user is allowed to access or do.",
    example:
      "A user logs into an application with valid credentials. Authentication confirms their identity. Authorisation then determines whether they can access an administrator-only endpoint.",
    keyPoints: [
      "Authentication establishes identity.",
      "Authorisation checks permissions.",
      "Both should be enforced on the server.",
      "A valid login does not automatically grant access to every resource.",
    ],
    related: ["API Security", "JWT", "Role-Based Access Control"],
  },
];

export default QUESTIONS;