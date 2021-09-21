import React, { useState } from "react";
import Helmet from "react-helmet";
function Create() {
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [slug, setSlug] = useState("");
  const [slugButton, setSlugButton] = useState(false);
  const handleSlug = (e) => {
    setSlugButton(true);
    setSlug(e.target.value);
  };
  const handleImage = (e) => {
    setCurrentImage(e.target.files[0].name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const slugUpdate = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: [e.target.value],
    });
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };
  return (
    <div className="create">
      <Helmet>
        <title>Create a post</title>
        <meta name="description" content="Create a post" />
      </Helmet>
      <div className="createContainer">
        <div className="createHeading">
          <h2 className="contentHeading">Create Post</h2>
        </div>
        <form className="createContent">
          <label htmlFor="" className="title">
            Title
          </label>
          <input
            className="input"
            type="text"
            name="title"
            id="title"
            value={state.title}
            onChange={handleInput}
            placeholder="Don't forget the title >.<"
          />
          <label htmlFor="" className="title">
            Post Content
          </label>
          <textarea
            name=""
            className="input"
            style={{ resize: "none" }}
            rows="10"
            cols="20"
            placeholder="So, what's on ya mind ?"
          ></textarea>
          <div className="btnWrapper">
            <button className="btn">Create Post</button>
          </div>
        </form>
      </div>
      <div className="createContainersm">
        <label className="title" htmlFor="slug">
          POST URL
        </label>
        <input
          type="text"
          className="input"
          name="slug"
          id="slug"
          placeholder="POST URL"
          value={slug}
          onChange={handleSlug}
        />
        {slugButton ? (
          <button className="btn2" onClick={slugUpdate}>
            Update Slug
          </button>
        ) : (
          ""
        )}
        <label className="title imageLabel" htmlFor="image">
          {currentImage}
        </label>
        <input
          className="mt-2"
          type="file"
          name="picture"
          id="image"
          onChange={handleImage}
        />
        {imagePreview ? (
          <img className="imagePreview" src={imagePreview} />
        ) : (
          ""
        )}
        <label className="title" htmlFor="description">
          Meta Description
        </label>
        <textarea
          name=""
          className="input"
          style={{ resize: "none" }}
          rows="10"
          cols="20"
          placeholder="meta description"
          maxLength="150"
        ></textarea>
      </div>
    </div>
  );
}

export default Create;
