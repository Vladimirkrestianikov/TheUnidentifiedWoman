import React, { useState } from "react";
import { supabase } from "../Pagesjs/supabaseClient";
import "../Pagescss/Contacts.css"

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Отправка...");

    try {
      let fileURL = "";

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { publicUrl } = supabase.storage.from("uploads").getPublicUrl(fileName);
        fileURL = publicUrl;
      }

      const { error } = await supabase.from("contacts").insert([
        {
          name,
          email,
          message,
          file_url: fileURL,
        },
      ]);

      if (error) throw error;

      setName("");
      setEmail("");
      setMessage("");
      setFile(null);
      setStatus("Сообщение отправлено!");
    } catch (err) {
      console.error("Ошибка:", err);
      setStatus("Ошибка отправки.");
    }
  };

  return (
    <div className="contacts-container">
      <div className="static-noise"></div>
      <div className="corruption-layer"></div>
      <div className="distortion-field"></div>
      
      <div className="page-content">
        <div className="contacts-section">
          <h1 className="contacts-title">
            <span className="title-text">КОНТАКТНАЯ ФОРМА</span>
            <span className="title-glitch"></span>
          </h1>
          
          <form onSubmit={handleSubmit} className="contacts-form">
            <div className="form-group">
              <label className="form-label">ВАШЕ ИМЯ</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="input-corruption"></div>
            </div>

            <div className="form-group">
              <label className="form-label">ВАШ EMAIL</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="input-corruption"></div>
            </div>

            <div className="form-group">
              <label className="form-label">СООБЩЕНИЕ</label>
              <textarea
                className="form-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <div className="input-corruption"></div>
            </div>

            <div className="form-group">
              <label className="form-label file-label">
                ПРИКРЕПИТЬ ФАЙЛ
                <input
                  type="file"
                  className="file-input"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
                <span className="file-custom">
                  {file ? file.name : "ВЫБРАТЬ ФАЙЛ"}
                </span>
              </label>
            </div>

            <button type="submit" className="submit-button">
              <span className="button-text">ОТПРАВИТЬ СООБЩЕНИЕ</span>
              <span className="button-glitch"></span>
              <div className="button-scan"></div>
            </button>
          </form>

          {status && (
            <div className={`status-message ${status.includes("Ошибка") ? "error" : "success"}`}>
              <span className="status-text">{status}</span>
              <div className="status-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;