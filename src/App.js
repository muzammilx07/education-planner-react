import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {
  const [subjects, setSubjects] = useState(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
    return storedSubjects || [];
  });
  const [newSubject, setNewSubject] = useState({ name: '', hours: 0 });

  useEffect(() => {
    const fetchSavedSubjects = () => {
      const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
      setSubjects(storedSubjects || []);
    };
    fetchSavedSubjects();
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prevSubject) => ({ ...prevSubject, [name]: value }));
  };

  const addSubject = () => {
    if (newSubject.name && newSubject.hours >= 0) {
      setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
      setNewSubject({ name: '', hours: 0 });
    }
  };

  const updateHours = (index, amount) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      const currentHours = Number(updatedSubjects[index].hours);
  
      // Ensure the updated value is not less than 0
      const newHours = Math.max(0, currentHours + Number(amount));
  
      updatedSubjects[index] = {
        ...updatedSubjects[index],
        hours: newHours,
      };
  
      return updatedSubjects;
    });
  };
  
  
  

  const removeSubject = (index) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects.splice(index, 1);
      return updatedSubjects;
    });
  };

  return (
    <div className="container">
      <h1>Education Planner</h1>
      <div className="inputContainer">
        <label className="label">
          Subject Name:
          <input
            className="inputField"
            type="text"
            name="name"
            value={newSubject.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Hours:
          <input
            className="inputField"
            type="number"
            name="hours"
            value={newSubject.hours}
            onChange={handleInputChange}
          />
        </label>
        <button className="button" onClick={addSubject}>
          Add Subject
        </button>
      </div>
      <div className="subjectContainer">
        {subjects.map((subject, index) => (
          <div className="subject" key={index}>
            <h3>{subject.name}</h3>
            <p>Hours: {subject.hours}</p>
            <button className="button" onClick={() => updateHours(index, 1)}>
              +
            </button>
            <button className="button" onClick={() => updateHours(index, -1)}>
              -
            </button>
            <button className="button" onClick={() => removeSubject(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;