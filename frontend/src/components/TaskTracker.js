import React, { useState, useEffect } from "react";
import "./TaskTracker.css";

function TaskTracker() {

  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks =
      localStorage.getItem("smartFarmerTasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "smartFarmerTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {

    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskText,
      dueDate: dueDate,
      status: "To Do"
    };

    setTasks([...tasks, newTask]);

    setTaskText("");
    setDueDate("");
  };

  const updateStatus = (id, status) => {

    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  };

  const deleteTask = (id) => {

    setTasks(
      tasks.filter(task => task.id !== id)
    );
  };

  const todoCount =
    tasks.filter(
      t => t.status === "To Do"
    ).length;

  const progressCount =
    tasks.filter(
      t => t.status === "In Progress"
    ).length;

  const completedCount =
    tasks.filter(
      t => t.status === "Completed"
    ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedCount / tasks.length) * 100
        )
      : 0;

  return (

    <div className="task-container">

      <div className="task-header">

        <h1>
          🌾 Smart Farmer Task Tracker
        </h1>

        <p>
          Track farming activities and AI suggestions
        </p>

      </div>

      <div className="stats-grid">

        <div className="status-card todo">

          <h1>{todoCount}</h1>

          <p>
            📝 To Do
          </p>

        </div>

        <div className="status-card progress-card">

          <h1>{progressCount}</h1>

          <p>
            🔄 In Progress
          </p>

        </div>

        <div className="status-card completed-card">

          <h1>{completedCount}</h1>

          <p>
            ✅ Completed
          </p>

        </div>

      </div>

      <div className="progress-section">

        <h3>
          Overall Progress
        </h3>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

        <p>
          {progress}% Completed
        </p>

      </div>

      <div className="task-form">

        <input
          type="text"
          placeholder="Enter Farming Task..."
          value={taskText}
          onChange={(e) =>
            setTaskText(e.target.value)
          }
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        <button onClick={addTask}>
          ➕ Add Task
        </button>

      </div>

      <div className="task-list">

        {tasks.length === 0 ? (

          <div className="empty-state">

            🌱 No Tasks Added Yet

          </div>

        ) : (

          tasks.map(task => (

            <div
              key={task.id}
              className="task-card"
            >

              <div>

                <h3>
                  {task.title}
                </h3>

                {task.dueDate && (

                  <p>
                    📅 Due:
                    {" "}
                    {task.dueDate}
                  </p>

                )}

              </div>

              <div className="task-actions">

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task.id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    To Do
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Completed
                  </option>

                </select>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default TaskTracker;