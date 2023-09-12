import React, { useState } from "react";
import { useGetTemplatesQuery, useCreateMemeMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";

const placeholder =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

export function CreateMeme() {
  const [template_id, setTemplateId] = useState("");
  const { data: templates } = useGetTemplatesQuery();
  const [meme] = useCreateMemeMutation();
  const navigate = useNavigate();
  const [source, setSource] = useState(placeholder);
  const [boxes, setBoxes] = useState({ 0: "", 1: "" });
  const [box_count, setBoxCount] = useState(2);

  const handleSelect = (e) => {
    const value = e.target.value;
    const temp = value.split(",");
    setTemplateId(temp[0]);
    setSource(temp[1]);
    setBoxCount(temp[2]);
    const temp_list = {};
    for (let i = 0; i < temp[2]; i++) {
      temp_list[i] = "";
    }
    setBoxes(temp_list);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      template_id,
      boxes: Object.values(boxes),
    };
    meme(info);
    navigate("/profile");
  };
  const handleReset = (e) => {
    setTemplateId("");
    setBoxes({ 0: "", 1: "" });
    setBoxCount(2);
    setSource(placeholder);
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5 bg-white">
          <h2>Create a Meme</h2>

          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col-auto">
                  <label htmlFor="template-id">Template</label>
                </div>
                <div className="col">
                  <select
                    value={`${template_id},${source},${box_count}`}
                    onChange={handleSelect}
                    className="mb-3 w-100"
                    id="template-id"
                  >
                    <option value={`placeholder,${placeholder},${box_count}`}>
                      Select a template
                    </option>
                    {templates &&
                      templates.map((template) => {
                        return (
                          <option
                            key={template.id}
                            value={`${template.id},${template.url},${template.box_count}`}
                          >
                            {template.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            {Object.keys(boxes).map((item) => {
              const number = Number.parseInt(item) + 1;
              return (
                <div className="mt-auto" key={item}>
                  <div className="row g-3 mb-3">
                    <div className="col-auto">
                      <label htmlFor="text1">Caption {number}</label>
                    </div>
                    <div className="col">
                      <input
                        className="w-100"
                        type="text"
                        id="text1"
                        name={item}
                        value={boxes[item]}
                        onChange={(e) => {
                          const inputName = e.target.name;
                          setBoxes({
                            ...boxes,
                            [inputName]: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

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
