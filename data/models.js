
/*
 * File: data/models.js
 * Purpose: Central knowledge base for ML Model Atlas.
 *
 * Responsibilities:
 * - Store model descriptions and decision-making guidance.
 * - Power the model library, search, filtering, comparison, and detail pages.
 * - Connect models to problem types, related approaches, and learning paths.
 * - Include historical context and real-world application examples.
 *
 * Important distinctions:
 * - "traditional-ml", "deep-learning", "computer-vision", and "nlp"
 *   are overlapping categories, not mutually exclusive families.
 * - "method" identifies a feature transformation or representation technique.
 * - "architecture" identifies a model architecture or model family.
 * - "system-pattern" identifies a broader application design, not one model.
 * - Historical examples provide context; they do not imply that a model
 *   alone produced the outcome of a complex real-world system.
 */

const models = [
  // ============================================================
  // 1. TRADITIONAL MACHINE LEARNING
  // ============================================================

  {
    id: "logistic-regression",
    slug: "logistic-regression",
    name: "Logistic Regression",
    shortName: "Logistic Regression",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "classification"],
    problemTypes: ["classification"],
    learningParadigm: ["supervised"],
    tags: [
      "classification",
      "probability",
      "linear-model",
      "interpretable",
      "baseline",
      "tabular-data",
      "text-classification",
    ],
    summary:
      "A linear classification algorithm that estimates class probabilities using a logistic function or a multiclass extension.",
    description:
      "Logistic Regression learns a weighted combination of input features and converts the resulting score into a probability-like estimate. Despite its name, it is primarily used for classification rather than predicting an unrestricted continuous value.",
    howItWorks: [
      "Represent each example as a set of numerical features.",
      "Learn a weight for each feature from labelled training examples.",
      "Combine the weighted features into a score.",
      "Apply a logistic function for binary classification or an appropriate multiclass formulation.",
      "Choose a class using a decision threshold or the highest class score.",
    ],
    whenToUse: [
      "You need a strong, inexpensive classification baseline.",
      "Your data is tabular or represented as numerical text features.",
      "You need to inspect feature weights or explain the direction of associations.",
      "You want probability estimates that can be calibrated and evaluated.",
      "You need a model that can train quickly on a CPU.",
    ],
    whenToAvoid: [
      "The decision boundary is highly nonlinear and feature engineering does not address it.",
      "Important interactions between features are not represented in the input.",
      "You require image or audio understanding directly from raw inputs.",
      "You need causal conclusions from predictive associations alone.",
    ],
    strengths: [
      "Fast to train and run for many small and medium datasets.",
      "Relatively interpretable compared with complex ensembles and neural networks.",
      "Works well with sparse high-dimensional features, including TF-IDF.",
      "Supports regularization to control model complexity.",
      "Provides scores useful for threshold tuning and ranking.",
    ],
    limitations: [
      "A linear decision boundary may underfit complex relationships.",
      "Feature scaling and preprocessing can matter.",
      "Correlated features can make individual coefficients difficult to interpret.",
      "Raw predicted probabilities may require calibration.",
      "Class imbalance and an inappropriate decision threshold can cause poor operational results.",
    ],
    assumptions: [
      "The log-odds are linear in the supplied features for the standard formulation.",
      "Training examples are representative of the intended prediction population.",
      "Feature construction captures enough of the relevant signal.",
    ],
    dataRequirements: {
      input: "Numerical feature vectors; categorical variables must be encoded.",
      labels: "A known target class for each supervised training example.",
      scale: "Often effective on small and medium datasets; sparse text can work very well.",
      preprocessing: [
        "Handle missing values.",
        "Encode categorical features.",
        "Scale numerical features when appropriate.",
        "Use a text vectorizer such as TF-IDF for raw text.",
      ],
    },
    compute: {
      training: "Low",
      inference: "Low",
      memory: "Low to medium, depending on feature count.",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "A practical baseline for CPU-only development and deployment.",
    },
    interpretability: {
      level: "high",
      explanation:
        "Coefficients indicate how features relate to log-odds, subject to feature scaling, correlations, and model specification. They are not automatically causal effects.",
      tools: ["coefficients", "permutation-importance", "calibration-curve"],
    },
    evaluation: {
      primary: ["precision", "recall", "f1-score", "roc-auc"],
      additional: ["pr-auc", "log-loss", "confusion-matrix", "calibration"],
      notes:
        "For rare or costly positive cases, inspect precision-recall behaviour and tune the threshold to the actual cost of errors.",
    },
    useCases: [
      "Spam and scam message classification.",
      "Customer churn prediction.",
      "Credit-risk screening as one component of a governed decision process.",
      "Medical risk prediction when appropriately validated.",
      "Document classification with sparse text features.",
    ],
    historicalExample: {
      title: "A long-standing method for binary outcome modelling",
      period: "20th century onward",
      context:
        "Logistic regression became a standard statistical method for modelling binary outcomes in fields such as epidemiology, biostatistics, and social science.",
      connection:
        "It illustrates how a relatively simple probabilistic classifier can remain useful when transparency, baseline performance, and careful evaluation matter.",
      attribution: "General historical context; not a claim about one specific deployment.",
    },
    projectExample: {
      title: "ScamShield KE",
      context:
        "Use TF-IDF to represent SMS messages as numerical features and Logistic Regression to estimate whether a message resembles spam.",
      learningPoints: [
        "Text vectorization and classification are separate stages.",
        "Accuracy alone can hide errors when classes are imbalanced.",
        "A predicted probability is not proof that a message is fraudulent.",
      ],
    },
    prerequisites: [
      "Basic understanding of classification.",
      "Features, labels, and train/test splits.",
      "Familiarity with precision, recall, and F1-score.",
    ],
    relatedModels: [
      "naive-bayes",
      "linear-regression",
      "random-forest",
      "tf-idf",
    ],
    illustration: "logistic-regression",
    resources: [
      {
        label: "scikit-learn user guide",
        url: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer

model = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2), min_df=2),
    LogisticRegression(max_iter=1000, class_weight="balanced"),
)

