import React from "react";

export function CreateMeme() {
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5">
          <h2>Create a Meme</h2>

          <form action="submit">
            <div className="row g-3 mb-3">
              <div></div>
              <div className="row">
                <select className="mb-3" id="template-id">
                  <option>Select a template</option>
                </select>
              </div>
            </div>

            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="text0">Caption 1</label>
                </div>
                <div className="col">
                  <input type="text" id="text0" />
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="text1">Caption 2</label>
                </div>
                <div className="col">
                  <input type="text" id="text1" />
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
                  src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                  alt="placeholder"
                />
              </div>
            </div>

            <div className="g-5">
              <button type="button" className="btn btn-success m-1">
                Generate
              </button>
              <button type="button" className="btn btn-danger m-1">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
