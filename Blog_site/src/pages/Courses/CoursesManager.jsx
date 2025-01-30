import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");

  // Fetch courses
  useEffect(() => {
    axios.get("/api/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  // Add a course
  const addCourse = () => {
    axios.post("/api/courses", { name: newCourse }).then((response) => {
      setCourses([...courses, response.data]);
      setNewCourse("");
    });
  };

  // Delete a course
  const deleteCourse = (id) => {
    axios.delete(`/api/courses/${id}`).then(() => {
      setCourses(courses.filter((course) => course.id !== id));
    });
  };

  return (
    <div>
      <h1>Courses</h1>
      <input
        type="text"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="New Course"
      />
      <button onClick={addCourse}>Add Course</button>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;
