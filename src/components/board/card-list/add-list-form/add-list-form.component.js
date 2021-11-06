import React, { useState } from "react";
import "./add-list-form.styles.scss";

const AddListForm = ({ withControls, inputValue, ...props }) => {

  const [inputVal, setInputVal] = useState(inputValue || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal) {
      props.onSubmit(inputVal);
    }
  }

  const handleInputBlur = () => {
    if (inputVal) {
      return props.onInputBlur(inputVal);
    } 

    setInputVal(inputValue);
  }

  const renderTextArea = () => {
    return (
      <textarea 
        placeholder={props.inputPlaceholder}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      >

      </textarea>
    );
  }

  const renderInput = () => {
    return (
      <input 
        className="list-title-input" 
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onBlur={props.onInputBlur && handleInputBlur}
      />
    );
  }

  return (
    <form 
      className={props.className}
      onSubmit={handleSubmit}
    >
      {
        props.useTextArea ? renderTextArea() : renderInput()
      }

      {withControls && (
        <div className="add-list-controllers">
          <button type="submit" className="add-list-btn">
            {props.submitText}
          </button>
          <button 
            className="close-add-list"
            onClick={props.onClose}
          >
            <i className="medium material-icons">clear</i>
          </button>
        </div>
      )}
    </form>
  );
};

export default AddListForm;
