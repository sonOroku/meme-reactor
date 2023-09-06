import React, { useState } from "react";
import { useGetTemplatesQuery, useCreateMemeMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";

const placeholder =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

export function CreateMeme() {
  const [template_id, setTemplateId] = useState("");
  const [text0, setText0] = useState("");
  const [text1, setText1] = useState("");
  const { data: templates } = useGetTemplatesQuery();
  const [meme] = useCreateMemeMutation();
  const navigate = useNavigate();
  const [source, setSource] = useState(placeholder);
  const handleSelect = (e) => {
    const value = e.target.value;
    const temp = value.split(",");
    setTemplateId(temp[0]);
    setSource(temp[1]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      template_id,
      text0,
      text1,
    };
    meme(info);
    navigate("/profile");
  };
  const handleReset = (e) => {
    setTemplateId("");
    setText0("");
    setText1("");
    setSource(placeholder);
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5">
          <h2>Create a Meme</h2>

          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col-auto">
                  <label htmlFor="template-id">Template</label>
                </div>
                <div className="col">
                  <select
                    value={`${template_id},${source}`}
                    onChange={handleSelect}
                    className="mb-3 w-100"
                    id="template-id"
                  >
                    <option value={`placeholder,${placeholder}`}>
                      Select a template
                    </option>
                    {templates &&
                      templates.map((template) => {
                        return (
                          <option
                            key={template.id}
                            value={`${template.id},${template.url}`}
                          >
                            {template.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col-auto">
                  <label htmlFor="text0">Caption 1</label>
                </div>
                <div className="col">
                  <input
                    className="w-100"
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
                <div className="col-auto">
                  <label htmlFor="text1">Caption 2</label>
                </div>
                <div className="col">
                  <input
                    className="w-100"
                    type="text"
                    id="text1"
                    value={text1}
                    onChange={(e) => setText1(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <img id="meme-preview" src={source} alt="placeholder" />

            <div className="g-5">
              <button type="submit" className="btn btn-success m-1">
                Generate
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="btn btn-danger m-1"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
