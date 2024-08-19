import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch,useSelector } from "react-redux";

import { deleteSubcategory, getSubData, handleAdd, handleUpdateData, handledelete } from "../../../redux/slice/subcategory.slice";
import { getCategories } from "../../../redux/action/category.action";

function Subcategory() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [update, setUpdate] = useState(null);
  
  console.log("data: ", data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const subcategories = useSelector(state => state.subcategories);
  const categories = useSelector(state => state.categories);

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUpdate(null);
  };

  // const getData = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/v1/subcategories/list-subcategories"
  //     );
  //     const data = await response.json();
  //     setData(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getCategory = async () => {
  //   const response = await fetch(
  //     "http://localhost:8000/api/v1/categories/list_categories"
  //   );
  //   const data = await response.json();
  //   setCategoryData(data.data);
  // };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubData());
  }, []);

  // const handleAdd = async (data) => {
  //   try {
  //     await fetch("http://localhost:8000/api/v1/subcategories/create-subcategory",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   getData();
  // };

  // const handleUpdateData = async (data) => {
  //   try {
  //     await fetch(
  //       "http://localhost:8000/api/v1/subcategories/update-subcategory/" +
  //       data._id,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   getData();
  // };

  // const handleDelete = async (data) => {
  //   try {
  //     await fetch(
  //       "http://localhost:8000/api/v1/subcategories/delete-subcategory/" +
  //       data._id,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   getData();
  // };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(data._id);
  };

  const columns = [
    {
      field: 'category_id', headerName: 'Category', width: 150,
      renderCell: (params) => {
          const category = categories.categories?.find((v) => v._id === params.row.category_id);
          // console.log(category);
          return category ? category.name : ''
      }
  },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      </>
      ),
    },
  ];

  let subcategorySchema = object({
    category_id: string().required("Please select a category"),
    name: string().required("Please enter a name"),
    description: string()
      .required("Please enter a description")
      .min(5, "Please enter at least 5 characters"),
  });

  const formik = useFormik({
    initialValues: {
      category_id: "",
      name: "",
      description: "",
    },
    validationSchema: subcategorySchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (update) {
        dispatch(handleUpdateData({ ...values, _id: update }));
      } else {
        dispatch(handleAdd(values));
      }

      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue, } = formik;

  const changeSelect = (event) => {
    setFieldValue("category_id", event.target.value);
  };

  const handleDelete = (id) => {
    dispatch(deleteSubcategory(id));
  };
  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Subcategory
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subcategory</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">
                    Categories
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={values.category_id}
                    label="Category"
                    name="category_id"
                    onChange={changeSelect}
                    onBlur={handleBlur}
                    error={
                      errors.category_id && touched.category_id ? true : false
                    }
                  >
                    {categories.categories.map(
                      (v) => (
                        console.log(v._id),
                        (
                          <MenuItem key={v._id} value={v._id}>
                            {v.name}
                          </MenuItem>
                        )
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Subcategory Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? errors.name : ""}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Subcategory Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description && touched.description ? true : false}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{update ? "Update" : "Add"}</Button>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
      </React.Fragment>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={subcategories.subcategories}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

export default Subcategory;



