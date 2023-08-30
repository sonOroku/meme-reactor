import React, { useState } from "react";
import { useGetTemplatesQuery, useCreateMemeMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";



export function CreateMeme() {
  const [template_id, setTemplateId] = useState("");
  const [text0, setText0] = useState("");
  const [text1, setText1] = useState("");
  const {data: templates} = useGetTemplatesQuery();
  const [meme] = useCreateMemeMutation();
  const navigate = useNavigate();
  const [source, setSource] = useState("https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png");
  const handleSelect = (e) => {
    const value = e.target.value;
    const temp = value.split(",")
    setTemplateId(temp[0])
    setSource(temp[1])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      template_id, text0, text1
    }
    meme(info)
    navigate("/profile")
  }
  const handleReset = (e) => {
    setTemplateId("");
    setText0("");
    setText1("");
    setSource("https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png");
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5">
          <h2>Create a Meme</h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div></div>
              <div className="row">
                <select
                value={template_id}
                onChange={handleSelect}
                className="mb-3"
                id="template-id">
                  <option>Select a template</option>
                  {templates && templates.map(template => {
                    return (<option
                      key={template.id}
                      value={[template.id, template.url]}>{template.name}</option>)
                  })}
                </select>
              </div>
            </div>

            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="text0">Caption 1</label>
                </div>
                <div className="col">
                  <input
                  type="text"
                  id="text0"
                  value={text0}
                  onChange={(e) => setText0(e.target.value)}
                   />
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="text1">Caption 2</label>
                </div>
                <div className="col">
                  <input
                  type="text"
                  id="text1"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="container-sm">
              <div
                className="border border-primary"
                id="meme-preview-container"
              >
                <img
                  width="400"
                  height="300"
                  src={source}
                  alt="placeholder"
                />
              </div>
            </div>

            <div className="g-5">
              <button type="submit" className="btn btn-success m-1">
                Generate
              </button>
              <button onClick={handleReset} type="button" className="btn btn-danger m-1">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
