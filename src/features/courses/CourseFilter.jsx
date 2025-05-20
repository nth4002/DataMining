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
    return <p> Loading courses ...</p>;
  }
  if (courseError) return <p>Error loading courses: {courseError}</p>;

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
      <select value={selectedCourseId || ""} onChange={handleCourseChange}>
        <option value=""> Select a course</option>
        {courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_name || course.course_id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseFilter;
