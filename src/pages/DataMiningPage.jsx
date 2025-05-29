// src/pages/DataMiningPage.jsx
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"; // For accordion toggle icons
// You might want specific icons for each section header as well
// import { DocumentTextIcon, TableCellsIcon, PuzzlePieceIcon, LightBulbIcon, CodeBracketIcon, ExclamationTriangleIcon, FolderOpenIcon, MagnifyingGlassIcon, CogIcon } from '@heroicons/react/24/outline';

// Reusable Accordion Item Component
const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  icon: IconComponent,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-3 overflow-hidden">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full px-5 py-4 font-medium text-left text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-150"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="flex items-center">
            {IconComponent && (
              <IconComponent className="h-6 w-6 mr-3 text-indigo-600" />
            )}
            <span className="text-lg">{title}</span>
          </span>
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500 transform" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </h2>
      {isOpen && (
        <div className="px-5 py-4 border-t border-gray-200 bg-white">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DataMiningPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null); // ID of the currently open accordion item, or null

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id); // Allow only one to be open
  };

  const accordionSections = [
    {
      id: "intro",
      title: "1. Introduction & Overall Goal",
      // icon: LightBulbIcon,
      content: (
        <>
          <p>
            The foundation of our BI tool and predictive models is meticulously
            prepared data. This page outlines the comprehensive data mining
            process undertaken to transform various raw data sources into the
            unified <code>student_data</code> table that powers our analytics
            and predictions.
          </p>
          <p>
            Our primary goal was to create a clean, reliable, and feature-rich
            dataset suitable for predicting student course outcomes (pass/fail)
            and for providing insightful visualizations on the dashboard.
          </p>
        </>
      ),
    },
    {
      id: "sources",
      title: "2. Raw Data Sources",
      // icon: FolderOpenIcon,
      content: (
        <>
          <p>
            Our initial data consisted of multiple large JSON files (often in
            MBs/GBs), including:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Course.json:</strong> Contained metadata about courses
              (e.g., course structure, number of videos/exercises - if this is
              what it had).
            </li>
            <li>
              <strong>User-video.json:</strong> Detailed student interactions
              with video content.
            </li>
            <li>
              <strong>User-problem.json:</strong> Logged student attempts and
              performance on problems/questions.
            </li>
            <li>
              <strong>Problem.json:</strong> Metadata about the problems
              themselves (e.g., problem ID, type).
            </li>
            <li>
              <strong>Exercise-problem.txt:</strong> Mapped problems to specific
              exercises or modules within courses.
            </li>
          </ul>
          <p>
            These files were sourced from [mention general source, e.g., LMS
            exports, educational platform APIs].
          </p>
        </>
      ),
    },
    {
      id: "eda",
      title: "3. Exploratory Data Analysis (EDA) Highlights",
      // icon: MagnifyingGlassIcon,
      content: (
        <>
          <p>
            Before major transformations, extensive EDA was performed using
            Python libraries like <strong>Pandas</strong> and{" "}
            <strong>Matplotlib</strong>. While a full EDA report is extensive,
            key activities and insights included:
          </p>
          <ul className="list-disc list-inside">
            <li>Identifying the scale and structure of each dataset.</li>
            <li>
              Initial assessment of data quality, missing value patterns, and
              outlier detection.
            </li>
            <li>
              Understanding distributions of key engagement metrics (e.g., video
              watch times, problem attempt frequencies).
            </li>
            <li>
              <strong className="font-semibold">Noteworthy Finding:</strong>{" "}
              [e.g., "Observed a bi-modal distribution in total course
              engagement time, suggesting distinct groups of highly-engaged and
              less-engaged students." - Be specific if possible, otherwise keep
              it general].
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "cleaning",
      title: "4. Data Cleaning & Preprocessing",
      // icon: CogIcon,
      content: (
        <>
          <p>
            This phase focused on refining the raw data for accuracy and
            consistency, primarily using <strong>Polars</strong> and{" "}
            <strong>Pandas</strong> for their efficiency with large datasets.
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Filtering:</strong> Users who had studied more than 50
              courses were considered outliers or potentially non-student
              accounts and were filtered out to focus the analysis. Other
              specific filters applied included [mention any other key filter,
              e.g., "removing test user accounts"].
            </li>
            <li>
              General cleaning involved standardizing date formats, correcting
              data type inconsistencies, and handling obviously erroneous
              entries.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "integration",
      title: "5. Data Integration & Merging",
      // icon: PuzzlePieceIcon,
      content: (
        <>
          <p>
            Combining the various cleaned datasets into a unified view was a
            complex but critical step. This involved multiple join operations
            based on shared identifiers like <code>user_id</code>,{" "}
            <code>course_id</code>, and <code>problem_id</code>.
          </p>
          <p>
            The logic for these merges, including handling different
            granularities and ensuring data integrity across joins, is
            intricate.
          </p>
          <p className="mt-4">
            <a
              href="[LINK_TO_YOUR_MERGING_DOCUMENTATION]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Read our detailed Data Merging Strategy →
            </a>
          </p>
        </>
      ),
    },
    {
      id: "aggregation",
      title: "6. Feature Engineering & Aggregation",
      // icon: TableCellsIcon,
      content: (
        <>
          <p>
            To prepare data for modeling and dashboarding, many features in the
            final <code>student_data</code> table were engineered through
            aggregation. This primarily involved:
          </p>
          <ul className="list-disc list-inside">
            <li>
              Calculating weekly summaries for each student in each course:{" "}
              <code>questions_done_weekN</code>,{" "}
              <code>attempts_count_weekN</code>,{" "}
              <code>correct_answer_weekN</code>, <code>total_score_weekN</code>,{" "}
              <code>user_watching_time_weekN</code>.
            </li>
            <li>
              Computing overall course-level engagement metrics per student:{" "}
              <code>total_watch_time_minutes_per_course</code>,{" "}
              <code>average_watch_time_per_video_per_course</code>,{" "}
              <code>average_speed</code>.
            </li>
          </ul>
          <p>
            These aggregated features provide a time-series and summary view of
            student engagement.
          </p>
        </>
      ),
    },
    {
      id: "outcomes",
      title: "7. Defining Outcomes (Pass/Fail)",
      // icon: DocumentTextIcon,
      content: (
        <>
          <p>
            Determining the <code>classification</code> (Pass/Fail) for each
            student-course record involved a defined methodology based on
            available outcome indicators in the source data (e.g., final scores,
            completion certificates, specific performance thresholds).
          </p>
          <p className="mt-4">
            <a
              href="[LINK_TO_YOUR_PASS_FAIL_DEFINITION_DOC]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Learn more about our Outcome Classification Method →
            </a>
          </p>
        </>
      ),
    },
    {
      id: "challenges",
      title: "8. Handling Data Challenges",
      // icon: ExclamationTriangleIcon,
      content: (
        <>
          <p>
            Several challenges were encountered and addressed during this
            process:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Large Data Volumes:</strong> The initial JSON files were
              substantial. Utilizing <strong>Polars</strong>, known for its
              performance on larger-than-memory datasets, along with efficient
              Pandas operations, was key to managing this.
            </li>
            <li>
              <strong>Massive Missing Values:</strong> Certain features had a
              high percentage of missing data. Our strategy involved a
              combination of techniques.
            </li>
          </ul>
          <p className="mt-4">
            <a
              href="[LINK_TO_YOUR_MISSING_VALUE_STRATEGY_DOC]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Details on our Missing Value Handling Strategy →
            </a>
          </p>
        </>
      ),
    },
    {
      id: "finalDataset",
      title: "9. Final Dataset: student_data",
      // icon: CircleStackIcon,
      content: (
        <>
          <p>
            The culmination of these efforts is the <code>student_data</code>{" "}
            table, which serves as the primary input for our predictive models
            and the visualizations presented on the dashboard. It contains
            [briefly list 3-4 key types of columns, e.g., "student identifiers,
            course context, weekly engagement metrics, and final outcome
            classification"].
          </p>
        </>
      ),
    },
    {
      id: "tools",
      title: "10. Tools & Technologies Used",
      // icon: CodeBracketIcon,
      content: (
        <>
          <p>
            This project heavily relied on the Python data science ecosystem:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Python:</strong> Core programming language.
            </li>
            <li>
              <strong>Pandas:</strong> For versatile data manipulation and
              analysis.
            </li>
            <li>
              <strong>Polars:</strong> For high-performance processing of large
              DataFrames.
            </li>
            <li>
              <strong>Matplotlib (pyplot):</strong> For creating static,
              animated, and interactive visualizations during EDA.
            </li>
            <li>
              <strong>NumPy:</strong> For numerical operations.
            </li>
            <li>
              <strong>SQL (PostgreSQL):</strong> For database storage and
              querying.
            </li>
            {/* Add any other key libraries or tools */}
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Constrained width for readability */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          The Journey of Our Data
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          How raw information is transformed into predictive insights.
        </p>
      </header>
      <div className="space-y-1">
        {" "}
        {/* Minimal space between accordion items themselves */}
        {accordionSections.map((section) => (
          <AccordionItem
            key={section.id}
            title={section.title}
            isOpen={openAccordion === section.id}
            onToggle={() => toggleAccordion(section.id)}
            // icon={section.icon} // Uncomment if you add icons to the array
          >
            {section.content}
          </AccordionItem>
        ))}
      </div>
      <footer className="text-center text-gray-500 text-sm mt-16">
        <p>
          This meticulous data process enables the insights you see on our
          dashboard.
        </p>
      </footer>
    </div>
  );
};

export default DataMiningPage;
