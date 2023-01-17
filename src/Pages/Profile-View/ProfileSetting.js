import React, { useState } from "react";
import inputData from "../../Common-Resources/inputData.json";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./ProfileSetting.module.css";
import { useNavigate } from "react-router-dom";
function ProfileSetting() {
  const [fields, setFields] = useState({
    email: "",
    name: " ",
  });
  const [autocompleteValues, setAutocompleteValues] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const onChangeSkills = (event, value) => {
    setAutocompleteValues(value);
  };
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/Profile");
  };
  return (
    <>
      <div className="container">
        <div className={` d-flex m-2  flex-row-reverse`}>
          <button
            className={`${styles.submit_btn} btn_prim  my-3 `}
            onClick={handleProfile}
          >
            Go to your personal profile
          </button>
        </div>

        <div className={`${styles.main_div} d-flex flex-column flex-fill m-4`}>
          <h2 className="text-center ">Public Profile</h2>
          <div className={`${styles.sub_div} d-flex flex-row  flex-fill `}>
            <form
              className={`${styles.form_div} d-md-flex flex-column mx-4 my-5 flex-fill`}
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={fields.name}
                  required
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={fields.email}
                  required
                />
                <div id="emailhelp" className="form-text">
                  We'll Never Share Your Email With Anyone Else.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Select Your Skills
                </label>
                <Autocomplete
                  clearOnEscape
                  disableClearable
                  id="combo-box-2"
                  multiple
                  value={autocompleteValues}
                  onChange={onChangeSkills}
                  options={inputData.skills.data}
                  key={inputData.skills.data}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </div>
              <button
                type="submit"
                className={`${styles.submit_btn} btn_prim  my-3`}
              >
                Update profile
              </button>
            </form>
            <div className={` d-flex mx-5  justify-content flex-column`}>
              <h6>Profile picture</h6>
              <div
                className={`${styles.user_profile_pic}`}
                style={{
                  backgroundImage: `url("https://avatars.dicebear.com/api/initials/${fields.name}.svg")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSetting;
