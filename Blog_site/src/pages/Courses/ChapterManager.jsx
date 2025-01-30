import React, { useState, useEffect } from "react";
import axios from "axios";

const ChapterManager = ({ courseId }) => {
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState("");

  useEffect(() => {
    axios.get(`/api/courses/${courseId}/chapters`).then((response) => {
      setChapters(response.data);
    });
  }, [courseId]);

  const addChapter = () => {
    axios
      .post(`/api/courses/${courseId}/chapters`, { name: newChapter })
      .then((response) => {
        setChapters([...chapters, response.data]);
        setNewChapter("");
      });
  };

  const deleteChapter = (id) => {
    axios.delete(`/api/chapters/${id}`).then(() => {
      setChapters(chapters.filter((chapter) => chapter.id !== id));
    });
  };

  return (
    <div>
      <h2>Chapters</h2>
      <input
        type="text"
        value={newChapter}
        onChange={(e) => setNewChapter(e.target.value)}
        placeholder="New Chapter"
      />
      <button onClick={addChapter}>Add Chapter</button>

      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            {chapter.name}
            <button onClick={() => deleteChapter(chapter.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterManager;
