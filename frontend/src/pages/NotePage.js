///import React, { useState, useEffect } from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

export const NotePage = ({ history }) => {
  let { id } = useParams();
  let [note, setNote] = useState({ body: "" });
  let navigate = useNavigate();

  useEffect(() => {
    let getNote = async () => {
      if (id === "new") return;
      let response = await fetch(`/api/notes/${id}`);
      let data = await response.json();
      setNote(data);
    };
    getNote();
  }, [id]);

  const handleTextareaChange = (e) => {
    setNote({ ...note, body: e.target.value });
  };

  const createNote = () => {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/note/");
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/note/");
  };

  let updateNote = async () => {
    fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let handleSubmit = () => {
    console.log("NOTE:", note);
    if (id !== "new" && note.body === "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
    navigate("/note/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/note">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea value={note.body} onChange={handleTextareaChange}></textarea>{" "}
    </div>
  );
};
