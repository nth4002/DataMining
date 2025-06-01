// src/pages/ModelPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // If you need internal links
// You might want icons for different sections
// import { ChartBarIcon, TableCellsIcon, CogIcon, BeakerIcon } from '@heroicons/react/24/outline';

// Placeholder for your results data - In a real app, you might fetch this or import it
// For now, create a file like `src/data/model_results.json` and import it
import modelResultsData from "../data/model_results.json";

// Component to display a confusion matrix nicely
const ConfusionMatrixDisplay = ({ cm }) => {
  if (!cm) return <p className="text-sm text-gray-500">Not available.</p>;
  // Assuming cm = { tn, fp, fn, tp } and class 0 is Fail, class 1 is Pass
  return (
    <div className="mt-2">
      <table className="min-w-[250px] border-collapse border border-gray-400 dark:border-gray-600 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800"></th>
            <th
              colSpan="2"
              className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-center"
            >
              Predicted
            </th>
          </tr>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800">
              Actual
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800">
              Fail (0)
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800">
              Pass (1)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-medium bg-gray-50 dark:bg-gray-700">
              Fail (0)
            </td>
            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center bg-red-100 dark:bg-red-900/50">
              {cm.tn}
            </td>
            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">
              {cm.fp}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 font-medium bg-gray-50 dark:bg-gray-700">
              Pass (1)
            </td>
            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">
              {cm.fn}
            </td>
            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center bg-green-100 dark:bg-green-900/50">
              {cm.tp}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        TN: {cm.tn} (Predicted Fail, Actual Fail), FP: {cm.fp} (Predicted Pass,
        Actual Fail) <br />
        FN: {cm.fn} (Predicted Fail, Actual Pass), TP: {cm.tp} (Predicted Pass,
        Actual Pass)
      </p>
    </div>
  );
};

