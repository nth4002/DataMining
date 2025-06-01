// src/pages/eda/EdaCoursePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const EdaUserProblemPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="mb-4">
        <Link
          to="/data-mining-process" // Link back to the main Data Mining Process page
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
          Back to Data Mining Process
        </Link>
      </div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          EDA: Course.json Insights
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Detailed Exploratory Data Analysis for the Course metadata.
        </p>
      </header>

      <section className="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-6 md:p-8">
        {/* You will fill this section with specific EDA content later */}
        <p>
          Details about the EDA for Course.json will go here. This might
          include:
        </p>
        <ul className="list-disc list-inside">
          <li>Key columns and their descriptions.</li>
          <li>Data types and distributions.</li>
          <li>Missing value analysis for this specific file.</li>
          <li>Any interesting patterns or outliers found.</li>
          <li>
            Visualizations (you can embed static images of charts you generated
            with Matplotlib).
          </li>
        </ul>
        <p className="mt-4 p-3 bg-sky-50 rounded-md text-sm text-sky-700">
          This page focuses solely on the insights derived from the{" "}
          <code>Course.json</code> file before any major merging or cleaning
          that involved other datasets.
        </p>
      </section>
    </div>
  );
};

export default EdaUserProblemPage;
