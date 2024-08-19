import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { Delete_data, Edit_data, Facility_data } from '../../component/redux/action/facility.action';
import Spinner from 'react-spinkit';
import { Edit_data, Facility_data } from '../../../redux/action/facility.action';
// import { Edit_data, Facility_data } from '../../component/redux/action/facility.action';

function Facility(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true)
        setUpdate(false)
    };

    let FacilitySchema = object({
        name: string().required(),
        description: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: FacilitySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(Edit_data(values))

            } else {
                const rNo = Math.floor((Math.random() * 1000));
                dispatch(Facility_data({ ...values, id: rNo }));
            }

            resetForm();
            handleClose();

        },
    });


    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik;

    const Facility = useSelector((state) => state.facilites);
    console.log(Facility);

    const handleDelete = (id) => {
       
    }

    const hendalEdit = (data) => {
        formik.setValues(data)
        setUpdate(true)
        setOpen(true)

    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => hendalEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        },
    ];


    return (
        <div>

            {
                Facility.isLoading ? <p>
                    <Spinner name="line-scale-pulse-out" color="aqua" />
                </p> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Facility
                        </Button>
                        <Dialog open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Facility</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Add Facility"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && touched.name ? true : false}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Add Description"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && touched.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? "Update" : "add"}</Button>
                                    </DialogActions>

                                </DialogContent>
                            </form>
                        </Dialog>
                        <div style={{ width: '100%' }}>
                            <DataGrid
                                rows={Facility.facility}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 100]}
                                checkboxSelection
                            />
                        </div>
                    </>
            }
        </div>
    );
}

export default Facility;






