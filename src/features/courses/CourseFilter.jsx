import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, setSelectedCourseId } from "./coursesSlice";

const CourseFilter = () => {
  const dispatch = useDispatch();
  const {
    list: courses, // take state.courses.list and call it courses
    selectedCourseId, // keep the name selectedCourse
    status: courseStatus, // take state.courses.status and rename to courseStatus
    error: courseError, // rename status.courses.error to courseError
  } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [courseStatus, dispatch]);

  const handleCourseChange = (e) => {
    const newCourseId = e.target.value || null;
    // console.log(
    //   "CourseFilter - handleCourseChange - New Course ID selected:",
    //   newCourseId
    // ); // DEBUG
    dispatch(setSelectedCourseId(newCourseId));
    // console.log(
    //   "CourseFilter - handleCourseChange - setSelectedCourseId action dispatched with:",
    //   newCourseId
    // ); // DEBUG
  };

  if (courseStatus === "loading") {
    return <p className="text-gray-600">Loading courses...</p>;
  }
  if (courseError) {
    return (
      <p className="text-red-600">
        Error loading courses:{" "}
        {typeof courseError === "string" ? courseError : courseError.message}
      </p>
    );
  }

  return (
    <div className="mb-6 md:mb-8">
      {" "}
      {/* More margin-bottom */}
      <label
        htmlFor="course-select"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select a Course:
      </label>
      <select
        id="course-select"
        value={selectedCourseId || ""}
        onChange={handleCourseChange}
        className="block w-full md:w-1/2 lg:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
      >
        <option value="" disabled>
          -- Please choose a course --
        </option>
        {courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.name} ({course.course_id})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseFilter;
