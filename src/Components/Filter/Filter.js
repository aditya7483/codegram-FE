import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import inputData from "../../Common-Resources/inputData.json";
function Filter(props) {

  const [data, setData] = useState([])
  const handleClick = (d) => {
    let index = data.indexOf(d)
    if (data.indexOf(d) === -1) {
      setData([...data, d])
    }
    else {
      let newdata = data
      newdata.splice(index, 1)
      setData([...newdata])
    }
    console.log(data)
  };

  return (
    <div>
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="filter"
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        <FilterListIcon />
      </IconButton>
      <div
        className="modal fade"
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="filterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Filters
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <Stack direction="row" className="flex-wrap" spacing={1}>

                {(props.selected === 'project' ? (inputData.projectDomains.data) : (inputData.skills.data)).map((d) => {
                  return (
                    <Chip
                      sx={{ color: `${data.indexOf(d) === -1 ? "blue" : "red"}` }}
                      className="m-2"
                      label={d}
                      onClick={() => {
                        handleClick(d)
                      }
                      }

                    />
                  );
                })} </Stack>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