const ModelPage = () => {
  const [selectedWeek, setSelectedWeek] = useState(1); // Default to showing Week 1 model results
  const [activeTab, setActiveTab] = useState("performance"); // 'performance', 'predict', 'simulate'

  const selectedModelData = modelResultsData.find(
    (m) => m.week === selectedWeek
  );

  const handleWeekChange = (event) => {
    setSelectedWeek(Number(event.target.value));
  };

  // Placeholder for interactive prediction
  const [inputFeatures, setInputFeatures] = useState({
    /* initial feature values */
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleFeatureChange = (e) => {
    setInputFeatures({
      ...inputFeatures,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    setPredictionResult(null);
    // This is where you'd call your backend API
    // For now, simulate a delay and a result
    try {
      // const response = await apiClient.post(`/predict/week${selectedWeek}`, inputFeatures);
      // setPredictionResult(response.data);

      // Simulated
      setTimeout(() => {
        const mockPrediction =
          Math.random() > 0.4
            ? { prediction: "Pass", confidence: Math.random() * 0.4 + 0.6 }
            : { prediction: "Fail", confidence: Math.random() * 0.4 + 0.6 };
        setPredictionResult(mockPrediction);
        setIsPredicting(false);
      }, 1500);
    } catch (error) {
      setPredictionResult({ error: "Prediction failed. " + error.message });
      setIsPredicting(false);
    }
  };

  const renderPerformanceTab = () =>
    !selectedModelData ? (
      <p>Select a week to view model performance.</p>
    ) : (
      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
            Model: {selectedModelData.model_type}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {selectedModelData.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                Final Test Set Results
              </h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <strong>Accuracy:</strong>{" "}
                  {selectedModelData.final_test_results.accuracy.toFixed(4)}
                </li>
                <li>
                  <strong>F1 Score (Weighted):</strong>{" "}
                  {selectedModelData.final_test_results.f1_score_weighted.toFixed(
                    4
                  )}
                </li>
                {/* Add Precision, Recall, F1 for "Fail" class if you calculated them */}
                {selectedModelData.final_test_results.precision_fail !==
                  null && (
                  <li>
                    <strong>Precision (Fail):</strong>{" "}
                    {selectedModelData.final_test_results.precision_fail.toFixed(
                      4
                    )}
                  </li>
                )}
                {selectedModelData.final_test_results.recall_fail !== null && (
                  <li>
                    <strong>Recall (Fail):</strong>{" "}
                    {selectedModelData.final_test_results.recall_fail.toFixed(
                      4
                    )}
                  </li>
                )}
                {selectedModelData.final_test_results.f1_score_fail !==
                  null && (
                  <li>
                    <strong>F1 Score (Fail):</strong>{" "}
                    {selectedModelData.final_test_results.f1_score_fail.toFixed(
                      4
                    )}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                Confusion Matrix (Test Set)
              </h4>
              <ConfusionMatrixDisplay
                cm={selectedModelData.final_test_results.confusion_matrix}
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
            Best Hyperparameters (from RandomizedSearchCV)
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(selectedModelData.best_params).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="px-3 py-1.5 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {key.replace("xgb__", "")}
                      </td>
                      <td className="px-3 py-1.5 text-gray-700 dark:text-gray-300">
                        {value.toString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
        {console.log(selectedModelData.week)}
        {selectedModelData.week !== 5 && selectedModelData.cv_results && (
          <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              5-Fold Cross-Validation Averages
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong>Mean Accuracy:</strong>{" "}
                {selectedModelData.cv_results.mean_accuracy.toFixed(4)}
              </li>
              <li>
                <strong>Mean F1 Score (Weighted):</strong>{" "}
                {selectedModelData.cv_results.mean_f1_score_weighted.toFixed(4)}
              </li>
            </ul>
            {/* Optionally display fold details if needed */}
          </section>
        )}

        {selectedModelData.feature_importances &&
          selectedModelData.feature_importances.length > 0 && (
            <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                Top Feature Importances
              </h4>
              {/* Here you would render a bar chart, or a list for simplicity */}
              <ul className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400">
                {selectedModelData.feature_importances
                  .slice(0, 10)
                  .map((feat) => (
                    <li key={feat.feature}>
                      {feat.feature}: {feat.importance.toFixed(3)}
                    </li>
                  ))}
              </ul>
            </section>
          )}
      </div>
    );

  const renderPredictTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Try a Prediction
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Input hypothetical student data for the end of{" "}
        <strong>Week {selectedWeek}</strong> to get a pass/fail prediction.
        Ensure inputs match the features used by the model for this week.
      </p>
      <div>
        <label
          htmlFor="feature1"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Feature 1 (e.g., questions_done_week1)
        </label>
        <input
          type="number"
          name="feature1"
          id="feature1"
          onChange={handleFeatureChange}
          className="mt-1 p-2 block w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {/* Add more input fields for all features your model expects for the selected week */}
      {/* Example:
            <div>
                <label htmlFor="user_watching_time_week1">Watching Time Week 1 (min)</label>
                <input type="number" name="user_watching_time_week1" id="user_watching_time_week1" onChange={handleFeatureChange} ... />
            </div>
            */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Note: This is a simplified input. In a real scenario, ensure all{" "}
        {Object.keys(
          modelResultsData.find((m) => m.week === 1)?.best_params || {}
        ).length > 0
          ? `relevant features for the Week ${selectedWeek} model are provided.`
          : "features are provided."}
      </p>

      <button
        onClick={handlePredict}
        disabled={isPredicting}
        className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50"
      >
        {isPredicting ? "Predicting..." : "Get Prediction"}
      </button>

      {predictionResult && (
        <div
          className={`mt-4 p-4 rounded-md ${
            predictionResult.error
              ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200"
              : predictionResult.prediction === "Pass"
              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200"
              : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-200"
          }`}
        >
          <h4 className="font-semibold">Prediction Result:</h4>
          {predictionResult.error ? (
            <p>{predictionResult.error}</p>
          ) : (
            <>
              <p>
                Outcome:{" "}
                <span className="font-bold">{predictionResult.prediction}</span>
              </p>
              <p>
                Confidence (simulated):{" "}
                {(predictionResult.confidence * 100).toFixed(1)}%
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );

  const renderSimulateTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Live Simulation (Future Feature)
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        This section will allow simulating real-time student data accumulation
        and testing the model's prediction at different stages. Stay tuned for
        updates!
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Model Insights & Experiments
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Understanding our predictive models for student success.
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav
          className="-mb-px flex space-x-4 sm:space-x-8 justify-center"
          aria-label="Tabs"
        >
          {[
            { id: "performance", label: "Performance Overview" },
            { id: "predict", label: "Try Prediction" },
            { id: "simulate", label: "Live Simulation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm sm:text-base focus:outline-none transition-colors duration-150
                            ${
                              activeTab === tab.id
                                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Week Selector for Performance Tab */}
      {activeTab === "performance" && (
        <div className="mb-6">
          <label
            htmlFor="week-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Select Prediction Point:
          </label>
          <select
            id="week-select"
            value={selectedWeek}
            onChange={handleWeekChange}
            className="block w-full md:w-1/2 lg:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {modelResultsData.map((modelData) => (
              <option key={modelData.week} value={modelData.week}>
                {modelData.week_label || `Week ${modelData.week} Model`}{" "}
                {/* THIS LINE HANDLES IT */}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Tab Content */}
      {activeTab === "performance" && renderPerformanceTab()}
      {activeTab === "predict" && renderPredictTab()}
      {activeTab === "simulate" && renderSimulateTab()}
    </div>
  );
};

export default ModelPage;
