import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addCategory, deleteCategory, editCategory, getCategories } from '../../../redux/action/category.action';
import { useDispatch, useSelector } from 'react-redux';

function Category(props) {
    const [open, setOpen] = useState(false);
    // const [data, setData] = useState([]);
    const [update, setUpdate] = useState(null);
    const dispatch = useDispatch();
    const  categories  = useSelector(state => state.categories);

    console.log(categories);

    useEffect(() => {
        // getData();
        dispatch(getCategories());
    }, [dispatch]);

    let categorySchema = object({
        name: string().required("Please enter name"),
        description: string().required("Please enter description").min(5, "Please enter minimum 5 characters")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: ""
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                // handleUpdateData(values);
                dispatch(editCategory({ ...values, _id: update }));
            } else {
                // handleAdd(values);
                dispatch(addCategory(values));
            }
            resetForm();
            handleClose();
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    // const getData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await fetch("http://localhost:8000/api/v1/categories/list_categories");
    //         const data = await response.json();
    //         setData(data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setIsLoading(false);
    // }

    // const handleAdd = async (data) => {
    //     try {
    //         await fetch("http://localhost:8000/api/v1/categories/post_categories", {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         getData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const hendalDelete = async (data) => {
    //     try {
    //         await fetch(`http://localhost:8000/api/v1/categories/delete_categories/${data._id}`, {
    //             method: 'DELETE'
    //         });
    //         getData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleEdit = (data) => {
        setOpen(true);
        formik.setValues(data);
        setUpdate(data._id);
    }

    // const handleUpdateData = async (data) => {
    //     try {
    //         await fetch(`http://localhost:8000/api/v1/categories/update_categories/${data._id}`, {
    //             method: "PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         getData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                     <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => dispatch(deleteCategory(params.row._id))}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <div>
           
                <>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Category
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Category</DialogTitle>
                        <form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Category Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={formik.errors.name && formik.touched.name}
                                    helperText={formik.errors.name && formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Category Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                    error={formik.errors.description && formik.touched.description}
                                    helperText={formik.errors.description && formik.touched.description && formik.errors.description}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">{update ? "Update" : "Add"}</Button>
                                </DialogActions>
                            </DialogContent>
                        </form>
                    </Dialog>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={categories.categories}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            getRowId={(row) => row._id}
                        />
                    </div>
                </>
            
        </div>
    );
}

export default Category;






