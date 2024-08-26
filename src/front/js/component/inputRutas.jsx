import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const InputRutas = () => {
    const { store, actions } = useContext(Context)
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputTitleChange = (e) => {
        setTitleValue(e.target.value);
        store.newItineraryData.title = titleValue;
    };

    const handleInputDescChange = (e) => {
        setDescriptionValue(e.target.value);
        store.newItineraryData.description = descriptionValue;
    };

    return (
        <div>
            <hr />
            <h5 className="mb-2">Información del itinerario:</h5>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Título"
                    aria-label="Titulo"
                    aria-describedby="basic-addon1"
                    maxLength="35"
                    onChange={handleInputTitleChange}
                    required
                />
            </div>

            <div className="tags-container mb-3">
                {tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                        #{tag}
                        <span
                            type="button"
                            className="ms-1"
                            aria-label="Remove"
                            onClick={() => handleRemoveTag(index)}
                        ><i className="fa-solid fa-x fa-xs" style={{color: '#949494'}}></i></span>
                    </span>
                ))}
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a tag"
                    aria-label="Enter a tag"
                    aria-describedby="basic-addon2"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            <div className="mb-3">
                <textarea
                    className="form-control"
                    id="itiDescInput" 
                    rows="6"
                    placeholder="Escribe algo aquí..."
                    maxLength="250"
                    onChange={handleInputDescChange}
                    required
                ></textarea>
            </div>
        </div>
    );
};
