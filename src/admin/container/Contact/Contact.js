import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string, number, date } from "yup";
import { useFormik } from "formik";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { ContactContext } from "../../../context/ContactContext";
// import { addCoupon, deleteCoupon, editCoupon, getCoupon } from "../../../redux/slice/coupon.slice";


function Contact(props) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch();

    const contact = useContext(ContactContext)
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setUpdate(true);
        setOpen(true);
    };

    const handleDelete = (id) => {
        // dispatch(deleteCoupon(id));
    };

    useEffect(() => {
        contact.getContact()
    }, [contact]);

    const columns = [
        { field: "address", headerName: "Address", width: 70 },
        { field: "email", headerName: "email", width: 130 },
        { field: "phone", headerName: "phone", width: 130 },
        {
            field: "Action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)} variant="contained">
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => contact.deleteContact(params.row.id)} variant="contained">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    let contactSchema = object({
        address: string().required(),
        email: string().email().required(),
        phone: number().required(),
    });

    const formik = useFormik({
        initialValues: {
            address: "",
            email: "",
            phone: "",
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                contact.editContact(values)
            } else {
                contact.addContact(values)
            }
            resetForm();
            handleClose();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Contact
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Contact</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="address"
                                label="Address"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                error={touched.address && errors.address ? true : false}
                                helperText={
                                    touched.address && errors.address ? errors.address : ""
                                }
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="email"
                                label="email"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && errors.email ? true : false}
                                helemailText={touched.email && errors.email ? errors.email : ""}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="phone"
                                label="phone"
                                type="number"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                error={touched.phone && errors.phone ? true : false}
                                helperText={
                                    touched.phone && errors.phone ? errors.phone : ""
                                }
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={contact.contact}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Contact;





