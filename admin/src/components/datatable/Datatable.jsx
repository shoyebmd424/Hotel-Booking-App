import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link,useLocation } from "react-router-dom";
import { useState } from "react";
import useFatch from "../../Hooks/useFatch";
import { useEffect } from "react";
import Axios from "../../Axios/Axios";
const Datatable = () => {
  const location=useLocation();
  const path=location.pathname.split("/")[1];
  const [list, setlist] = useState([]);
const {data,loading,error} =useFatch(`/${path}`)
  const handleDelete =async (id) => {
    try {
      await Axios.delete(`/${path}/${id}`)
      setlist(list.filter((item) => item._id !== id));
    } catch (error) {
      
    }
  };
  useEffect(()=>{
 setlist(data);
  },[data])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