model.fit(train_messages, train_labels)
predictions = model.predict(test_messages)`,
      explanation:
        "This example combines feature extraction and classification into one pipeline. Fit it only on training data, then evaluate on held-out data.",
    },
  },

  {
    id: "linear-regression",
    slug: "linear-regression",
    name: "Linear Regression",
    shortName: "Linear Regression",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "regression"],
    problemTypes: ["regression"],
    learningParadigm: ["supervised"],
    tags: [
      "regression",
      "continuous-prediction",
      "interpretable",
      "baseline",
      "tabular-data",
    ],
    summary:
      "Predicts a continuous numerical outcome using a weighted sum of input features.",
    description:
      "Linear Regression estimates a relationship between input features and a numerical target. It is a useful starting point for understanding regression, feature effects, residuals, and model evaluation.",
    howItWorks: [
      "Represent each example using numerical features.",
      "Fit coefficients and an intercept to minimize a chosen error objective, commonly squared error.",
      "Predict by combining the learned coefficients with new feature values.",
      "Inspect residuals to identify systematic errors or assumption violations.",
    ],
    whenToUse: [
      "You need a simple numerical prediction baseline.",
      "Relationships are approximately linear or can be made useful through feature engineering.",
      "You want an interpretable model for continuous outcomes.",
      "You need a lightweight model that is easy to benchmark.",
    ],
    whenToAvoid: [
      "Strong nonlinear patterns remain after reasonable feature engineering.",
      "Extreme outliers dominate ordinary least-squares fitting.",
      "The target is categorical rather than continuous.",
      "You need causal claims without a suitable causal design.",
    ],
    strengths: [
      "Simple and computationally inexpensive.",
      "Coefficients can be inspected.",
      "Works well as a baseline.",
      "Supports extensions such as Ridge and Lasso regularization.",
    ],
    limitations: [
      "Can underfit nonlinear relationships.",
      "Sensitive to influential outliers under squared-error fitting.",
      "Multicollinearity can make coefficients unstable.",
      "Prediction quality depends on the data and modelling assumptions.",
    ],
    assumptions: [
      "The conditional mean can be usefully approximated by a linear function.",
      "Residual independence, constant variance, and residual distribution matter for particular inferential procedures.",
      "Feature leakage and temporal leakage are avoided.",
    ],
    dataRequirements: {
      input: "Numerical feature vectors.",
      labels: "A continuous numerical target.",
      scale: "Small to large datasets, subject to feature count and solver.",
      preprocessing: [
        "Handle missing values.",
        "Encode categorical variables.",
        "Inspect outliers and residuals.",
        "Scale features when useful for numerical stability or regularized variants.",
      ],
    },
    compute: {
      training: "Low",
      inference: "Low",
      memory: "Low to medium",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Often a sensible first benchmark for regression.",
    },
    interpretability: {
      level: "high",
      explanation:
        "Coefficients describe fitted associations conditional on the included features and model specification. They should not automatically be interpreted causally.",
      tools: ["coefficients", "residual-plots", "permutation-importance"],
    },
    evaluation: {
      primary: ["mae", "rmse", "r2"],
      additional: ["residual-analysis", "mape-when-valid"],
      notes:
        "MAE is easy to interpret; RMSE penalizes large errors more heavily. R-squared is not a complete measure of predictive quality.",
    },
    useCases: [
      "House-price estimation.",
      "Demand and cost estimation.",
      "Energy consumption prediction.",
      "Explaining relationships between measured variables.",
    ],
    historicalExample: {
      title: "Regression as a foundation of quantitative prediction",
      period: "19th century onward",
      context:
        "Regression methods developed into foundational tools for quantitative research and prediction across economics, agriculture, engineering, and the sciences.",
      connection:
        "Linear regression remains a useful benchmark even when modern nonlinear models are available.",
      attribution: "Broad historical context rather than one exclusive deployment.",
    },
    projectExample: null,
    prerequisites: [
      "Features and continuous targets.",
      "Residuals and prediction errors.",
      "MAE, RMSE, and R-squared.",
    ],
    relatedModels: ["logistic-regression", "random-forest", "gradient-boosting"],
    illustration: "linear-regression",
    resources: [
      {
        label: "scikit-learn linear models",
        url: "https://scikit-learn.org/stable/modules/linear_model.html",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)`,
      explanation:
        "Train on the training partition and evaluate predictions on held-out data. Do not use the test set to repeatedly tune the model.",
    },
  },

  {
    id: "decision-tree",
    slug: "decision-tree",
    name: "Decision Tree",
    shortName: "Decision Tree",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "classification", "regression"],
    problemTypes: ["classification", "regression"],
    learningParadigm: ["supervised"],
    tags: [
      "tree-based",
      "nonlinear",
      "interpretable",
      "tabular-data",
      "feature-interactions",
    ],
    summary:
      "Learns a sequence of feature-based decisions that divide data into increasingly specific groups.",
    description:
      "A Decision Tree partitions the feature space using learned rules. Internal nodes test features, branches represent outcomes of those tests, and leaf nodes provide predictions.",
    howItWorks: [
      "Consider candidate splits of the training data.",
      "Select a split that improves a criterion such as Gini impurity, entropy, or squared error.",
      "Repeat the process within child nodes.",
      "Stop based on constraints or pruning.",
      "Predict by following the decision path from root to leaf.",
    ],
    whenToUse: [
      "You want nonlinear predictions on tabular data.",
      "Rule-like decision paths help explain individual predictions.",
      "Feature scaling would add unnecessary preprocessing.",
      "You need a baseline before testing ensembles.",
    ],
    whenToAvoid: [
      "You need stable predictions from a single unconstrained tree.",
      "Small changes in data could materially change learned splits.",
      "You require the strongest possible generalization without tuning or ensembling.",
    ],
    strengths: [
      "Can model nonlinear relationships and feature interactions.",
      "Often requires little feature scaling.",
      "Supports classification and regression.",
      "Individual decision paths can be visualized.",
    ],
    limitations: [
      "Deep trees can overfit.",
      "Small data changes can lead to different structures.",
      "A single tree may be less accurate than an ensemble.",
      "A large tree can become difficult to interpret.",
    ],
    assumptions: [
      "Useful partitions can be discovered from the available features.",
      "Training examples represent the intended deployment setting.",
    ],
    dataRequirements: {
      input: "Numerical or encoded categorical features, depending on implementation.",
      labels: "Class labels or continuous targets.",
      scale: "Small to large tabular datasets.",
      preprocessing: [
        "Handle missing values according to the implementation.",
        "Encode categorical features if required.",
        "Tune depth, minimum leaf size, and pruning.",
      ],
    },
    compute: {
      training: "Low to medium",
      inference: "Low",
      memory: "Low to medium",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "A single tree is usually lightweight.",
    },
    interpretability: {
      level: "medium-high",
      explanation:
        "Small trees can be understandable, but complex trees may contain too many branches to explain reliably.",
      tools: ["tree-visualization", "decision-paths", "permutation-importance"],
    },
    evaluation: {
      primary: ["f1-score", "roc-auc", "mae", "rmse"],
      additional: ["confusion-matrix", "cross-validation"],
      notes: "Choose metrics according to whether the task is classification or regression.",
    },
    useCases: [
      "Customer churn prediction.",
      "Quality-control rules.",
      "Risk screening.",
      "Decision-support systems on structured records.",
    ],
    historicalExample: {
      title: "CART made tree learning a practical modelling framework",
      period: "1984",
      context:
        "The Classification and Regression Trees (CART) framework formalized a widely influential approach to learning decision trees for both classification and regression.",
      connection:
        "It helped establish tree-based learning as a reusable method rather than a collection of manually written rules.",
      attribution: "Historical reference to the CART framework.",
    },
    projectExample: null,
    prerequisites: [
      "Features and target labels.",
      "Overfitting and generalization.",
      "Train/test splits and cross-validation.",
    ],
    relatedModels: ["random-forest", "gradient-boosting", "logistic-regression"],
    illustration: "decision-tree",
    resources: [
      {
        label: "scikit-learn decision trees",
        url: "https://scikit-learn.org/stable/modules/tree.html",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(
    max_depth=5,
    min_samples_leaf=5,
    random_state=42,
)

model.fit(X_train, y_train)`,
      explanation:
        "Depth and leaf-size constraints help control overfitting. Tune these values using validation data or cross-validation.",
    },
  },

  {
    id: "random-forest",
    slug: "random-forest",
    name: "Random Forest",
    shortName: "Random Forest",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "classification", "regression"],
    problemTypes: ["classification", "regression"],
    learningParadigm: ["supervised", "ensemble-learning"],
    tags: [
      "tree-based",
      "ensemble",
      "tabular-data",
      "nonlinear",
      "feature-importance",
    ],
    summary:
      "An ensemble of decision trees trained with randomized samples and features to improve generalization.",
    description:
      "Random Forest trains many decision trees and combines their predictions. Randomized training samples and feature selection reduce the correlation between trees, making the ensemble more robust than many individual trees.",
    howItWorks: [
      "Create bootstrap samples or randomized training subsets.",
      "Train each tree using randomized candidate features at each split.",
      "Aggregate class votes or numerical predictions.",
      "Evaluate the ensemble on held-out data.",
    ],
    whenToUse: [
      "You have structured tabular data.",
      "Relationships may be nonlinear.",
      "You want a strong baseline with limited feature engineering.",
      "You want to compare against a simple linear model.",
    ],
    whenToAvoid: [
      "You need a tiny, easily inspectable model.",
      "Strict low-latency or memory constraints make a large ensemble unsuitable.",
      "The problem is dominated by raw images, audio, or text requiring specialized representation learning.",
      "Extrapolation far beyond observed numerical target ranges is essential.",
    ],
    strengths: [
      "Captures nonlinear patterns and interactions.",
      "Often performs well with limited preprocessing.",
      "Less sensitive to individual training examples than a single tree.",
      "Provides feature-importance estimates.",
    ],
    limitations: [
      "Less interpretable than a small decision tree.",
      "Can use more memory and inference time than a single model.",
      "Built-in impurity importance can be misleading for some feature types.",
      "May be outperformed by boosted trees on some tabular tasks.",
    ],
    assumptions: [
      "Training and deployment data are sufficiently similar.",
      "The supplied features contain predictive signal.",
    ],
    dataRequirements: {
      input: "Structured numerical or encoded categorical features.",
      labels: "Class labels or numerical targets.",
      scale: "Small to large tabular datasets.",
      preprocessing: [
        "Handle missing values according to implementation.",
        "Encode categorical features when necessary.",
        "Check class imbalance and leakage.",
      ],
    },
    compute: {
      training: "Medium",
      inference: "Low to medium",
      memory: "Medium to high for large forests",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Trees can often be trained in parallel.",
    },
    interpretability: {
      level: "medium",
      explanation:
        "Feature importance and permutation importance can help, but the ensemble is not equivalent to a short, human-readable rule set.",
      tools: ["permutation-importance", "partial-dependence", "shap"],
    },
    evaluation: {
      primary: ["f1-score", "roc-auc", "mae", "rmse"],
      additional: ["confusion-matrix", "cross-validation"],
      notes:
        "Use classification metrics for classification and regression metrics for numerical prediction.",
    },
    useCases: [
      "Fraud-risk scoring.",
      "Customer churn prediction.",
      "Agricultural yield estimation.",
      "Predictive maintenance using structured sensor features.",
    ],
    historicalExample: {
      title: "Random Forest formalized randomized tree ensembles",
      period: "2001",
      context:
        "Leo Breiman introduced Random Forests as an ensemble-learning method combining randomized decision trees.",
      connection:
        "The approach became a widely used baseline for structured prediction because it can model nonlinear relationships without extensive scaling or representation learning.",
      attribution: "Specific historical milestone: Breiman's 2001 paper.",
    },
    projectExample: null,
    prerequisites: [
      "Decision trees.",
      "Ensemble learning.",
      "Classification and regression evaluation.",
    ],
    relatedModels: ["decision-tree", "gradient-boosting", "logistic-regression"],
    illustration: "random-forest",
    resources: [
      {
        label: "scikit-learn ensemble methods",
        url: "https://scikit-learn.org/stable/modules/ensemble.html#forest",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=200,
    min_samples_leaf=2,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)

model.fit(X_train, y_train)`,
      explanation:
        "The number of trees, tree depth, and leaf size affect accuracy, memory, and latency. Tune them against a meaningful validation set.",
    },
  },

  {
    id: "gradient-boosting",
    slug: "gradient-boosting",
    name: "Gradient Boosting",
    shortName: "Gradient Boosting",
    type: "algorithm-family",
    family: "traditional-ml",
    categories: ["traditional-ml", "classification", "regression"],
    problemTypes: ["classification", "regression"],
    learningParadigm: ["supervised", "ensemble-learning"],
    tags: [
      "boosting",
      "tree-based",
      "tabular-data",
      "nonlinear",
      "high-performance",
    ],
    summary:
      "Builds an ensemble sequentially, with each new learner improving aspects of the current model's errors.",
    description:
      "Gradient Boosting combines relatively weak learners, often shallow decision trees. Each boosting step follows a loss-related gradient to improve the ensemble. XGBoost, LightGBM, and CatBoost are prominent implementations or variants with different engineering and modelling choices.",
    howItWorks: [
      "Initialize a prediction using a simple estimate.",
      "Calculate the loss-related gradient for the current predictions.",
      "Fit a weak learner to improve the ensemble.",
      "Add the learner's contribution using a learning rate.",
      "Repeat while monitoring validation performance.",
    ],
    whenToUse: [
      "You want strong performance on structured tabular data.",
      "Relationships and interactions are nonlinear.",
      "You can afford model tuning and validation.",
      "You want to benchmark against linear models and Random Forest.",
    ],
    whenToAvoid: [
      "You need a simple model with minimal tuning.",
      "Training latency or resource constraints make iterative fitting impractical.",
      "Your dataset is too small or noisy to support the chosen complexity without careful validation.",
    ],
    strengths: [
      "Often highly competitive on tabular prediction tasks.",
      "Models nonlinear relationships and feature interactions.",
      "Supports classification and regression objectives.",
      "Popular implementations offer extensive tuning and optimization options.",
    ],
    limitations: [
      "Hyperparameter tuning can be important.",
      "Too many boosting rounds or excessive tree depth can overfit.",
      "Training can be more involved than fitting a linear model.",
      "Feature importance does not automatically explain individual predictions or causal effects.",
    ],
    assumptions: [
      "The feature set contains useful predictive signal.",
      "The loss function reflects the real objective.",
      "Validation data is representative and leakage-free.",
    ],
    dataRequirements: {
      input: "Structured feature vectors.",
      labels: "Class labels or numerical targets.",
      scale: "Small to large tabular datasets, depending on implementation.",
      preprocessing: [
        "Handle missing values according to the selected library.",
        "Encode categoricals where required.",
        "Tune learning rate, tree complexity, and number of estimators.",
      ],
    },
    compute: {
      training: "Medium to high",
      inference: "Low to medium",
      memory: "Medium",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "Many workloads run well on CPU; GPU support depends on the library and configuration.",
    },
    interpretability: {
      level: "medium-low",
      explanation:
        "The combined ensemble is complex. Global feature importance, partial dependence, and local explanation methods can provide additional insight.",
      tools: ["permutation-importance", "partial-dependence", "shap"],
    },
    evaluation: {
      primary: ["f1-score", "roc-auc", "mae", "rmse"],
      additional: ["pr-auc", "log-loss", "cross-validation"],
      notes: "Choose metrics according to the target and the cost of errors.",
    },
    useCases: [
      "Credit-risk modelling.",
      "Demand prediction.",
      "Customer churn modelling.",
      "Ranking and prediction from structured business data.",
    ],
    historicalExample: {
      title: "Boosting evolved into a major tabular-learning family",
      period: "1990s onward",
      context:
        "Boosting developed into a broad family of methods, with gradient boosting formalized by combining weak learners through optimization of a differentiable loss.",
      connection:
        "Modern boosted-tree libraries made this approach a common benchmark for structured-data competitions and production prediction systems.",
      attribution:
        "Broad family-level history; no single product deployment is implied.",
    },
    projectExample: null,
    prerequisites: [
      "Decision trees.",
      "Loss functions and overfitting.",
      "Validation and hyperparameter tuning.",
    ],
    relatedModels: ["decision-tree", "random-forest", "linear-regression"],
    illustration: "gradient-boosting",
    resources: [
      {
        label: "scikit-learn ensemble methods",
        url: "https://scikit-learn.org/stable/modules/ensemble.html",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.ensemble import HistGradientBoostingClassifier

model = HistGradientBoostingClassifier(
    learning_rate=0.1,
    max_iter=150,
    max_leaf_nodes=15,
    random_state=42,
)

model.fit(X_train, y_train)`,
      explanation:
        "This is a histogram-based gradient-boosting implementation. Other libraries expose different parameters and categorical-data capabilities.",
    },
  },

  {
    id: "support-vector-machine",
    slug: "support-vector-machine",
    name: "Support Vector Machine (SVM)",
    shortName: "SVM",
    type: "algorithm-family",
    family: "traditional-ml",
    categories: ["traditional-ml", "classification", "regression"],
    problemTypes: ["classification", "regression"],
    learningParadigm: ["supervised"],
    tags: [
      "margin-based",
      "kernel-method",
      "classification",
      "high-dimensional-data",
    ],
    summary:
      "Finds a decision boundary with a large margin; kernel methods can represent nonlinear boundaries.",
    description:
      "An SVM learns a separating boundary that prioritizes margin. With an appropriate kernel, it can model nonlinear decision boundaries without explicitly constructing all transformed features.",
    howItWorks: [
      "Represent examples as feature vectors.",
      "Find a separating boundary that balances margin and classification errors.",
      "Optionally use a kernel to represent nonlinear relationships.",
      "Tune regularization and kernel parameters using validation data.",
    ],
    whenToUse: [
      "You have small or medium datasets with high-dimensional features.",
      "You need a robust baseline for text or engineered feature vectors.",
      "A kernel may capture useful nonlinear structure.",
    ],
    whenToAvoid: [
      "The training dataset is very large and a kernel SVM is computationally impractical.",
      "You need directly calibrated probabilities without an extra calibration step.",
      "The data is raw image, audio, or language input that needs learned representations.",
    ],
    strengths: [
      "Can perform well in high-dimensional spaces.",
      "Kernel variants support nonlinear boundaries.",
      "Margin-based learning can generalize well with appropriate tuning.",
    ],
    limitations: [
      "Kernel SVM training can scale poorly with sample count.",
      "Hyperparameters and feature scaling matter.",
      "The learned decision function may be hard to explain.",
      "Probability estimates require additional methods.",
    ],
    assumptions: [
      "A useful margin-based boundary can separate or approximately separate the data.",
      "The chosen feature representation and kernel capture relevant structure.",
    ],
    dataRequirements: {
      input: "Numerical feature vectors.",
      labels: "Class labels or regression targets.",
      scale: "Often best considered for small to medium datasets, depending on variant.",
      preprocessing: ["Scale numerical features.", "Encode categorical features.", "Tune kernel and regularization."],
    },
    compute: {
      training: "Medium to high for kernel variants",
      inference: "Low to high depending on support vectors",
      memory: "Medium to high for large kernel problems",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Linear SVM variants can be more scalable than kernel variants.",
    },
    interpretability: {
      level: "low-medium",
      explanation:
        "Linear coefficients can be inspected, but nonlinear kernel boundaries are harder to interpret.",
      tools: ["permutation-importance", "calibration", "error-analysis"],
    },
    evaluation: {
      primary: ["precision", "recall", "f1-score", "roc-auc"],
      additional: ["pr-auc", "confusion-matrix", "calibration"],
      notes: "Calibrate scores if reliable probability estimates are needed.",
    },
    useCases: [
      "Text categorization.",
      "Document classification.",
      "Biological data classification.",
      "Image classification using engineered features or extracted representations.",
    ],
    historicalExample: {
      title: "Kernel methods expanded practical nonlinear classification",
      period: "1990s",
      context:
        "Support Vector Machines became influential in statistical learning during the 1990s, including through work on kernel methods and margin-based generalization.",
      connection:
        "They provided a powerful alternative to neural networks and other classifiers for many medium-sized, high-dimensional datasets.",
      attribution: "General history of the SVM family.",
    },
    projectExample: null,
    prerequisites: [
      "Decision boundaries and margins.",
      "Feature scaling.",
      "Classification metrics and cross-validation.",
    ],
    relatedModels: ["logistic-regression", "naive-bayes", "random-forest"],
    illustration: "support-vector-machine",
    resources: [
      {
        label: "scikit-learn SVM guide",
        url: "https://scikit-learn.org/stable/modules/svm.html",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

model = make_pipeline(
    StandardScaler(),
    SVC(kernel="rbf", C=1.0),
)

model.fit(X_train, y_train)`,
      explanation:
        "Scaling is especially important for SVMs with distance- or margin-based geometry. Fit preprocessing only on training data.",
    },
  },

  {
    id: "naive-bayes",
    slug: "naive-bayes",
    name: "Naive Bayes",
    shortName: "Naive Bayes",
    type: "algorithm-family",
    family: "traditional-ml",
    categories: ["traditional-ml", "classification", "nlp"],
    problemTypes: ["classification"],
    learningParadigm: ["supervised", "probabilistic"],
    tags: [
      "probabilistic",
      "text-classification",
      "fast",
      "sparse-data",
      "baseline",
    ],
    summary:
      "A family of probabilistic classifiers that uses Bayes' theorem with simplifying conditional-independence assumptions.",
    description:
      "Naive Bayes estimates class probabilities from feature statistics. Variants such as Multinomial, Bernoulli, and Gaussian Naive Bayes make different assumptions about feature distributions.",
    howItWorks: [
      "Estimate class prior probabilities from training labels.",
      "Estimate feature likelihoods under each class.",
      "Combine priors and likelihoods using Bayes' theorem.",
      "Choose the class with the largest posterior score.",
    ],
    whenToUse: [
      "You need a very fast classification baseline.",
      "You are classifying text represented as token counts or TF-IDF features.",
      "The dataset is small or high-dimensional.",
      "You want a simple model to compare with Logistic Regression.",
    ],
    whenToAvoid: [
      "Feature dependencies are central and the independence assumption causes unacceptable errors.",
      "You need highly accurate probability estimates without checking calibration.",
      "You require complex multimodal reasoning.",
    ],
    strengths: [
      "Very fast training and inference.",
      "Often effective for sparse text features.",
      "Requires relatively little data to estimate parameters.",
      "Simple to implement and benchmark.",
    ],
    limitations: [
      "The conditional-independence assumption is often unrealistic.",
      "Probability estimates can be poorly calibrated.",
      "Performance depends on the selected variant and feature representation.",
    ],
    assumptions: [
      "Features are conditionally independent given the class for the standard naive formulation.",
      "The chosen variant matches the feature type reasonably well.",
    ],
    dataRequirements: {
      input: "Counts, binary features, or numerical features depending on variant.",
      labels: "Categorical target labels.",
      scale: "Small to large datasets, including high-dimensional sparse text.",
      preprocessing: ["Choose the correct variant.", "Vectorize text.", "Avoid fitting vocabulary on test data."],
    },
    compute: {
      training: "Very low",
      inference: "Very low",
      memory: "Low",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Useful for rapid experiments and lightweight services.",
    },
    interpretability: {
      level: "medium",
      explanation:
        "Class priors and feature likelihoods can be inspected, but the independence assumption can make the learned probability model unrealistic.",
      tools: ["class-priors", "feature-log-probabilities", "confusion-matrix"],
    },
    evaluation: {
      primary: ["precision", "recall", "f1-score"],
      additional: ["pr-auc", "log-loss", "calibration"],
      notes: "Use the same held-out split as competing text-classification baselines.",
    },
    useCases: [
      "Email spam filtering.",
      "News topic classification.",
      "Sentiment classification.",
      "Fast document categorization.",
    ],
    historicalExample: {
      title: "Bayesian filtering became a practical spam defence",
      period: "1990s onward",
      context:
        "Probabilistic and Bayesian filtering methods became prominent in anti-spam research and software as email spam grew.",
      connection:
        "Naive Bayes is a useful way to learn how token-level evidence can contribute to a classification decision.",
      attribution:
        "The history of spam filtering includes many variants and systems; this entry does not attribute every filter to Naive Bayes.",
    },
    projectExample: null,
    prerequisites: [
      "Basic probability.",
      "Bayes' theorem.",
      "Text vectorization and classification metrics.",
    ],
    relatedModels: ["logistic-regression", "support-vector-machine", "tf-idf"],
    illustration: "naive-bayes",
    resources: [
      {
        label: "scikit-learn Naive Bayes",
        url: "https://scikit-learn.org/stable/modules/naive_bayes.html",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import CountVectorizer

model = make_pipeline(
    CountVectorizer(),
    MultinomialNB(),
)

model.fit(train_messages, train_labels)`,
      explanation:
        "Multinomial Naive Bayes is a common text-classification baseline for count-like features. Compare it empirically with TF-IDF plus Logistic Regression.",
    },
  },

  {
    id: "k-means",
    slug: "k-means",
    name: "K-Means",
    shortName: "K-Means",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "clustering"],
    problemTypes: ["clustering"],
    learningParadigm: ["unsupervised"],
    tags: [
      "clustering",
      "centroid-based",
      "unsupervised",
      "customer-segmentation",
      "distance-based",
    ],
    summary:
      "Partitions data into a chosen number of clusters by assigning observations to nearby centroids.",
    description:
      "K-Means alternates between assigning observations to their nearest centroid and updating centroids to reduce within-cluster squared distances. It is a popular starting point for clustering numeric features.",
    howItWorks: [
      "Choose the number of clusters, k.",
      "Initialize k centroids.",
      "Assign each observation to its closest centroid.",
      "Recompute each centroid from its assigned observations.",
      "Repeat until convergence or an iteration limit is reached.",
    ],
    whenToUse: [
      "You have numerical feature vectors and a reasonable notion of distance.",
      "You need a fast baseline for grouping similar observations.",
      "Clusters are roughly compact and separable.",
      "You can compare multiple values of k and inspect the resulting groups.",
    ],
    whenToAvoid: [
      "You do not have a defensible distance measure.",
      "Clusters have irregular shapes or very different densities.",
      "There are many extreme outliers.",
      "You need the algorithm to discover the number of clusters automatically.",
    ],
    strengths: [
      "Simple and relatively fast.",
      "Scales well to many common clustering tasks.",
      "Centroids are useful for describing cluster centres.",
      "Works as an accessible introduction to unsupervised learning.",
    ],
    limitations: [
      "You must choose k.",
      "Results depend on initialization and feature scaling.",
      "Outliers can move centroids.",
      "Clusters are not guaranteed to match meaningful real-world groups.",
    ],
    assumptions: [
      "Euclidean distance or the selected distance geometry is meaningful.",
      "Compact centroid-based groups are useful for the task.",
      "Features are scaled appropriately for their importance.",
    ],
    dataRequirements: {
      input: "Numerical feature vectors.",
      labels: "No target labels required.",
      scale: "Small to large datasets; runtime depends on rows, dimensions, k, and iterations.",
      preprocessing: [
        "Scale features when units differ.",
        "Handle missing values.",
        "Inspect outliers.",
        "Choose k using domain knowledge and validation diagnostics.",
      ],
    },
    compute: {
      training: "Low to medium",
      inference: "Low",
      memory: "Low to medium",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "A practical first clustering algorithm for CPU-based projects.",
    },
    interpretability: {
      level: "medium",
      explanation:
        "Centroids can be inspected, but the semantic meaning of a cluster must be established from the data and domain context.",
      tools: ["cluster-profiles", "silhouette-score", "elbow-plot", "pca-visualization"],
    },
    evaluation: {
      primary: ["silhouette-score", "inertia"],
      additional: ["davies-bouldin", "calinski-harabasz", "domain-validation"],
      notes:
        "Internal clustering scores are diagnostics, not proof that the clusters are useful or true.",
    },
    useCases: [
      "Customer segmentation.",
      "Grouping similar documents after vectorization or embedding.",
      "Image colour quantization.",
      "Exploratory grouping of numeric records.",
    ],
    historicalExample: {
      title: "K-Means became a standard clustering baseline",
      period: "1950s onward",
      context:
        "K-Means and related iterative clustering approaches developed into widely taught methods for partitioning numerical data into groups.",
      connection:
        "Its simplicity made it a standard first experiment when exploring structure in unlabelled datasets.",
      attribution: "General history of iterative centroid-based clustering.",
    },
    projectExample: null,
    prerequisites: [
      "Vectors and distance.",
      "Unsupervised learning.",
      "Feature scaling and cluster evaluation.",
    ],
    relatedModels: ["dbscan", "principal-component-analysis", "random-forest"],
    illustration: "k-means",
    resources: [
      {
        label: "scikit-learn clustering guide",
        url: "https://scikit-learn.org/stable/modules/clustering.html#k-means",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

model = make_pipeline(
    StandardScaler(),
    KMeans(n_clusters=4, random_state=42, n_init="auto"),
)

cluster_labels = model.fit_predict(X)`,
      explanation:
        "The number of clusters is illustrative. Explore multiple values of k and inspect cluster profiles before assigning business meaning.",
    },
  },

  {
    id: "dbscan",
    slug: "dbscan",
    name: "DBSCAN",
    shortName: "DBSCAN",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "clustering", "anomaly-detection"],
    problemTypes: ["clustering", "anomaly-detection"],
    learningParadigm: ["unsupervised"],
    tags: [
      "density-based",
      "clustering",
      "outliers",
      "irregular-shapes",
      "unsupervised",
    ],
    summary:
      "Finds dense regions of observations and marks isolated points as noise.",
    description:
      "DBSCAN groups observations according to local density rather than forcing every observation into a fixed number of clusters. It can discover irregularly shaped clusters and identify noise points.",
    howItWorks: [
      "Choose a neighbourhood radius, eps, and a minimum neighbour count.",
      "Identify core points with enough nearby observations.",
      "Expand clusters through connected dense regions.",
      "Mark observations not assigned to a cluster as noise.",
    ],
    whenToUse: [
      "Clusters have irregular shapes.",
      "You want to detect isolated observations during exploratory analysis.",
      "You do not know the number of clusters in advance.",
      "A meaningful distance and neighbourhood scale can be selected.",
    ],
    whenToAvoid: [
      "Cluster densities vary greatly and a single radius is unsuitable.",
      "Feature dimensions make distances uninformative.",
      "You need every new observation to be assigned by a simple native prediction interface.",
    ],
    strengths: [
      "Does not require a fixed number of clusters.",
      "Can find non-spherical clusters.",
      "Identifies noise points.",
    ],
    limitations: [
      "Sensitive to eps, minimum-sample settings, and feature scaling.",
      "Struggles with widely varying cluster densities.",
      "Distance-based performance can deteriorate in high-dimensional spaces.",
      "Noise does not automatically mean fraud or a true anomaly.",
    ],
    assumptions: [
      "Meaningful groups correspond to density-connected regions.",
      "A useful neighbourhood scale exists.",
    ],
    dataRequirements: {
      input: "Numerical features or another suitable distance representation.",
      labels: "No target labels required.",
      scale: "Small to large datasets depending on distance computation and implementation.",
      preprocessing: ["Scale features.", "Choose a suitable distance.", "Inspect density variation."],
    },
    compute: {
      training: "Low to high depending on data and neighbour search",
      inference: "Implementation-dependent",
      memory: "Medium to high in some implementations",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Neighbour search and dataset geometry affect performance.",
    },
    interpretability: {
      level: "medium",
      explanation:
        "Cluster membership follows local density rules, but the real-world meaning of each cluster still needs domain interpretation.",
      tools: ["cluster-visualization", "silhouette-score", "domain-review"],
    },
    evaluation: {
      primary: ["silhouette-score", "cluster-stability"],
      additional: ["noise-fraction", "domain-validation"],
      notes:
        "Some metrics require special handling of noise points and may not suit every clustering geometry.",
    },
    useCases: [
      "Geospatial point clustering.",
      "Discovering dense regions in event data.",
      "Exploratory outlier discovery.",
      "Grouping data with irregular cluster boundaries.",
    ],
    historicalExample: {
      title: "Density-based clustering expanded beyond centroid models",
      period: "1996",
      context:
        "DBSCAN was introduced as a density-based algorithm for discovering clusters in spatial databases with noise.",
      connection:
        "It demonstrated why not all useful clusters can be represented as compact groups around centroids.",
      attribution: "Specific historical milestone: the original DBSCAN publication.",
    },
    projectExample: null,
    prerequisites: [
      "Distance measures.",
      "Clustering and density.",
      "Feature scaling and cluster validation.",
    ],
    relatedModels: ["k-means", "isolation-forest", "principal-component-analysis"],
    illustration: "dbscan",
    resources: [
      {
        label: "scikit-learn DBSCAN",
        url: "https://scikit-learn.org/stable/modules/clustering.html#dbscan",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

model = make_pipeline(
    StandardScaler(),
    DBSCAN(eps=0.5, min_samples=5),
)

labels = model.fit_predict(X)`,
      explanation:
        "DBSCAN's -1 label conventionally indicates noise in scikit-learn. Tune eps to your feature scale; the example values are not universal.",
    },
  },

  {
    id: "principal-component-analysis",
    slug: "principal-component-analysis",
    name: "Principal Component Analysis (PCA)",
    shortName: "PCA",
    type: "method",
    family: "traditional-ml",
    categories: ["traditional-ml", "dimensionality-reduction"],
    problemTypes: ["dimensionality-reduction", "visualization", "preprocessing"],
    learningParadigm: ["unsupervised"],
    tags: [
      "dimensionality-reduction",
      "feature-transformation",
      "linear",
      "visualization",
      "compression",
    ],
    summary:
      "Transforms correlated numerical features into a smaller set of orthogonal components that preserve as much variance as possible.",
    description:
      "PCA finds directions of high variance in numerical data and projects observations onto a smaller number of components. It is a transformation method rather than a complete predictive task by itself.",
    howItWorks: [
      "Prepare a numerical feature matrix.",
      "Center the features and usually scale them when units differ.",
      "Compute principal directions using a decomposition method.",
      "Rank components by explained variance.",
      "Project the data onto the chosen number of components.",
    ],
    whenToUse: [
      "You need to compress correlated numerical features.",
      "You want a two-dimensional exploratory visualization.",
      "You need a lower-dimensional representation before another algorithm.",
      "You want to inspect dominant linear variation in data.",
    ],
    whenToAvoid: [
      "You need components with straightforward original-feature meaning.",
      "Important structure is strongly nonlinear.",
      "Low-variance features contain critical predictive information.",
      "The data has not been appropriately scaled or leakage controlled.",
    ],
    strengths: [
      "Reduces the number of dimensions.",
      "Can reduce redundancy from correlated features.",
      "Useful for exploratory visualization and compression.",
      "Can speed up some downstream methods.",
    ],
    limitations: [
      "Components are combinations of original features and may be hard to interpret.",
      "Maximum variance is not the same as maximum predictive value.",
      "Standard PCA captures linear structure.",
      "Fit PCA only on training data within a predictive pipeline.",
    ],
    assumptions: [
      "Linear combinations are a useful representation.",
      "Variance captures a meaningful aspect of structure for the intended task.",
    ],
    dataRequirements: {
      input: "Numerical feature matrix.",
      labels: "No labels required for standard PCA.",
      scale: "Feature count and solver determine computational cost.",
      preprocessing: ["Handle missing values.", "Center features.", "Scale when units or ranges differ."],
    },
    compute: {
      training: "Low to high depending on matrix dimensions and solver",
      inference: "Low",
      memory: "Medium to high for large matrices",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Incremental and randomized variants can help with large datasets.",
    },
    interpretability: {
      level: "medium-low",
      explanation:
        "Explained variance and component loadings are inspectable, but components may combine many original variables.",
      tools: ["explained-variance-plot", "component-loadings", "two-dimensional-projection"],
    },
    evaluation: {
      primary: ["explained-variance-ratio", "reconstruction-error"],
      additional: ["downstream-model-performance", "visual-inspection"],
      notes:
        "A component count should be selected for the goal, not by explained variance alone.",
    },
    useCases: [
      "Exploratory data visualization.",
      "Feature compression.",
      "Preprocessing before clustering.",
      "Reducing redundancy in high-dimensional numerical data.",
    ],
    historicalExample: {
      title: "PCA grew from classical statistical analysis",
      period: "1901 onward",
      context:
        "Karl Pearson published an early formulation of principal components in 1901; later work helped establish PCA as a standard multivariate technique.",
      connection:
        "PCA shows that useful machine-learning pipelines often combine a representation method with a separate predictive or clustering algorithm.",
      attribution: "Specific historical milestone: Pearson's early principal-component work.",
    },
    projectExample: null,
    prerequisites: [
      "Vectors and matrices.",
      "Variance and covariance.",
      "Feature scaling and dimensionality.",
    ],
    relatedModels: ["k-means", "dbscan", "logistic-regression"],
    illustration: "pca",
    resources: [
      {
        label: "scikit-learn decomposition guide",
        url: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.decomposition import PCA
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

transformer = make_pipeline(
    StandardScaler(),
    PCA(n_components=0.95),
)

X_reduced = transformer.fit_transform(X_train)`,
      explanation:
        "The example keeps enough components to explain 95% of training-set variance. Fit the transformation on training data only, then apply it to validation and test data.",
    },
  },

  {
    id: "isolation-forest",
    slug: "isolation-forest",
    name: "Isolation Forest",
    shortName: "Isolation Forest",
    type: "algorithm",
    family: "traditional-ml",
    categories: ["traditional-ml", "anomaly-detection"],
    problemTypes: ["anomaly-detection"],
    learningParadigm: ["unsupervised", "outlier-detection"],
    tags: [
      "anomaly-detection",
      "outliers",
      "tree-based",
      "unsupervised",
      "risk-monitoring",
    ],
    summary:
      "Identifies unusual observations by isolating points through randomized tree partitions.",
    description:
      "Isolation Forest builds randomized trees that recursively split feature space. Observations that are easier to isolate tend to receive more anomalous scores.",
    howItWorks: [
      "Sample observations from the dataset.",
      "Build trees using randomized feature splits.",
      "Measure how many splits are required to isolate each observation.",
      "Convert isolation behaviour into anomaly scores.",
      "Select an operational threshold using validation or domain requirements.",
    ],
    whenToUse: [
      "You have few or no labelled anomalies.",
      "You need an initial anomaly-detection baseline on structured data.",
      "You want to prioritize unusual records for human investigation.",
    ],
    whenToAvoid: [
      "Rare but legitimate observations must never be flagged without further checks.",
      "The anomaly definition is semantic or context-dependent but absent from features.",
      "You need calibrated fraud probabilities from an unsupervised score.",
    ],
    strengths: [
      "Does not require anomaly labels for fitting.",
      "Can be effective on structured numerical data.",
      "Can scale better than some distance-based approaches.",
      "Provides scores for ranking suspicious observations.",
    ],
    limitations: [
      "Anomaly scores are not automatically probabilities.",
      "A high score does not establish wrongdoing.",
      "Performance depends on feature quality and contamination assumptions.",
      "Rare normal populations can look anomalous.",
    ],
    assumptions: [
      "Unusual observations can be isolated more readily than ordinary observations.",
      "Features represent relevant normal behaviour.",
    ],
    dataRequirements: {
      input: "Numerical or appropriately encoded structured features.",
      labels: "Not required for unsupervised fitting; labels are useful for evaluation.",
      scale: "Small to large structured datasets depending on configuration.",
      preprocessing: ["Handle missing values.", "Encode features.", "Review contamination and threshold settings."],
    },
    compute: {
      training: "Low to medium",
      inference: "Low to medium",
      memory: "Low to medium",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Often practical for CPU-based anomaly screening.",
    },
    interpretability: {
      level: "low-medium",
      explanation:
        "Scores rank unusual records but do not necessarily explain the business reason for the anomaly.",
      tools: ["score-distribution", "case-review", "feature-perturbation"],
    },
    evaluation: {
      primary: ["precision-at-k", "recall", "pr-auc"],
      additional: ["roc-auc", "review-yield", "false-positive-rate"],
      notes:
        "When labels are available, evaluate against them. Without labels, use domain review and monitoring rather than claiming accuracy.",
    },
    useCases: [
      "Unusual transaction screening.",
      "Sensor fault triage.",
      "System monitoring.",
      "Prioritizing records for manual review.",
    ],
    historicalExample: {
      title: "Isolation Forest introduced isolation as the anomaly signal",
      period: "2008",
      context:
        "Isolation Forest was introduced as an anomaly-detection method based on the idea that anomalies can be isolated with fewer random partitions.",
      connection:
        "It provides an alternative to modelling normality through distance alone.",
      attribution: "Specific historical milestone: the original Isolation Forest paper.",
    },
    projectExample: null,
    prerequisites: [
      "Outlier detection.",
      "Feature engineering.",
      "Precision, recall, and false-positive trade-offs.",
    ],
    relatedModels: ["dbscan", "random-forest", "gradient-boosting"],
    illustration: "isolation-forest",
    resources: [
      {
        label: "scikit-learn outlier detection",
        url: "https://scikit-learn.org/stable/modules/outlier_detection.html#isolation-forest",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.ensemble import IsolationForest

model = IsolationForest(
    n_estimators=200,
    contamination="auto",
    random_state=42,
)

model.fit(X_train)
anomaly_scores = model.decision_function(X_test)
predictions = model.predict(X_test)`,
      explanation:
        "In scikit-learn, predictions of -1 indicate outliers and 1 indicate inliers. Validate any threshold against operational costs.",
    },
  },

  // ============================================================
  // 2. DEEP LEARNING FOUNDATIONS
  // ============================================================

  {
    id: "multilayer-perceptron",
    slug: "multilayer-perceptron",
    name: "Multilayer Perceptron (MLP)",
    shortName: "MLP",
    type: "architecture",
    family: "deep-learning",
    categories: ["deep-learning", "classification", "regression"],
    problemTypes: ["classification", "regression"],
    learningParadigm: ["supervised"],
    tags: [
      "neural-network",
      "feedforward",
      "deep-learning",
      "tabular-data",
      "nonlinear",
    ],
    summary:
      "A feedforward neural network that learns nonlinear mappings using layers of interconnected units.",
    description:
      "An MLP passes inputs through one or more hidden layers with nonlinear activation functions. Training adjusts weights using gradient-based optimization and backpropagation.",
    howItWorks: [
      "Pass input features through a sequence of learned linear transformations.",
      "Apply nonlinear activation functions.",
      "Calculate a task-specific loss.",
      "Backpropagate gradients through the network.",
      "Update parameters with an optimizer such as SGD or Adam.",
    ],
    whenToUse: [
      "You have enough data to learn useful nonlinear relationships.",
      "You want a general neural-network baseline on feature vectors.",
      "You need to learn representations for a classification or regression task.",
    ],
    whenToAvoid: [
      "A simple linear or tree-based model already performs well.",
      "Your dataset is small and the network overfits easily.",
      "You need highly interpretable rules.",
      "You need a specialized image, audio, or language architecture rather than a generic dense network.",
    ],
    strengths: [
      "Learns nonlinear interactions.",
      "Flexible across many numerical prediction tasks.",
      "Forms a foundation for understanding neural-network training.",
    ],
    limitations: [
      "Can require careful scaling and tuning.",
      "May overfit small datasets.",
      "Less interpretable than simple models.",
      "Training outcomes depend on architecture, initialization, optimization, and data.",
    ],
    assumptions: [
      "The feature representation contains learnable signal.",
      "The network capacity and training setup suit the amount of data.",
    ],
    dataRequirements: {
      input: "Numerical feature vectors.",
      labels: "Class labels or continuous targets for supervised learning.",
      scale: "Small to large datasets, but data volume and architecture strongly affect results.",
      preprocessing: ["Scale numerical inputs.", "Encode categoricals.", "Use validation and regularization."],
    },
    compute: {
      training: "Medium to high",
      inference: "Low to medium",
      memory: "Medium",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Small MLPs can run on CPU; large networks may benefit from accelerators.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Weights are not usually human-readable explanations. Feature attribution methods can help, with important caveats.",
      tools: ["permutation-importance", "integrated-gradients", "shap"],
    },
    evaluation: {
      primary: ["f1-score", "roc-auc", "mae", "rmse"],
      additional: ["learning-curves", "calibration", "confusion-matrix"],
      notes: "Select metrics according to the task and validate generalization.",
    },
    useCases: [
      "Nonlinear prediction on numerical data.",
      "Classification using engineered features.",
      "Small neural-network learning experiments.",
      "A baseline before exploring specialized architectures.",
    ],
    historicalExample: {
      title: "Backpropagation helped make multilayer networks trainable",
      period: "1980s",
      context:
        "The influential 1986 paper by Rumelhart, Hinton, and Williams helped popularize backpropagation for learning internal representations in multilayer neural networks.",
      connection:
        "It established a core training idea behind many modern deep-learning systems.",
      attribution: "Specific historical milestone: the 1986 backpropagation paper.",
    },
    projectExample: null,
    prerequisites: [
      "Vectors and matrices.",
      "Activation functions and loss.",
      "Gradient descent and train/validation/test splits.",
    ],
    relatedModels: ["cnn", "transformer", "logistic-regression"],
    illustration: "multilayer-perceptron",
    resources: [
      {
        label: "Keras Sequential model guide",
        url: "https://keras.io/guides/sequential_model/",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "TensorFlow / Keras",
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(20,)),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(1, activation="sigmoid"),
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"],
)`,
      explanation:
        "This is a binary-classification example. The output layer and loss must match the actual task and target encoding.",
    },
  },

  {
    id: "cnn",
    slug: "cnn",
    name: "Convolutional Neural Network (CNN)",
    shortName: "CNN",
    type: "architecture",
    family: "deep-learning",
    categories: ["deep-learning", "computer-vision"],
    problemTypes: ["image-classification", "object-detection", "segmentation"],
    learningParadigm: ["supervised", "self-supervised"],
    tags: [
      "computer-vision",
      "image-classification",
      "convolution",
      "feature-extraction",
      "deep-learning",
    ],
    summary:
      "Uses convolutional operations to learn spatial patterns such as edges, textures, shapes, and higher-level image features.",
    description:
      "CNNs apply learned filters across spatial regions. This structure shares parameters across an image and helps networks learn hierarchical visual representations.",
    howItWorks: [
      "Pass image pixels through learned convolutional filters.",
      "Apply nonlinear activations.",
      "Downsample or otherwise transform spatial feature maps.",
      "Combine learned features for classification, detection, or segmentation.",
      "Train using task-specific losses and labelled or self-supervised data.",
    ],
    whenToUse: [
      "Your input is an image or spatial grid.",
      "You need a learned visual representation.",
      "You can use transfer learning or have enough data to train a suitable model.",
      "You need a foundation for understanding image architectures.",
    ],
    whenToAvoid: [
      "The task is ordinary tabular prediction and a tree-based model is more appropriate.",
      "You have very few labelled images and no suitable pretrained model or augmentation strategy.",
      "The deployment environment cannot meet the model's latency or memory requirements.",
    ],
    strengths: [
      "Learns useful spatial features from pixels.",
      "Parameter sharing can be more efficient than fully connected image models.",
      "Transfer learning can reduce the amount of labelled data required.",
      "Supports classification, detection, and segmentation architectures.",
    ],
    limitations: [
      "Can require significant data and compute.",
      "Sensitive to distribution shifts and image quality.",
      "May learn spurious backgrounds or acquisition artefacts.",
      "Predictions can be difficult to explain.",
    ],
    assumptions: [
      "Local spatial patterns are informative.",
      "Training images represent the intended deployment setting.",
    ],
    dataRequirements: {
      input: "Images or spatial tensors.",
      labels: "Task-specific labels for supervised learning; other learning paradigms are possible.",
      scale: "Ranges from small transfer-learning datasets to very large training corpora.",
      preprocessing: ["Resize appropriately.", "Normalize pixels.", "Use label-preserving augmentation where suitable.", "Separate related images across splits."],
    },
    compute: {
      training: "Medium to very high",
      inference: "Low to high depending on architecture and image size",
      memory: "Medium to high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "Small pretrained networks can run on CPU, although GPU acceleration often helps training.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Feature visualizations and saliency methods can provide clues but do not prove that a model reasons correctly.",
      tools: ["grad-cam", "saliency-maps", "error-analysis"],
    },
    evaluation: {
      primary: ["accuracy", "macro-f1", "per-class-recall"],
      additional: ["confusion-matrix", "precision-recall", "latency"],
      notes:
        "For detection or segmentation, use task-specific metrics such as mAP or IoU rather than classification accuracy alone.",
    },
    useCases: [
      "Image classification.",
      "Plant-disease image screening.",
      "Visual quality inspection.",
      "Medical-image research and decision support.",
    ],
    historicalExample: {
      title: "AlexNet accelerated modern interest in deep visual learning",
      period: "2012",
      context:
        "AlexNet achieved a landmark result in the 2012 ImageNet Large Scale Visual Recognition Challenge and helped demonstrate the impact of deep convolutional networks trained with GPUs.",
      connection:
        "It marked a major turning point in modern computer vision, although the broader progress also depended on datasets, hardware, and training methods.",
      attribution: "Specific historical milestone: the 2012 ImageNet competition.",
    },
    projectExample: {
      title: "Bean leaf classification",
      context:
        "Train or fine-tune a CNN to classify leaf images into categories such as angular leaf spot, bean rust, and healthy.",
      learningPoints: [
        "Image preprocessing and augmentation must preserve class meaning.",
        "Split data to avoid near-duplicate or related images leaking across sets.",
        "Inspect per-class recall and confusion matrices.",
      ],
    },
    prerequisites: [
      "Neural-network basics.",
      "Image tensors and convolution.",
      "Overfitting, augmentation, and transfer learning.",
    ],
    relatedModels: ["resnet", "efficientnet", "yolo", "unet"],
    illustration: "cnn",
    resources: [
      {
        label: "TensorFlow image classification tutorial",
        url: "https://www.tensorflow.org/tutorials/images/classification",
        type: "tutorial",
      },
    ],
    codeExample: {
      language: "python",
      library: "TensorFlow / Keras",
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(128, 128, 3)),
    tf.keras.layers.Rescaling(1.0 / 255),
    tf.keras.layers.Conv2D(32, 3, activation="relu"),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.Conv2D(64, 3, activation="relu"),
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(3, activation="softmax"),
])`,
      explanation:
        "This is a small illustrative CNN for three classes, not a production-ready architecture. A pretrained model is often a stronger starting point.",
    },
  },

  {
    id: "resnet",
    slug: "resnet",
    name: "Residual Network (ResNet)",
    shortName: "ResNet",
    type: "architecture-family",
    family: "deep-learning",
    categories: ["deep-learning", "computer-vision"],
    problemTypes: ["image-classification", "feature-extraction"],
    learningParadigm: ["supervised", "transfer-learning"],
    tags: [
      "cnn",
      "residual-learning",
      "computer-vision",
      "transfer-learning",
      "image-classification",
    ],
    summary:
      "A CNN family that uses skip connections to make very deep networks easier to optimize.",
    description:
      "Residual blocks provide shortcut paths that let layers learn residual transformations rather than requiring every block to learn a complete new mapping. ResNet became a widely used vision backbone and transfer-learning starting point.",
    howItWorks: [
      "Extract image features using convolutional layers.",
      "Use residual blocks that combine a block's transformation with a shortcut.",
      "Stack blocks to build deeper representations.",
      "Train for image classification or adapt the backbone to another visual task.",
    ],
    whenToUse: [
      "You need a well-established image-classification backbone.",
      "You want to use pretrained visual features.",
      "You need a baseline for transfer learning or feature extraction.",
    ],
    whenToAvoid: [
      "A smaller mobile-oriented model is needed for a strict edge-device budget.",
      "A different architecture is better suited to the task or available pretrained weights.",
      "You need object detection or segmentation but plan to use a classifier without an appropriate task-specific head.",
    ],
    strengths: [
      "Well-studied architecture family.",
      "Residual connections enable deeper networks.",
      "Many pretrained variants and implementations are available.",
      "Useful as a baseline for image classification and transfer learning.",
    ],
    limitations: [
      "Larger variants can require substantial compute.",
      "ImageNet pretraining may not match the target domain.",
      "Classification backbones need adaptation for detection or segmentation.",
    ],
    assumptions: [
      "Visual features learned from the training domain transfer sufficiently to the target task.",
      "Input preprocessing matches the selected pretrained weights.",
    ],
    dataRequirements: {
      input: "Images with preprocessing appropriate to the model.",
      labels: "Image labels for supervised fine-tuning; pretrained feature extraction may need fewer labels.",
      scale: "Transfer learning can be effective on modest datasets, but validation is essential.",
      preprocessing: ["Match expected image size and normalization.", "Use careful train/validation splits.", "Apply suitable augmentation."],
    },
    compute: {
      training: "Medium to high",
      inference: "Medium",
      memory: "Medium to high depending on variant",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Smaller ResNet variants can run on CPU; training is generally faster on a GPU.",
    },
    interpretability: {
      level: "low",
      explanation:
        "The learned visual representations are distributed across many layers.",
      tools: ["grad-cam", "saliency-maps", "per-class-error-analysis"],
    },
    evaluation: {
      primary: ["accuracy", "macro-f1", "per-class-recall"],
      additional: ["confusion-matrix", "latency", "model-size"],
      notes: "Report class-wise results and test on images representative of deployment.",
    },
    useCases: [
      "Image classification.",
      "Transfer learning for specialized image datasets.",
      "Visual feature extraction.",
      "Backbones for detection and segmentation systems.",
    ],
    historicalExample: {
      title: "Residual learning won the 2015 ImageNet classification challenge",
      period: "2015",
      context:
        "The ResNet paper introduced residual learning and reported strong results in the 2015 ImageNet Large Scale Visual Recognition Challenge.",
      connection:
        "Skip connections became a major design pattern in deep neural networks.",
      attribution: "Specific historical milestone: the original ResNet research.",
    },
    projectExample: null,
    prerequisites: [
      "CNNs and convolutional feature maps.",
      "Residual connections.",
      "Transfer learning and image preprocessing.",
    ],
    relatedModels: ["cnn", "efficientnet", "vision-transformer"],
    illustration: "resnet",
    resources: [
      {
        label: "Original ResNet paper",
        url: "https://arxiv.org/abs/1512.03385",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "python",
      library: "TensorFlow / Keras",
      code: `import tensorflow as tf

backbone = tf.keras.applications.ResNet50(
    include_top=False,
    weights="imagenet",
    pooling="avg",
)

backbone.trainable = False`,
      explanation:
        "This loads a pretrained feature extractor. Use the preprocessing function that matches the chosen ResNet implementation before passing images to it.",
    },
  },

  {
    id: "efficientnet",
    slug: "efficientnet",
    name: "EfficientNet",
    shortName: "EfficientNet",
    type: "architecture-family",
    family: "deep-learning",
    categories: ["deep-learning", "computer-vision"],
    problemTypes: ["image-classification", "feature-extraction"],
    learningParadigm: ["supervised", "transfer-learning"],
    tags: [
      "cnn",
      "computer-vision",
      "image-classification",
      "transfer-learning",
      "compute-efficiency",
    ],
    summary:
      "A CNN family that scales network depth, width, and input resolution in a coordinated way.",
    description:
      "EfficientNet introduced compound scaling as a principled way to scale several network dimensions together. EfficientNet variants are used for image classification and as pretrained visual feature extractors.",
    howItWorks: [
      "Start from a baseline convolutional architecture.",
      "Scale depth, width, and input resolution together according to a compound-scaling strategy.",
      "Train or fine-tune the network for the target image task.",
      "Evaluate accuracy alongside model size, latency, and memory.",
    ],
    whenToUse: [
      "You need an image-classification backbone.",
      "You want to try transfer learning on a modest labelled image dataset.",
      "You want to consider accuracy and resource use together.",
      "You need a practical baseline for visual classification.",
    ],
    whenToAvoid: [
      "A simpler traditional model fits a non-image problem.",
      "The chosen variant is too large for the deployment environment.",
      "You cannot match the required input preprocessing or licence conditions.",
      "A specialized detection or segmentation architecture is needed instead of a classifier.",
    ],
    strengths: [
      "Designed to balance accuracy and computational cost.",
      "Multiple variants support different resource budgets.",
      "Pretrained weights can reduce training needs.",
      "Useful for transfer-learning experiments.",
    ],
    limitations: [
      "Larger variants may be expensive to fine-tune.",
      "Performance depends on data quality and preprocessing.",
      "A pretrained ImageNet classifier may not automatically recognize specialized domain classes.",
      "Model size alone does not determine real latency on every device.",
    ],
    assumptions: [
      "Pretrained visual representations transfer to the target dataset.",
      "The input pipeline matches the selected variant.",
    ],
    dataRequirements: {
      input: "Images resized and normalized according to the selected variant.",
      labels: "Class labels for supervised training or fine-tuning.",
      scale: "Transfer learning is useful when labelled data is limited, but must be evaluated carefully.",
      preprocessing: ["Use the correct input dimensions.", "Use matching preprocessing.", "Apply safe augmentation.", "Avoid duplicate-image leakage."],
    },
    compute: {
      training: "Medium to high",
      inference: "Low to high depending on variant and hardware",
      memory: "Low to high depending on variant",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "EfficientNet variants differ substantially. Benchmark on the actual deployment hardware.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Predictions arise from complex learned visual features. Saliency tools can support inspection but are not definitive explanations.",
      tools: ["grad-cam", "saliency-maps", "confusion-matrix"],
    },
    evaluation: {
      primary: ["accuracy", "macro-f1", "per-class-recall"],
      additional: ["confusion-matrix", "latency", "model-size"],
      notes:
        "For imbalanced disease classes, report per-class precision and recall, not accuracy alone.",
    },
    useCases: [
      "Plant disease image classification.",
      "Product and object image classification.",
      "Visual inspection.",
      "Transfer learning for specialized image datasets.",
    ],
    historicalExample: {
      title: "EfficientNet introduced compound model scaling",
      period: "2019",
      context:
        "The EfficientNet research introduced a compound-scaling method and reported strong ImageNet performance relative to computational cost.",
      connection:
        "The family illustrates why choosing a neural architecture is partly a resource-allocation problem, not just a search for maximum accuracy.",
      attribution: "Specific historical milestone: the original EfficientNet paper and model release.",
    },
    projectExample: {
      title: "Bean leaf classification",
      context:
        "Use EfficientNetB0 as a pretrained image backbone and fine-tune it to distinguish angular leaf spot, bean rust, and healthy bean leaves.",
      learningPoints: [
        "Transfer learning can reduce training cost.",
        "Keep validation and test data separate from training.",
        "Inspect per-class recall and confusion matrices.",
        "Benchmark CPU and GPU latency separately if deployment constraints matter.",
      ],
    },
    prerequisites: [
      "CNN fundamentals.",
      "Transfer learning.",
      "Image preprocessing and classification evaluation.",
    ],
    relatedModels: ["cnn", "resnet", "vision-transformer"],
    illustration: "efficientnet",
    resources: [
      {
        label: "TensorFlow Hub image classification tutorial",
        url: "https://www.tensorflow.org/hub/tutorials/image_classification",
        type: "tutorial",
      },
      {
        label: "EfficientNet research paper",
        url: "https://arxiv.org/abs/1905.11946",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "python",
      library: "TensorFlow / Keras",
      code: `import tensorflow as tf

backbone = tf.keras.applications.EfficientNetB0(
    include_top=False,
    weights="imagenet",
    pooling="avg",
)

backbone.trainable = False

inputs = tf.keras.Input(shape=(224, 224, 3))
features = backbone(inputs, training=False)
outputs = tf.keras.layers.Dense(
    3,
    activation="softmax",
)(features)

model = tf.keras.Model(inputs, outputs)`,
      explanation:
        "This creates a frozen feature extractor and a three-class prediction head. Follow the preprocessing expectations for the chosen TensorFlow/Keras EfficientNet implementation.",
    },
  },

  {
    id: "yolo",
    slug: "yolo",
    name: "YOLO (You Only Look Once)",
    shortName: "YOLO",
    type: "architecture-family",
    family: "deep-learning",
    categories: ["deep-learning", "computer-vision", "object-detection"],
    problemTypes: ["object-detection"],
    learningParadigm: ["supervised"],
    tags: [
      "object-detection",
      "real-time-vision",
      "bounding-boxes",
      "computer-vision",
      "deep-learning",
    ],
    summary:
      "A family of object-detection architectures designed to locate and classify objects within images.",
    description:
      "YOLO-style detectors predict object classes and bounding boxes in a single detection pipeline. Different generations and implementations vary in architecture, speed, accuracy, licensing, and supported tasks.",
    howItWorks: [
      "Process an input image through a detection network.",
      "Predict candidate object locations and class scores.",
      "Filter and refine detections using confidence thresholds and post-processing.",
      "Evaluate detection quality and inference latency.",
    ],
    whenToUse: [
      "You need object locations as well as class labels.",
      "You need detection across image or video streams.",
      "Latency matters and a suitable model variant meets the quality target.",
    ],
    whenToAvoid: [
      "You only need one label for an entire image.",
      "You need pixel-level masks and have not selected a segmentation-capable model.",
      "Your hardware cannot meet the required frame rate or image resolution.",
      "You have not reviewed the chosen implementation's licence and deployment terms.",
    ],
    strengths: [
      "Designed for efficient object detection.",
      "Can support image and video workflows.",
      "Pretrained models and training pipelines are widely available.",
    ],
    limitations: [
      "Requires box-labelled data for supervised custom detection.",
      "Small objects and crowded scenes can be challenging.",
      "Results depend on image size, thresholding, and deployment hardware.",
      "Different implementations and versions have different licences and capabilities.",
    ],
    assumptions: [
      "Objects of interest can be represented by the chosen annotation scheme.",
      "Training examples resemble deployment images sufficiently.",
    ],
    dataRequirements: {
      input: "Images or video frames.",
      labels: "Bounding boxes and class labels for supervised training.",
      scale: "Pretrained inference is possible without custom training; fine-tuning requires annotated data.",
      preprocessing: ["Annotate boxes consistently.", "Resize images appropriately.", "Use suitable augmentation.", "Check small-object representation."],
    },
    compute: {
      training: "High",
      inference: "Low to high depending on model size and hardware",
      memory: "Medium to high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Small variants can run on CPU, but real-time throughput may require acceleration.",
    },
    interpretability: {
      level: "low-medium",
      explanation:
        "Bounding boxes and class scores make outputs inspectable, but the internal visual reasoning is complex.",
      tools: ["detection-visualization", "per-class-ap", "error-analysis"],
    },
    evaluation: {
      primary: ["mean-average-precision", "precision", "recall"],
      additional: ["intersection-over-union", "latency", "frames-per-second"],
      notes:
        "Use object-detection metrics and benchmark speed at the intended image size and hardware.",
    },
    useCases: [
      "Road-scene object detection.",
      "Counting objects in images.",
      "Industrial visual inspection.",
      "Wildlife or crop monitoring.",
    ],
    historicalExample: {
      title: "YOLO popularized single-stage object detection",
      period: "2015",
      context:
        "The original YOLO paper reframed object detection as a single neural-network prediction problem, emphasizing end-to-end detection and speed.",
      connection:
        "It helped popularize real-time object-detection approaches for video and practical vision applications.",
      attribution: "Specific historical milestone: the original YOLO paper.",
    },
    projectExample: null,
    prerequisites: [
      "CNNs.",
      "Bounding boxes and object-detection metrics.",
      "Image annotation and model deployment.",
    ],
    relatedModels: ["cnn", "resnet", "unet"],
    illustration: "yolo",
    resources: [
      {
        label: "Original YOLO paper",
        url: "https://arxiv.org/abs/1506.02640",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "python",
      library: "Ultralytics",
      code: `from ultralytics import YOLO

model = YOLO("yolo11n.pt")
results = model("image.jpg")

for result in results:
    print(result.boxes)`,
      explanation:
        "The model name and API are implementation-specific. Check the installed library version, model availability, and licensing before production use.",
    },
  },

  {
    id: "unet",
    slug: "unet",
    name: "U-Net",
    shortName: "U-Net",
    type: "architecture",
    family: "deep-learning",
    categories: ["deep-learning", "computer-vision", "segmentation"],
    problemTypes: ["image-segmentation"],
    learningParadigm: ["supervised"],
    tags: [
      "segmentation",
      "pixel-level-prediction",
      "medical-imaging",
      "encoder-decoder",
      "computer-vision",
    ],
    summary:
      "An encoder-decoder CNN architecture designed to assign a class to each image pixel.",
    description:
      "U-Net combines a contracting path that captures context with an expanding path that restores spatial detail. Skip connections link corresponding levels to help retain fine-grained information.",
    howItWorks: [
      "Encode the image into increasingly abstract feature maps.",
      "Decode features into a spatial prediction.",
      "Use skip connections to preserve localization information.",
      "Compare predicted masks with labelled masks using a segmentation loss.",
    ],
    whenToUse: [
      "You need pixel-level regions rather than one image label.",
      "You have annotated masks.",
      "Precise localization matters, such as delineating a leaf lesion or an anatomical structure.",
    ],
    whenToAvoid: [
      "Image-level classification is sufficient.",
      "Pixel masks are unavailable and cannot be produced or approximated.",
      "The chosen model cannot meet inference or memory requirements.",
    ],
    strengths: [
      "Designed for pixel-level segmentation.",
      "Skip connections combine context and spatial detail.",
      "Has been adapted to many image-segmentation domains.",
    ],
    limitations: [
      "Pixel-level annotation can be expensive.",
      "Segmentation quality may degrade under domain shift.",
      "Large images can require substantial memory.",
      "The architecture does not guarantee medically or scientifically valid outputs.",
    ],
    assumptions: [
      "Training masks represent the desired segmentation target.",
      "The image distribution is sufficiently similar at training and inference.",
    ],
    dataRequirements: {
      input: "Images.",
      labels: "Pixel-level masks for supervised training.",
      scale: "Depends on image complexity, model size, and annotation quality.",
      preprocessing: ["Align masks with images.", "Apply matching geometric transformations.", "Normalize images appropriately.", "Use segmentation-aware metrics."],
    },
    compute: {
      training: "Medium to high",
      inference: "Medium",
      memory: "Medium to high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Large images can drive memory use up sharply.",
    },
    interpretability: {
      level: "low-medium",
      explanation:
        "The output mask can be inspected directly, but it does not explain why the model assigned each pixel to a class.",
      tools: ["mask-overlay", "iou-analysis", "error-visualization"],
    },
    evaluation: {
      primary: ["intersection-over-union", "dice-score"],
      additional: ["pixel-precision", "pixel-recall", "boundary-metrics"],
      notes:
        "Evaluate per class and consider boundary quality where the application depends on precise outlines.",
    },
    useCases: [
      "Medical-image segmentation research.",
      "Satellite and aerial image segmentation.",
      "Plant lesion segmentation.",
      "Industrial surface-defect localization.",
    ],
    historicalExample: {
      title: "U-Net became influential in biomedical image segmentation",
      period: "2015",
      context:
        "The U-Net paper introduced an encoder-decoder architecture with skip connections and demonstrated strong results in biomedical image segmentation.",
      connection:
        "It showed how contextual features and spatial detail could be combined in pixel-level prediction.",
      attribution: "Specific historical milestone: the original U-Net paper.",
    },
    projectExample: null,
    prerequisites: [
      "CNNs.",
      "Image masks and pixel labels.",
      "IoU and Dice score.",
    ],
    relatedModels: ["cnn", "resnet", "yolo"],
    illustration: "unet",
    resources: [
      {
        label: "Original U-Net paper",
        url: "https://arxiv.org/abs/1505.04597",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "text",
      library: "architecture concept",
      code: `Image
  -> Encoder: capture visual context
  -> Bottleneck: compressed representation
  -> Decoder: restore spatial resolution
  -> Segmentation mask: one prediction per pixel`,
      explanation:
        "This is a conceptual architecture outline rather than executable code. A working implementation also needs output channels, activations, losses, and data masks.",
    },
  },

  {
    id: "vision-transformer",
    slug: "vision-transformer",
    name: "Vision Transformer (ViT)",
    shortName: "ViT",
    type: "architecture",
    family: "deep-learning",
    categories: ["deep-learning", "computer-vision"],
    problemTypes: ["image-classification", "feature-extraction"],
    learningParadigm: ["supervised", "self-supervised", "transfer-learning"],
    tags: [
      "transformer",
      "computer-vision",
      "image-classification",
      "patch-embeddings",
      "transfer-learning",
    ],
    summary:
      "Applies Transformer-style attention to sequences of image patches.",
    description:
      "A Vision Transformer divides an image into patches, embeds them as tokens, and uses self-attention to model relationships across the image. Performance depends on architecture, pretraining, dataset size, and fine-tuning.",
    howItWorks: [
      "Divide an image into patches.",
      "Convert patches into token embeddings and add positional information.",
      "Process the token sequence with Transformer layers.",
      "Use a classification head or another task-specific head.",
    ],
    whenToUse: [
      "You want to explore attention-based image architectures.",
      "Suitable pretrained weights are available.",
      "You need a comparison with CNN-based transfer learning.",
    ],
    whenToAvoid: [
      "You have very limited data and no appropriate pretrained model.",
      "A compact CNN better satisfies latency or memory limits.",
      "You assume attention automatically makes the model more accurate or interpretable.",
    ],
    strengths: [
      "Models relationships between image patches.",
      "Supports transfer learning from large pretrained datasets.",
      "Provides a useful comparison with convolutional architectures.",
    ],
    limitations: [
      "Training from scratch can require substantial data and compute.",
      "Input resolution and patch size affect cost and detail.",
      "Attention weights are not automatically faithful explanations.",
    ],
    assumptions: [
      "Patch-based representation preserves enough useful visual information.",
      "Pretraining and fine-tuning data are suitable for the task.",
    ],
    dataRequirements: {
      input: "Images converted to patches or patch embeddings.",
      labels: "Task labels for supervised fine-tuning; pretraining may use other objectives.",
      scale: "Transfer learning can work on smaller datasets; training from scratch is more demanding.",
      preprocessing: ["Use matching input resolution and normalization.", "Use suitable augmentation.", "Validate transfer to the target domain."],
    },
    compute: {
      training: "High",
      inference: "Medium to high",
      memory: "Medium to high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Small pretrained variants can be used without a GPU, with a speed trade-off.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Attention visualizations can be inspected, but attention weights alone do not establish a faithful explanation of a prediction.",
      tools: ["attention-visualization", "saliency-maps", "error-analysis"],
    },
    evaluation: {
      primary: ["accuracy", "macro-f1", "per-class-recall"],
      additional: ["latency", "model-size", "confusion-matrix"],
      notes: "Compare against CNN baselines on the same split and deployment budget.",
    },
    useCases: [
      "Image classification.",
      "Visual feature extraction.",
      "Image retrieval and multimodal systems.",
    ],
    historicalExample: {
      title: "Attention-based architectures expanded into computer vision",
      period: "2020 onward",
      context:
        "Vision Transformer research showed that a Transformer operating on image patches could perform competitively on image recognition, particularly when supported by suitable pretraining.",
      connection:
        "It helped establish attention-based models as an important alternative to purely convolutional vision backbones.",
      attribution: "Historical context for the Vision Transformer research line.",
    },
    projectExample: null,
    prerequisites: [
      "CNNs and image patches.",
      "Attention and token embeddings.",
      "Transfer learning and image evaluation.",
    ],
    relatedModels: ["transformer", "cnn", "resnet", "efficientnet"],
    illustration: "vision-transformer",
    resources: [
      {
        label: "Vision Transformer paper",
        url: "https://arxiv.org/abs/2010.11929",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "text",
      library: "architecture concept",
      code: `Image
  -> Patch extraction
  -> Patch embeddings + position information
  -> Transformer encoder
  -> Classification or task-specific head`,
      explanation:
        "This outline describes the core idea. Concrete libraries differ in preprocessing, tokenization, model heads, and training recipes.",
    },
  },

  // ============================================================
  // 3. NLP AND TEXT REPRESENTATION
  // ============================================================

  {
    id: "tf-idf",
    slug: "tf-idf",
    name: "TF-IDF",
    shortName: "TF-IDF",
    type: "method",
    family: "nlp",
    categories: ["nlp", "traditional-ml", "text-representation", "information-retrieval"],
    problemTypes: ["text-classification", "search", "document-similarity"],
    learningParadigm: ["feature-engineering"],
    tags: [
      "text",
      "feature-extraction",
      "sparse-vectors",
      "information-retrieval",
      "cpu-friendly",
    ],
    summary:
      "Represents documents with term weights that reflect a term's importance within a document relative to a collection.",
    description:
      "Term Frequency–Inverse Document Frequency converts text into sparse numerical vectors. It is a feature-representation method, not a classifier by itself; it is commonly paired with Logistic Regression, Naive Bayes, or linear SVMs.",
    howItWorks: [
      "Tokenize documents into terms or n-grams.",
      "Measure term frequency within each document.",
      "Reduce the weight of terms that occur across many documents.",
      "Produce sparse vectors suitable for a classifier or similarity calculation.",
    ],
    whenToUse: [
      "You need a lightweight baseline for text classification.",
      "The dataset is small or medium and labels are available.",
      "Keyword and n-gram signals are informative.",
      "You want an inexpensive representation before trying embeddings or Transformers.",
    ],
    whenToAvoid: [
      "Meaning depends heavily on paraphrase or context rather than word overlap.",
      "You need semantic similarity across very different wording.",
      "You need a language model to generate or interpret text.",
    ],
    strengths: [
      "Fast and CPU-friendly.",
      "Easy to combine with traditional classifiers.",
      "Works well on many bag-of-words text tasks.",
      "Produces sparse representations.",
    ],
    limitations: [
      "Does not inherently understand word meaning or context.",
      "Word order is represented only to the extent included through n-grams.",
      "Vocabulary can become large.",
      "Rare and misspelled tokens can complicate matching.",
    ],
    assumptions: [
      "Term occurrence and frequency carry useful task information.",
      "The fitted vocabulary is suitable for the data distribution.",
    ],
    dataRequirements: {
      input: "Text documents.",
      labels: "Labels required only for downstream supervised classification.",
      scale: "Small to large text collections, depending on vocabulary size and downstream model.",
      preprocessing: ["Choose tokenization.", "Consider lowercasing and n-grams.", "Fit vocabulary on training data only.", "Inspect sparse matrix dimensions."],
    },
    compute: {
      training: "Very low for feature extraction",
      inference: "Very low",
      memory: "Low to medium depending on vocabulary",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "A strong baseline when compute or deployment cost is constrained.",
    },
    interpretability: {
      level: "high-medium",
      explanation:
        "Terms and their weights can be inspected. Interpretability of final predictions also depends on the downstream model.",
      tools: ["top-weighted-terms", "feature-coefficients", "document-similarity"],
    },
    evaluation: {
      primary: ["precision", "recall", "f1-score"],
      additional: ["pr-auc", "roc-auc", "retrieval-precision-at-k"],
      notes:
        "For classification, evaluate the complete vectorizer-plus-classifier pipeline. For search, use retrieval-specific metrics.",
    },
    useCases: [
      "SMS spam classification.",
      "Document and news categorization.",
      "Keyword-based document search.",
      "A lexical baseline for information retrieval.",
    ],
    historicalExample: {
      title: "Term weighting became a foundation of information retrieval",
      period: "1970s onward",
      context:
        "TF-IDF-style term weighting became a classic technique in information retrieval for ranking and representing documents using term frequency and collection-wide rarity.",
      connection:
        "It remains a useful baseline because it is simple, efficient, and easy to inspect.",
      attribution: "Broad history of term-weighting methods.",
    },
    projectExample: {
      title: "ScamShield KE",
      context:
        "Represent SMS messages with word and bigram TF-IDF features before training a classifier to distinguish spam from legitimate messages.",
      learningPoints: [
        "TF-IDF performs representation; Logistic Regression performs classification.",
        "A phrase can be more informative than a single token.",
        "Keep the vectorizer inside the training pipeline to avoid vocabulary leakage.",
      ],
    },
    prerequisites: [
      "Text tokenization.",
      "Sparse matrices.",
      "Classification or information-retrieval metrics.",
    ],
    relatedModels: ["logistic-regression", "naive-bayes", "support-vector-machine", "sentence-embeddings"],
    illustration: "tf-idf",
    resources: [
      {
        label: "scikit-learn text feature extraction",
        url: "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "scikit-learn",
      code: `from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(
    ngram_range=(1, 2),
    min_df=2,
    sublinear_tf=True,
)

X_train_text = vectorizer.fit_transform(train_messages)
X_test_text = vectorizer.transform(test_messages)`,
      explanation:
        "Fit the vectorizer on training text only. Reuse the fitted vocabulary to transform validation and test text.",
    },
  },

  {
    id: "transformer",
    slug: "transformer",
    name: "Transformer",
    shortName: "Transformer",
    type: "architecture",
    family: "deep-learning",
    categories: ["deep-learning", "nlp", "computer-vision", "sequence-modeling"],
    problemTypes: [
      "text-classification",
      "translation",
      "summarization",
      "generation",
      "sequence-modeling",
    ],
    learningParadigm: ["supervised", "self-supervised"],
    tags: [
      "attention",
      "sequence-modeling",
      "language-models",
      "deep-learning",
      "multimodal",
    ],
    summary:
      "An architecture built around attention mechanisms for modelling relationships between elements in a sequence or set of tokens.",
    description:
      "Transformers use attention to mix information across token representations. Different designs include encoder-only models, decoder-only models, and encoder-decoder models. They underpin many modern language systems and have also been adapted to images and other modalities.",
    howItWorks: [
      "Convert inputs into tokens or patch representations.",
      "Embed tokens and add positional information where needed.",
      "Use attention to compute context-dependent representations.",
      "Apply feedforward blocks and normalization through stacked layers.",
      "Train using an objective suited to the task, such as masked-token prediction or next-token prediction.",
    ],
    whenToUse: [
      "Context and relationships across a sequence are important.",
      "You have access to an appropriate pretrained model.",
      "You need language understanding, generation, or modern sequence modelling.",
      "You can meet the model's latency, memory, and licensing requirements.",
    ],
    whenToAvoid: [
      "A lightweight TF-IDF baseline already meets the objective.",
      "Your dataset is small and you plan to train a large model from scratch.",
      "The system requires deterministic factual outputs without validation or controls.",
      "Your compute budget cannot support the chosen model.",
    ],
    strengths: [
      "Attention captures long-range relationships in input representations.",
      "Training can be parallelized across sequence positions in many Transformer designs.",
      "Pretrained models can be adapted to many tasks.",
      "The architecture supports text, images, audio, and multimodal variants.",
    ],
    limitations: [
      "Training and inference can be compute- and memory-intensive.",
      "Long sequences can increase attention cost.",
      "Model outputs may be incorrect or biased.",
      "Attention maps do not automatically provide faithful explanations.",
    ],
    assumptions: [
      "The tokenization and pretraining objective suit the downstream task.",
      "The data and evaluation setup represent intended use.",
    ],
    dataRequirements: {
      input: "Tokenized text, image patches, or another modality-specific token sequence.",
      labels: "Depends on the task; pretrained models may need no new labels for basic prompting.",
      scale: "From pretrained inference to very large pretraining corpora.",
      preprocessing: ["Use the matching tokenizer or processor.", "Respect maximum sequence lengths.", "Avoid train/test contamination.", "Validate domain fit."],
    },
    compute: {
      training: "High to very high",
      inference: "Low to very high depending on size and sequence length",
      memory: "Medium to very high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "Small pretrained models may run on CPU; large-scale training and low-latency serving often require accelerators.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Internal representations are complex. Outputs can be examined with attribution, probing, and task-specific tests, none of which guarantees complete explanation.",
      tools: ["token-attribution", "attention-visualization", "benchmarking", "error-analysis"],
    },
    evaluation: {
      primary: ["task-specific-metrics"],
      additional: ["latency", "throughput", "robustness", "human-evaluation"],
      notes:
        "For generation, use task-specific and human evaluation; one generic metric rarely captures all quality dimensions.",
    },
    useCases: [
      "Machine translation.",
      "Text classification and summarization.",
      "Language generation.",
      "Image recognition using patch-based variants.",
      "Multimodal representation learning.",
    ],
    historicalExample: {
      title: "Attention Is All You Need introduced the Transformer",
      period: "2017",
      context:
        "The paper 'Attention Is All You Need' proposed an encoder-decoder architecture based solely on attention mechanisms and reported strong machine-translation results.",
      connection:
        "The architecture became a foundation for many subsequent language models and adaptations beyond text.",
      attribution: "Specific historical milestone: Vaswani and colleagues' 2017 paper.",
    },
    projectExample: null,
    prerequisites: [
      "Neural-network fundamentals.",
      "Tokenization and embeddings.",
      "Attention and sequence modelling.",
    ],
    relatedModels: ["bert", "llm", "sentence-embeddings", "vision-transformer"],
    illustration: "transformer",
    resources: [
      {
        label: "Attention Is All You Need",
        url: "https://arxiv.org/abs/1706.03762",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "text",
      library: "architecture concept",
      code: `Input tokens
  -> Token embeddings + positional information
  -> Transformer blocks
       -> Attention
       -> Feedforward network
  -> Task-specific output`,
      explanation:
        "This is a conceptual outline. Encoder-only, decoder-only, and encoder-decoder Transformers differ in their attention masks, objectives, and intended tasks.",
    },
  },

  {
    id: "bert",
    slug: "bert",
    name: "BERT",
    shortName: "BERT",
    type: "model-family",
    family: "nlp",
    categories: ["nlp", "deep-learning", "transformer"],
    problemTypes: ["text-classification", "question-answering", "entity-recognition"],
    learningParadigm: ["self-supervised", "transfer-learning"],
    tags: [
      "language-understanding",
      "encoder-only",
      "transformer",
      "contextual-embeddings",
      "fine-tuning",
    ],
    summary:
      "A bidirectional Transformer encoder pretrained to produce context-sensitive text representations.",
    description:
      "BERT learns contextual representations by processing token context in both directions within its encoder. It is commonly adapted for classification, entity recognition, and extractive question answering. It is not primarily an autoregressive text-generation model.",
    howItWorks: [
      "Tokenize text using the model's tokenizer.",
      "Pass tokens through a pretrained bidirectional Transformer encoder.",
      "Use contextual token representations or a pooled representation.",
      "Add or fine-tune a task-specific prediction head.",
    ],
    whenToUse: [
      "You need contextual text understanding.",
      "You have a classification or extraction task suited to encoder models.",
      "A pretrained checkpoint supports your language and domain.",
      "You can meet fine-tuning and inference requirements.",
    ],
    whenToAvoid: [
      "You primarily need long-form free-form text generation.",
      "You need a model trained for a language not adequately covered by the checkpoint.",
      "A lightweight TF-IDF baseline is sufficient.",
      "The model size and latency exceed your deployment budget.",
    ],
    strengths: [
      "Bidirectional contextual representations.",
      "Useful for text classification and token-level tasks.",
      "Pretraining enables adaptation with task-specific labels.",
    ],
    limitations: [
      "Fine-tuning still requires careful evaluation.",
      "Model size and latency can be higher than traditional baselines.",
      "A standard BERT checkpoint may not fit every language or domain.",
      "It is not a universal replacement for generative models.",
    ],
    assumptions: [
      "The pretrained vocabulary and language coverage suit the input.",
      "The downstream task matches the encoder's capabilities.",
    ],
    dataRequirements: {
      input: "Tokenized text using a compatible tokenizer.",
      labels: "Task labels for supervised fine-tuning; not always needed for inference.",
      scale: "Pretrained checkpoints support transfer learning with varying label requirements.",
      preprocessing: ["Use the checkpoint's tokenizer.", "Respect maximum sequence length.", "Split data before tuning.", "Inspect class balance."],
    },
    compute: {
      training: "Medium to high",
      inference: "Medium",
      memory: "Medium to high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Smaller variants may run on CPU; fine-tuning is generally faster with acceleration.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Contextual token outputs can be inspected, but internal attention patterns are not complete explanations.",
      tools: ["token-attribution", "confusion-matrix", "error-analysis"],
    },
    evaluation: {
      primary: ["f1-score", "precision", "recall"],
      additional: ["exact-match", "task-specific-benchmarks", "latency"],
      notes: "Use token-level or span-level metrics for extraction tasks when appropriate.",
    },
    useCases: [
      "Sentiment and intent classification.",
      "Named-entity recognition.",
      "Extractive question answering.",
      "Semantic representations as part of a broader NLP pipeline.",
    ],
    historicalExample: {
      title: "BERT advanced pretrained language understanding",
      period: "2018",
      context:
        "Google introduced BERT in 2018, demonstrating how bidirectional pretraining could improve results across a range of language-understanding benchmarks.",
      connection:
        "It helped popularize the practice of adapting a pretrained language encoder to downstream tasks.",
      attribution: "Specific historical milestone: the original BERT paper.",
    },
    projectExample: null,
    prerequisites: [
      "Transformers and tokenization.",
      "Transfer learning.",
      "Text-classification and extraction metrics.",
    ],
    relatedModels: ["transformer", "sentence-embeddings", "llm", "tf-idf"],
    illustration: "bert",
    resources: [
      {
        label: "Original BERT paper",
        url: "https://arxiv.org/abs/1810.04805",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "python",
      library: "Hugging Face Transformers",
      code: `from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="distilbert/distilbert-base-uncased-finetuned-sst-2-english",
)

result = classifier("The service was helpful and fast.")
print(result)`,
      explanation:
        "This uses a sentiment-analysis checkpoint from the DistilBERT family, not the original BERT checkpoint. Choose a model trained for your intended task and language.",
    },
  },

  {
    id: "sentence-embeddings",
    slug: "sentence-embeddings",
    name: "Sentence Embeddings",
    shortName: "Sentence Embeddings",
    type: "method",
    family: "nlp",
    categories: ["nlp", "deep-learning", "semantic-search", "information-retrieval"],
    problemTypes: ["semantic-search", "document-similarity", "clustering", "retrieval"],
    learningParadigm: ["representation-learning", "transfer-learning"],
    tags: [
      "embeddings",
      "semantic-search",
      "similarity",
      "retrieval",
      "vector-database",
    ],
    summary:
      "Maps a sentence or passage to a dense vector intended to capture useful semantic information.",
    description:
      "Sentence-embedding models encode text into vectors that can be compared with similarity measures. They power semantic search, duplicate detection, clustering, and retrieval systems, but quality depends on the model, domain, and task.",
    howItWorks: [
      "Tokenize the text.",
      "Encode it with a trained language model.",
      "Pool or project token representations into a sentence or passage vector.",
      "Compare vectors using a suitable similarity or distance measure.",
      "Optionally index vectors for fast retrieval.",
    ],
    whenToUse: [
      "Meaning matters more than exact keyword overlap.",
      "You need semantic search across documents.",
      "You want to cluster or deduplicate text by meaning.",
      "You need a retrieval component for a question-answering system.",
    ],
    whenToAvoid: [
      "Exact identifiers, legal citations, or rare strings must match precisely without lexical support.",
      "The embedding model poorly represents your language or domain.",
      "You need generation rather than retrieval or comparison.",
      "You assume similarity scores are calibrated probabilities of correctness.",
    ],
    strengths: [
      "Can match paraphrases and related concepts.",
      "Supports efficient vector-based retrieval.",
      "Can be reused for clustering and similarity tasks.",
      "Often practical without training a model from scratch.",
    ],
    limitations: [
      "Semantic similarity does not guarantee factual relevance.",
      "Domain-specific terms may be poorly represented.",
      "Long documents can lose detail when represented by one vector.",
      "Embedding indexes require storage, updates, and retrieval evaluation.",
    ],
    assumptions: [
      "The embedding model maps relevant passages close together.",
      "The similarity function aligns with the retrieval objective.",
    ],
    dataRequirements: {
      input: "Sentences, paragraphs, or document chunks.",
      labels: "Not required for using a pretrained model; relevance labels help evaluate or fine-tune it.",
      scale: "From small local indexes to large vector-search systems.",
      preprocessing: ["Choose chunk size.", "Use the correct embedding model.", "Keep metadata.", "Evaluate with relevant queries."],
    },
    compute: {
      training: "Low for pretrained inference; high for custom training",
      inference: "Low to medium depending on encoder",
      memory: "Medium to high for large vector indexes",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Batching and smaller embedding models can reduce serving costs.",
    },
    interpretability: {
      level: "low-medium",
      explanation:
        "Nearest passages can be inspected, but individual embedding dimensions are not usually human-interpretable.",
      tools: ["nearest-neighbour-review", "retrieval-precision-at-k", "embedding-visualization"],
    },
    evaluation: {
      primary: ["recall-at-k", "precision-at-k", "mrr", "ndcg"],
      additional: ["latency", "human-relevance-review"],
      notes:
        "Use representative search queries and relevance judgments. Similarity scores alone do not measure retrieval quality.",
    },
    useCases: [
      "Semantic search across a knowledge base.",
      "Finding similar support tickets.",
      "Grouping related documents.",
      "Retrieving context for a RAG application.",
    ],
    historicalExample: {
      title: "Dense retrieval expanded semantic search",
      period: "2010s onward",
      context:
        "Neural representation learning and sentence-embedding research enabled retrieval systems to compare dense semantic vectors in addition to exact lexical overlap.",
      connection:
        "Modern search systems often combine dense retrieval with lexical retrieval and reranking rather than relying on one method alone.",
      attribution:
        "General development of dense retrieval; no single product deployment is implied.",
    },
    projectExample: {
      title: "Semantic search for a BookStack knowledge base",
      context:
        "Encode knowledge-base passages into vectors and retrieve relevant chunks for a user query, optionally combining semantic and keyword search.",
      learningPoints: [
        "Chunking and metadata are part of retrieval quality.",
        "Evaluate with real queries, not just example similarities.",
        "Retrieved content must be checked for relevance before being passed to a language model.",
      ],
    },
    prerequisites: [
      "Tokenization and vector representations.",
      "Similarity metrics.",
      "Information retrieval and ranking.",
    ],
    relatedModels: ["tf-idf", "bert", "transformer", "rag"],
    illustration: "sentence-embeddings",
    resources: [
      {
        label: "Sentence Transformers documentation",
        url: "https://sbert.net/",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "Sentence Transformers",
      code: `from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

sentences = [
    "How do I reset my password?",
    "I cannot access my account.",
]

embeddings = model.encode(
    sentences,
    normalize_embeddings=True,
)

similarity = embeddings[0] @ embeddings[1]`,
      explanation:
        "This computes normalized sentence vectors and their dot-product similarity. A high score is a retrieval signal, not proof that two texts mean exactly the same thing.",
    },
  },

  {
    id: "llm",
    slug: "llm",
    name: "Large Language Model (LLM)",
    shortName: "LLM",
    type: "model-family",
    family: "nlp",
    categories: ["nlp", "deep-learning", "generative-ai", "transformer"],
    problemTypes: ["generation", "summarization", "question-answering", "coding-assistance"],
    learningParadigm: ["self-supervised", "generative"],
    tags: [
      "generative-ai",
      "language-model",
      "text-generation",
      "prompting",
      "fine-tuning",
    ],
    summary:
      "A large language model learns patterns in language data and generates or transforms text in response to input.",
    description:
      "Many modern LLMs use decoder-only Transformer architectures and next-token prediction, though the broader category includes varied architectures and training objectives. An LLM is a model family, not a guarantee of factual accuracy or reasoning reliability.",
    howItWorks: [
      "Convert the prompt into tokens.",
      "Process the context through the language model.",
      "Predict a distribution over possible next tokens.",
      "Select tokens using a decoding strategy.",
      "Continue until a stopping condition is reached.",
    ],
    whenToUse: [
      "You need flexible natural-language generation or transformation.",
      "You want to summarize, draft, classify, or extract information from text.",
      "You can evaluate output quality and control privacy, cost, and latency.",
      "You can constrain the task with structured outputs, retrieval, or tool use where appropriate.",
    ],
    whenToAvoid: [
      "A deterministic rule or small classifier is more reliable and cheaper.",
      "Every answer must be factually correct without human review or verification.",
      "You cannot safely send sensitive data to the selected service.",
      "The use case requires capabilities the selected model has not demonstrated.",
    ],
    strengths: [
      "Handles varied language tasks through prompting or adaptation.",
      "Can summarize, draft, transform, and explain text.",
      "Can use tools or retrieval when integrated into a larger system.",
      "Pretrained models can reduce the need to build a language model from scratch.",
    ],
    limitations: [
      "Can produce false, unsupported, or fabricated claims.",
      "May reflect bias in training data.",
      "Can be vulnerable to prompt injection and unsafe tool use.",
      "Costs and latency vary with model size, token count, and service.",
      "Evaluation is difficult when output quality is open-ended.",
    ],
    assumptions: [
      "The model is suitable for the language, domain, and task.",
      "Prompting and system controls are sufficient for the required behaviour, subject to evaluation.",
      "Outputs can be checked when the cost of error is significant.",
    ],
    dataRequirements: {
      input: "Tokenized prompts and conversational context.",
      labels: "No task-specific labels required for ordinary prompting; adaptation may require examples.",
      scale: "Pretrained inference can be accessible through an API or local model; training from scratch is expensive.",
      preprocessing: ["Remove unnecessary sensitive data.", "Manage context length.", "Define output schemas where useful.", "Test representative and adversarial prompts."],
    },
    compute: {
      training: "Very high for foundation-model training",
      inference: "Low to very high depending on model and hosting",
      memory: "Medium to very high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "API use can avoid local hardware requirements but introduces service cost, data-handling, and availability considerations.",
    },
    interpretability: {
      level: "low",
      explanation:
        "Generated text does not reveal a complete causal explanation of the model's internal computation.",
      tools: ["benchmark-suites", "human-review", "structured-output-validation", "red-team-tests"],
    },
    evaluation: {
      primary: ["task-specific-quality", "human-evaluation"],
      additional: ["factuality", "citation-accuracy", "latency", "cost-per-task", "safety"],
      notes:
        "Use a test set of realistic tasks and evaluate factuality, reliability, safety, and operational cost.",
    },
    useCases: [
      "Drafting and summarization.",
      "Conversational assistants.",
      "Code assistance.",
      "Structured extraction from documents.",
      "Question answering with retrieval and source checks.",
    ],
    historicalExample: {
      title: "Generative pretrained Transformers scaled language modelling",
      period: "2018 onward",
      context:
        "Research into generative pretrained Transformers helped establish large-scale next-token prediction and subsequent adaptation or prompting as a major approach to language tasks.",
      connection:
        "Modern LLM applications commonly combine a pretrained model with instructions, retrieval, tools, evaluation, and application-level safeguards.",
      attribution:
        "Broad history of the LLM family, not a claim that every LLM uses the same architecture or training recipe.",
    },
    projectExample: null,
    prerequisites: [
      "Tokenization and Transformer basics.",
      "Prompt design and structured outputs.",
      "Evaluation, privacy, and model-safety basics.",
    ],
    relatedModels: ["transformer", "bert", "sentence-embeddings", "rag"],
    illustration: "llm",
    resources: [
      {
        label: "Attention Is All You Need",
        url: "https://arxiv.org/abs/1706.03762",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "text",
      library: "provider-agnostic concept",
      code: `User request
  -> Input and context preparation
  -> Language model inference
  -> Output validation
  -> Optional retrieval or tool verification
  -> Response to user`,
      explanation:
        "This outlines a typical application flow rather than executable code. A production implementation needs error handling, privacy controls, evaluation, and safeguards.",
    },
  },

  {
    id: "rag",
    slug: "rag",
    name: "Retrieval-Augmented Generation (RAG)",
    shortName: "RAG",
    type: "system-pattern",
    family: "nlp",
    categories: ["nlp", "generative-ai", "information-retrieval", "system-design"],
    problemTypes: ["question-answering", "semantic-search", "knowledge-assistance"],
    learningParadigm: ["retrieval", "generative-ai"],
    tags: [
      "retrieval",
      "llm",
      "knowledge-base",
      "semantic-search",
      "grounding",
      "rag-pipeline",
    ],
    summary:
      "Combines information retrieval with a language model so responses can use relevant external documents as context.",
    description:
      "RAG is a system design pattern, not a single predictive model. A typical pipeline indexes documents, retrieves relevant passages for a query, and supplies them to a language model to generate a grounded response. Quality depends on retrieval, context construction, generation, and evaluation.",
    howItWorks: [
      "Collect and clean source documents.",
      "Split documents into retrievable chunks and preserve metadata.",
      "Create a lexical or vector index.",
      "Retrieve relevant passages for a user query.",
      "Optionally rerank and filter retrieved results.",
      "Provide the context to an LLM with instructions to answer from the sources.",
      "Evaluate retrieval relevance, answer correctness, and citation fidelity.",
    ],
    whenToUse: [
      "Answers should be grounded in a changing or private document collection.",
      "You need knowledge-base question answering or document assistance.",
      "The model's built-in knowledge is insufficient or needs traceable source context.",
      "You can measure retrieval quality and validate generated answers.",
    ],
    whenToAvoid: [
      "A simple keyword search or database query solves the problem better.",
      "The source documents are poor quality or out of date.",
      "The application needs exact database operations that should use structured queries.",
      "You expect retrieval alone to eliminate hallucinations.",
    ],
    strengths: [
      "Can connect language models to external or updated knowledge.",
      "Can return source references alongside responses.",
      "Can use private document collections without training a foundation model from scratch.",
      "Supports modular improvements to retrieval and generation.",
    ],
    limitations: [
      "Irrelevant retrieval can lead to irrelevant answers.",
      "Chunking and indexing decisions affect recall.",
      "Retrieved text may contain prompt injection or malicious instructions.",
      "Citations can be inaccurate unless verified.",
      "More components mean more latency, failure modes, and evaluation work.",
    ],
    assumptions: [
      "Relevant evidence exists in the indexed corpus.",
      "The retrieval pipeline can surface that evidence.",
      "The generation step can use the context reliably enough for the task.",
    ],
    dataRequirements: {
      input: "User queries and a document corpus.",
      labels: "Relevance judgments and trusted answers are valuable for evaluation.",
      scale: "From a small local knowledge base to a large indexed corpus.",
      preprocessing: ["Clean and chunk documents.", "Preserve source metadata.", "Choose embedding and lexical indexing strategies.", "Track document versions."],
    },
    compute: {
      training: "Low to medium for indexing; no foundation-model training required",
      inference: "Medium to high depending on retrieval, reranking, and LLM",
      memory: "Medium to high depending on index size",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes:
        "Retrieval can run on CPU; an external LLM API may shift generation compute outside the application.",
    },
    interpretability: {
      level: "medium",
      explanation:
        "Retrieved passages can make evidence inspectable, but citations must be checked and do not guarantee that the answer follows the source.",
      tools: ["retrieval-precision-at-k", "citation-validation", "answer-grounding-review"],
    },
    evaluation: {
      primary: ["retrieval-recall-at-k", "answer-correctness", "citation-fidelity"],
      additional: ["faithfulness", "latency", "cost-per-query", "human-review"],
      notes:
        "Evaluate retrieval and generation separately as well as end-to-end. A fluent answer is not necessarily a grounded answer.",
    },
    useCases: [
      "Internal knowledge-base assistants.",
      "Question answering over technical documentation.",
      "Policy and procedure search.",
      "Document-grounded support tools.",
    ],
    historicalExample: {
      title: "RAG formalized combining parametric and retrieved knowledge",
      period: "2020",
      context:
        "The 2020 Retrieval-Augmented Generation research introduced a framework combining a pretrained sequence-to-sequence generator with a dense vector index of external documents.",
      connection:
        "It established a widely influential pattern for connecting generation with retrieved knowledge, later adopted in many different application designs.",
      attribution: "Specific historical milestone: the original RAG research paper.",
    },
    projectExample: {
      title: "Semantic search for BookStack",
      context:
        "Index BookStack pages and retrieve relevant chunks for a query, then optionally use an LLM to summarize the retrieved evidence with source references.",
      learningPoints: [
        "Retrieval and generation should be evaluated separately.",
        "Source metadata is essential for useful citations.",
        "RAG does not guarantee correctness; the retrieved evidence and answer must be checked.",
      ],
    },
    prerequisites: [
      "Embeddings and information retrieval.",
      "LLM prompting and context windows.",
      "API design, data cleaning, and evaluation.",
    ],
    relatedModels: ["sentence-embeddings", "tf-idf", "llm", "bert"],
    illustration: "rag",
    resources: [
      {
        label: "Original RAG paper",
        url: "https://arxiv.org/abs/2005.11401",
        type: "research-paper",
      },
    ],
    codeExample: {
      language: "text",
      library: "architecture concept",
      code: `Documents
  -> Parse and chunk
  -> Index text and/or embeddings

User query
  -> Retrieve relevant chunks
  -> Optional reranking
  -> Build context with source metadata
  -> LLM generates a grounded response
  -> Validate answer and citations`,
      explanation:
        "This is a system blueprint, not a model implementation. The quality of each stage should be evaluated independently.",
    },
  },

  // ============================================================
  // 4. FORECASTING AND RECOMMENDATION
  // ============================================================

  {
    id: "arima",
    slug: "arima",
    name: "ARIMA",
    shortName: "ARIMA",
    type: "statistical-model",
    family: "traditional-ml",
    categories: ["traditional-ml", "forecasting", "time-series"],
    problemTypes: ["forecasting"],
    learningParadigm: ["statistical-learning"],
    tags: [
      "time-series",
      "forecasting",
      "autoregressive",
      "statistical-model",
      "interpretable",
    ],
    summary:
      "A statistical time-series model that combines autoregression, differencing, and moving-average terms.",
    description:
      "ARIMA models relationships between observations over time after differencing to address certain forms of non-stationarity. Seasonal ARIMA extends the framework with seasonal components.",
    howItWorks: [
      "Inspect the time series and its trend or seasonal behaviour.",
      "Apply differencing when needed.",
      "Select autoregressive and moving-average orders.",
      "Fit the model to historical observations.",
      "Forecast future values and evaluate using a time-respecting holdout.",
    ],
    whenToUse: [
      "You have ordered numerical observations over time.",
      "A statistical baseline is desirable.",
      "Autocorrelation and differenced stationarity provide a reasonable modelling framework.",
      "You need interpretable time-series diagnostics.",
    ],
    whenToAvoid: [
      "The series contains complex nonlinear dynamics that the model cannot capture.",
      "Strong external drivers are ignored.",
      "You evaluate using random splits that leak future information.",
      "The series has changing patterns that invalidate the fitted assumptions.",
    ],
    strengths: [
      "Established statistical forecasting approach.",
      "Useful for baselines and diagnostic analysis.",
      "Can model autocorrelation in time-series data.",
    ],
    limitations: [
      "Order selection requires care.",
      "Seasonality may require an extension.",
      "Structural breaks and changing patterns can degrade forecasts.",
      "Forecast uncertainty and residual behaviour must be inspected.",
    ],
    assumptions: [
      "The selected differencing and model structure provide an adequate representation of the series.",
      "Historical patterns remain informative over the forecast horizon.",
    ],
    dataRequirements: {
      input: "Ordered observations with timestamps or consistent time intervals.",
      labels: "Past observed values form the forecasting target.",
      scale: "Often suitable for univariate series of modest size.",
      preprocessing: ["Sort by time.", "Handle missing periods.", "Inspect trend and seasonality.", "Avoid future-data leakage."],
    },
    compute: {
      training: "Low to medium",
      inference: "Low",
      memory: "Low",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Often very suitable for CPU-based forecasting baselines.",
    },
    interpretability: {
      level: "medium-high",
      explanation:
        "The model structure and residual diagnostics are inspectable, though coefficient interpretation requires statistical care.",
      tools: ["residual-plots", "autocorrelation-plots", "forecast-intervals"],
    },
    evaluation: {
      primary: ["mae", "rmse", "mase"],
      additional: ["rolling-origin-validation", "prediction-interval-coverage"],
      notes:
        "Use chronological splits or rolling-origin evaluation. Compare with naive and seasonal-naive baselines.",
    },
    useCases: [
      "Short-term demand forecasting.",
      "Operational metrics forecasting.",
      "Sales and inventory baselines.",
      "Forecasting regular univariate time series.",
    ],
    historicalExample: {
      title: "ARIMA became a foundational statistical forecasting framework",
      period: "1970s onward",
      context:
        "Box and Jenkins helped establish a systematic approach to autoregressive integrated moving-average time-series modelling and diagnostics.",
      connection:
        "ARIMA remains a useful baseline even where modern machine-learning forecasting approaches are available.",
      attribution: "General historical context for the Box–Jenkins methodology.",
    },
    projectExample: null,
    prerequisites: [
      "Time-series data.",
      "Autocorrelation and differencing.",
      "Chronological validation and forecast metrics.",
    ],
    relatedModels: ["linear-regression", "gradient-boosting"],
    illustration: "arima",
    resources: [
      {
        label: "statsmodels ARIMA",
        url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html",
        type: "documentation",
      },
    ],
    codeExample: {
      language: "python",
      library: "statsmodels",
      code: `from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(
    train_series,
    order=(1, 1, 1),
)

fitted = model.fit()
forecast = fitted.forecast(steps=7)`,
      explanation:
        "The order values are illustrative, not universal. Choose them using diagnostics and validation; forecast only after fitting on historical training data.",
    },
  },

  {
    id: "recommender-systems",
    slug: "recommender-systems",
    name: "Recommendation Systems",
    shortName: "Recommenders",
    type: "system-family",
    family: "traditional-ml",
    categories: ["traditional-ml", "recommendation", "information-retrieval"],
    problemTypes: ["recommendation", "ranking", "personalization"],
    learningParadigm: ["collaborative-filtering", "content-based", "hybrid"],
    tags: [
      "recommendation",
      "ranking",
      "personalization",
      "matrix-factorization",
      "retrieval",
    ],
    summary:
      "A family of methods that ranks or suggests items based on user preferences, item properties, and interaction data.",
    description:
      "Recommendation systems may use collaborative filtering, content-based methods, matrix factorization, ranking models, or hybrid pipelines. A production recommender is often a multi-stage system that retrieves candidates and ranks them.",
    howItWorks: [
      "Collect user-item interactions and item metadata.",
      "Generate candidate items using one or more retrieval methods.",
      "Rank candidates using relevance and business constraints.",
      "Apply eligibility, diversity, freshness, and safety rules.",
      "Evaluate offline and monitor online outcomes.",
    ],
    whenToUse: [
      "Users need personalized item suggestions.",
      "You have interaction data or meaningful item metadata.",
      "Ranking is more useful than predicting a single class.",
      "You can evaluate relevance and long-term user outcomes responsibly.",
    ],
    whenToAvoid: [
      "You lack enough interaction data and have no useful content features.",
      "A simple search or filter is sufficient.",
      "You ignore cold-start users or new items.",
      "You evaluate only clicks while overlooking quality, diversity, or user harm.",
    ],
    strengths: [
      "Can personalize large item catalogues.",
      "Supports collaborative and content-based signals.",
      "Can improve discovery and reduce manual browsing.",
      "Hybrid approaches can address weaknesses of individual methods.",
    ],
    limitations: [
      "Cold-start problems for new users and items.",
      "Popularity bias and feedback loops.",
      "Implicit clicks do not necessarily mean genuine preference.",
      "Offline metrics may not predict real-world impact.",
      "Requires careful privacy and experimentation practices.",
    ],
    assumptions: [
      "Historical interactions contain useful preference signals.",
      "Observed behaviour is an imperfect proxy for preference.",
      "Evaluation reflects the intended user experience.",
    ],
    dataRequirements: {
      input: "User-item interactions, item metadata, and optionally contextual features.",
      labels: "Clicks, ratings, purchases, or other interaction signals, depending on the method.",
      scale: "From small rating matrices to very large catalogues and interaction logs.",
      preprocessing: ["Remove invalid events.", "Handle duplicate interactions.", "Define time-aware splits.", "Account for cold-start users and items."],
    },
    compute: {
      training: "Low to very high depending on model and catalogue size",
      inference: "Low to high depending on candidate generation and ranking",
      memory: "Medium to very high",
      cpuFriendly: true,
      gpuUsuallyNeeded: false,
      notes: "Simple matrix factorization can run on CPU; large neural recommenders may need acceleration.",
    },
    interpretability: {
      level: "low-medium",
      explanation:
        "Content features and explicit rules can be explained more readily than latent factors or complex ranking models.",
      tools: ["ranking-metrics", "recommendation-explanations", "offline-evaluation", "online-experiments"],
    },
    evaluation: {
      primary: ["precision-at-k", "recall-at-k", "ndcg", "map"],
      additional: ["coverage", "diversity", "novelty", "online-experiment"],
      notes:
        "Use time-aware evaluation and measure more than clicks; relevance, coverage, and diversity may also matter.",
    },
    useCases: [
      "Movie and music recommendations.",
      "Product recommendations in online retail.",
      "News and content feeds.",
      "Related-document suggestions.",
    ],
    historicalExample: {
      title: "The Netflix Prize highlighted collaborative filtering",
      period: "2006–2009",
      context:
        "Netflix launched the Netflix Prize competition to improve movie-rating prediction. The competition helped focus research and public attention on collaborative filtering and recommendation ensembles.",
      connection:
        "It is a prominent example of how user-item interaction data can support recommendation, while also illustrating that benchmark improvements do not capture every production concern.",
      attribution:
        "The competition used many methods and ensembles; it should not be attributed to one recommendation algorithm.",
    },
    projectExample: null,
    prerequisites: [
      "Ranking and relevance.",
      "User-item interaction matrices.",
      "Offline evaluation and data leakage.",
    ],
    relatedModels: ["sentence-embeddings", "gradient-boosting", "k-means"],
    illustration: "recommender-systems",
    resources: [
      {
        label: "Google recommendation systems overview",
        url: "https://developers.google.com/machine-learning/recommendation",
        type: "learning-guide",
      },
    ],
    codeExample: {
      language: "text",
      library: "system concept",
      code: `User and context
  -> Candidate retrieval
  -> Ranking model
  -> Filtering and business rules
  -> Ordered recommendations
  -> Feedback and evaluation`,
      explanation:
        "This is a common production architecture pattern. A real system may use collaborative filtering, embeddings, ranking models, and business rules together.",
    },
  },
];

// ============================================================
// CATALOGUE HELPERS
// ============================================================

/*
 * Return all models.
 * The array is the source of truth for the model catalogue.
 */
export function getAllModels() {
  return models;
}

/*
 * Find a single model by its stable URL slug.
 */
export function getModelBySlug(slug) {
  return models.find((model) => model.slug === slug) ?? null;
}

/*
 * Filter models by any category.
 * A model may belong to several categories, so matching is inclusive.
 */
export function getModelsByCategory(category) {
  return models.filter((model) => model.categories.includes(category));
}

/*
 * Filter models by their main family.
 */
export function getModelsByFamily(family) {
  return models.filter((model) => model.family === family);
}

/*
 * Filter models by task/problem type.
 */
export function getModelsByProblemType(problemType) {
  return models.filter((model) => model.problemTypes.includes(problemType));
}

/*
 * Search names, summaries, descriptions, tags, categories, and use cases.
 * A simple case-insensitive search is sufficient for the initial library.
 * A larger catalogue can later use a dedicated search index.
 */
export function searchModels(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return models;
  }

  return models.filter((model) => {
    
    const searchableText = [
    model.name,
    model.shortName,
    model.summary,
    model.description,
    model.family,
    ...model.categories,
    ...model.problemTypes,
    ...model.tags,
    ...model.useCases,
    ...(model.projectExample
        ? [
            model.projectExample.title,
            model.projectExample.context,
        ]
        : []),
    ]
    .join(" ")
    .toLowerCase();


    return searchableText.includes(normalizedQuery);
  });
}

/*
 * Return a small list of related model records.
 * Missing related slugs are ignored to keep the UI resilient.
 */
export function getRelatedModels(slugs = []) {
  return slugs
    .map((slug) => getModelBySlug(slug))
    .filter(Boolean);
}

/*
 * Search using multiple optional filters.
 * This helper will be useful for the model library page.
 *
 * Example:
 * getFilteredModels({
 *   query: "text",
 *   family: "nlp",
 *   problemType: "classification",
 * });
 */
export function getFilteredModels({
  query = "",
  family = "",
  category = "",
  problemType = "",
} = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return models.filter((model) => {
    const matchesFamily = !family || model.family === family;
    const matchesCategory =
      !category || model.categories.includes(category);
    const matchesProblemType =
      !problemType || model.problemTypes.includes(problemType);

    const searchableText = [
      model.name,
      model.shortName,
      model.summary,
      model.description,
      ...model.categories,
      ...model.tags,
      ...model.useCases,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      !normalizedQuery || searchableText.includes(normalizedQuery);

    return (
      matchesFamily &&
      matchesCategory &&
      matchesProblemType &&
      matchesQuery
    );
  });
}

/*
 * Return a compact list of unique catalogue values for filter controls.
 */
export function getModelFilterOptions() {
  const uniqueSorted = (values) =>
    [...new Set(values)].sort((a, b) => a.localeCompare(b));

  return {
    families: uniqueSorted(models.map((model) => model.family)),
    categories: uniqueSorted(models.flatMap((model) => model.categories)),
    problemTypes: uniqueSorted(models.flatMap((model) => model.problemTypes)),
    tags: uniqueSorted(models.flatMap((model) => model.tags)),
  };
}

/*
 * Useful for a catalogue overview or a development-time sanity check.
 */
export function getModelCatalogueStats() {
  return {
    totalModels: models.length,
    families: getModelFilterOptions().families,
    categories: getModelFilterOptions().categories,
    problemTypes: getModelFilterOptions().problemTypes,
  };
}

export default models;
