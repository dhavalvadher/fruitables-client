// import React, { useEffect, useState } from 'react'
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { object, string, number, date, InferType } from 'yup';
// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from "react-redux";
// import { DataGrid } from '@mui/x-data-grid';
// import { IconButton } from "@mui/material";
// // import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from '@mui/icons-material/Delete';
// // import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { addCoupon, getCoupon, removeCoupon, updateCoupon } from '../../../redux/slice/coupon.slice';

// const Coupon = () => {

//     const dispatch = useDispatch()

//     const couponIsHere = useSelector(state => state.couponInCart)
//     console.log(couponIsHere);

//     const [open, setOpen] = React.useState(false);

//     const [update, setUpdate] = useState(false)

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     useEffect(() => {
//         dispatch(getCoupon());
//     }, [dispatch]);



//     let couponSchema = object({
//         couponename: string().required(),
//         percentage: number().required(),
//         date: date().required(),
//     });

//     const formik = useFormik({
//         initialValues: {
//             couponename: '',
//             percentage: '',
//             date: '',
//             createdOn: new Date().toISOString().split('D')[0]
//         },
//         validationSchema: couponSchema,
//         onSubmit: (values) => {
//             if (update) {
//                 dispatch(updateCoupon(values.id, values));
//             } else {
//                 dispatch(addCoupon({ ...values }));
//             }

//             handleClose();
//             formik.resetForm();
//         }

//     })

//     const columns = [
//         { field: 'couponename', headerName: 'Coupon Name', width: 130 },
//         { field: 'percentage', headerName: 'Percentage', width: 130 },
//         { field: 'date', headerName: 'Date', width: 130 },
//         { field: 'createdOn', headerName: 'CreatedOn', width: 130 },
//         {
//             field: "edit",
//             headerName: "Edit",
//             width: 100,
//             renderCell: (params) => (
//                 <IconButton
//                     onClick={() => handleEdit(params.row)} variant="contained">
//                     <EditIcon />
//                 </IconButton>
//             ),
//         },
//         {
//             field: "remove",
//             headerName: "Remove",
//             width: 130,
//             renderCell: (params) => (

//                 <IconButton onClick={() => handleRemove(params.row.id)} variant="contained">
//                     <DeleteIcon />
//                 </IconButton>
//             ),
//         },
//     ];

//     const handleRemove = (id) => {
//         dispatch(removeCoupon(id));
//     }

//     const handleEdit = (data) => {
//         formik.setValues(data);
//         setOpen(true);
//         setUpdate(true);
//     }

//     const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

//     return (
//         <>

//             <Button variant="outlined" onClick={handleClickOpen}>
//                 coupon
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Coupon Code</DialogTitle>
//                 <form onSubmit={handleSubmit}>
//                     <DialogContent>
//                         <TextField
//                             margin="dense"
//                             id="couponename"
//                             name="couponename"
//                             label="Enter Coupon Name"
//                             type="name"
//                             fullWidth
//                             variant="outlined"
//                             value={values.couponename}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={errors.couponename && touched.couponename ? true : false}
//                             helperText={errors.couponename && touched.couponename ? errors.couponename : ''}
//                         />
//                         <TextField
//                             margin="dense"
//                             id="percentage"
//                             name="percentage"
//                             label="percentage"
//                             type="number"
//                             fullWidth
//                             variant="outlined"
//                             value={values.percentage}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={errors.percentage && touched.percentage ? true : false}
//                             helperText={errors.percentage && touched.percentage ? errors.percentage : ''}
//                         />
//                         <TextField
//                             margin="dense"
//                             id="date"
//                             name="date"
//                             type="date"
//                             fullWidth
//                             variant="outlined"
//                             value={values.date}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={errors.date && touched.date ? true : false}
//                             helperText={errors.date && touched.date ? errors.date : ''}
//                         />
//                         <DialogActions>
//                             <Button onClick={handleClose}>Cancel</Button>
//                             <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
//                         </DialogActions>
//                     </DialogContent>
//                 </form>
//             </Dialog>

//             <div style={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                     rows={couponIsHere.coupon || []}
//                     columns={columns}
//                     initialState={{
//                         pagination: {
//                             paginationModel: { page: 0, pageSize: 5 },
//                         },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                 />
//             </div>

//         </>
//     )
// }

// export default Coupon;




// import React, { useEffect, useState, useStatesetOpen } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { object, string, number, date } from 'yup';
// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Spinner from 'react-spinkit';
// import { addcoupon } from '../../../redux/slice/coupon.slice';




// function Products(props) {
//     const [open, setOpen] = React.useState(false);
//     const [update, setUpdate] = useState(false)

//     const dispatch = useDispatch();

//     useEffect(() => {

//     }, [])

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         formik.resetForm(true)
//         setUpdate(false)
//     };

//     let couponSchema = object({
//         name: string().required(),
//         description: number().required(),
//         expiry: date().required(),
//     });

//     const formik = useFormik({
//         initialValues: {
//             couponename: '',
//             percentage: '',
//             expiry: ''
//         },
//         validationSchema: couponSchema,
//         onSubmit: (values, { resetForm }) => {
//             if (update) {

//             } else {
//                 dispatch(addcoupon(values))
//             }

//             resetForm();
//             handleClose();

//         },
//     });


//     const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik;



//     const handleDelete = (id) => {

//     }

//     const hendalEdit = (data) => {
//         formik.setValues(data)
//         setUpdate(true)
//         setOpen(true)

//     }

//     const columns = [
//         { field: 'couponename', headerName: 'couponename', width: 70 },
//         { field: 'percentage', headerName: 'percentage', width: 130 },
//         { field: 'expiry', headerName: 'expiry', width: 90 },
//         {
//             field: 'Action',
//             headerName: 'Action',
//             width: 130,
//             renderCell: (params) => (
//                 <>
//                     <IconButton aria-label="edit" onClick={() => hendalEdit(params.row)}>
//                         <EditIcon />
//                     </IconButton>
//                     <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
//                         <DeleteIcon />
//                     </IconButton>
//                 </>
//             )
//         },
//     ];


//     // const products = useSelector(state => state.products);
//     // console.log(products);

//     return (
//         <div>

//             {

//                 <>
//                     <Button variant="outlined" onClick={handleClickOpen}>
//                         Add Coupon
//                     </Button>
//                     <Dialog open={open}
//                         onClose={handleClose}
//                     >
//                         <DialogTitle>Coupon</DialogTitle>
//                         <form onSubmit={handleSubmit}>
//                             <DialogContent>
//                                 <TextField
//                                     margin="dense"
//                                     id="couponename"
//                                     name="couponename"
//                                     label="couponename"
//                                     type="text"
//                                     fullWidth
//                                     variant="outlined"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.couponename}
//                                     error={errors.couponename && touched.couponename ? true : false}
//                                     helperText={errors.couponename && touched.couponename ? errors.couponename : ''}
//                                 />
//                                 <TextField
//                                     margin="dense"
//                                     id="percentage"
//                                     name="percentage"
//                                     label="Add percentage"
//                                     type="number"
//                                     fullWidth
//                                     variant="outlined"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.percentage}
//                                     error={errors.percentage && touched.percentage ? true : false}
//                                     helperText={errors.percentage && touched.percentage ? errors.percentage : ''}
//                                 />
//                                 <TextField
//                                     margin="dense"
//                                     id="expiry"
//                                     name="expiry"
//                                     label="Add expiry"
//                                     type="date"
//                                     fullWidth
//                                     variant="outlined"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.expiry}
//                                     error={errors.expiry && touched.expiry ? true : false}
//                                     helperText={errors.expiry && touched.expiry ? errors.expiry : ''}
//                                 />
//                                 <DialogActions>
//                                     <Button onClick={handleClose}>Cancel</Button>
//                                     <Button type="submit">add</Button>
//                                 </DialogActions>

//                             </DialogContent>
//                         </form>
//                     </Dialog>

//                     {/* <div style={{ width: '100%' }}>
//               <DataGrid
//                 rows={products.products}
//                 columns={columns}
//                 initialState={{
//                   pagination: {
//                     paginationModel: { page: 0, pageSize: 10 },
//                   },
//                 }}
//                 pageSizeOptions={[5, 10, 100]}
//                 checkboxSelection
//               />
//             </div> */}
//                 </>
//             }

//         </div>
//     );
// }

// export default Products;




import React, { useEffect, useState } from "react";
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
import { addCoupon, deleteCoupon, editCoupon, getCoupon } from "../../../redux/slice/coupon.slice";


function Coupon(props) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch();

    const coupon = useSelector(state => state.coupon);
    console.log(coupon);


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
        dispatch(deleteCoupon(id));
    };

    useEffect(() => {
        dispatch(getCoupon());
    }, []);

    const columns = [
        { field: "coupon", headerName: "Coupon", width: 70 },
        { field: "percentage", headerName: "percentage", width: 130 },
        { field: "expiry", headerName: "Expiry", width: 130 },
        {
            field: "Action",
            headerName: "Action",
            width: 150,
            renderCell: ({ row }) => (
                <>
                    <IconButton onClick={() => handleEdit(row)} variant="contained">
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(row.id)} variant="contained">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    let couponSchema = object({
        coupon: string().required(),
        percentage: number().required(),
        expiry: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            coupon: "",
            percentage: "",
            expiry: "",
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
                dispatch(editCoupon(values));
            } else {
                dispatch(addCoupon(values));
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
                    Coupon
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Coupon</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="coupon"
                                label="Coupon Code"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.coupon}
                                error={touched.coupon && errors.coupon ? true : false}
                                helperText={
                                    touched.coupon && errors.coupon ? errors.coupon : ""
                                }
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="percentage"
                                label="percentage"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.percentage}
                                error={touched.percentage && errors.percentage ? true : false}
                                helpercentageText={touched.percentage && errors.percentage ? errors.percentage : ""}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="expiry"
                                label="expiry"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expiry}
                                error={touched.expiry && errors.expiry ? true : false}
                                helperText={
                                    touched.expiry && errors.expiry ? errors.expiry : ""
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
                    rows={coupon.coupon}
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

export default Coupon;