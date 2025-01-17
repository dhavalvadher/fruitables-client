// import React, { useEffect, useState } from 'react';
// import {
//     Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
//     FormControl, InputLabel, MenuItem, Select, IconButton,
//     FormHelperText
// } from '@mui/material';
// import { useFormik } from 'formik';
// import { object, string, boolean,mixed} from 'yup';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSubData } from '../../../redux/slice/subcategory.slice';
// import { getCategories } from '../../../redux/action/category.action';
// import { getProducts } from '../../../redux/action/products.action';
// import { addVariant, deleteVariant, editVariant, getVariant } from '../../../redux/action/variants.action';

// function Variants() {
//     const [open, setOpen] = useState(false);
//     const [update, setUpdate] = useState(false);
//     const [dynamicFields, setDynamicFields] = useState([]);
//     const dispatch = useDispatch();

//     const products = useSelector((state) => state.products.products || []);
//     const categories = useSelector((state) => state.categories.categories || []);
//     const subcategories = useSelector((state) => state.subcategories.subcategories || []);
//     const variants = useSelector((state) => state.variant.variant || []);

//     useEffect(() => {
//         dispatch(getVariant());
//         dispatch(getProducts());
//         dispatch(getCategories());
//         dispatch(getSubData());
//     }, [dispatch]);

//     const handleClickOpen = () => {
//         setOpen(true);
//         setUpdate(false);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setUpdate(false);
//         setDynamicFields([]);
//         formik.resetForm();
//     };

//     const handleEdit = (data) => {
//         formik.setValues({
//             ...data,
//             additionalFields: Object.entries(data.attributes || {}).map(([key, value]) => ({ key, value })),
//         });
//         setOpen(true);
//         setUpdate(true);
//         setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
//     };

//     const handleDelete = (id) => {
//         dispatch(deleteVariant(id));
//     };

//     const variantSchema = object({
//         category_id: string().required('Category is required'),
//         subcategory_id: string().required('Subcategory is required'),
//         product_id: string().required('Product is required'),
//         price: string().required('Please enter price'),
//         stock: string().required('Please enter stock'),
//         discount: string().required('Please enter discount'),
//         is_active: boolean(),
//         variants_image: mixed()
//             .required("Please select an image")
//             .test("fileSize", "The file is too large", (value) => {
//                 if (value.size) {
//                     return value && value.size <= 2 * 1024 * 1024;
//                 }
//                 return true

//             })
//             .test("fileType", "Unsupported File Format", (value) => {
//                 if (value.type) {
//                     return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
//                 }
//                 return true
//             })
//     });

//     const formik = useFormik({
//         initialValues: {
//             category_id: '',
//             subcategory_id: '',
//             product_id: '',
//             price: '',
//             stock: '',
//             discount: '',
//             additionalFields: [],
//             is_active: true,
//             variants_image: '',
//         },
//         validationSchema: variantSchema,
//         onSubmit: (values, { resetForm }) => {
//             const attributes = {
//                 ...values.additionalFields.reduce((acc, field) => {
//                     acc[field.key] = field.value;
//                     return acc;
//                 }, {}),
//             };

//             const variantData = {
//                 ...values,
//                 attributes,
//             };

//             if (update) {
//                 dispatch(editVariant(variantData));
//             } else {
//                 dispatch(addVariant(variantData));
//             }
//             resetForm();
//             handleClose();
//         },
//     });

//     const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

//     const addField = () => {
//         const newField = { key: '', value: '' };
//         setDynamicFields([...dynamicFields, newField]);
//         setFieldValue('additionalFields', [...dynamicFields, newField]);
//     };

//     const removeField = (index) => {
//         const updatedFields = [...dynamicFields];
//         updatedFields.splice(index, 1);
//         setDynamicFields(updatedFields);
//         setFieldValue('additionalFields', updatedFields);
//     };

//     const handleDynamicFieldChange = (index, field) => (e) => {
//         const updatedFields = [...dynamicFields];
//         updatedFields[index][field] = e.target.value;
//         setDynamicFields(updatedFields);
//         setFieldValue('additionalFields', updatedFields);
//     };

//     const handleFileChange = (event) => {
//         setFieldValue("variants_image", event.currentTarget.files[0]);
//     }

//     const columns = [
//         {
//             field: "variants_image",
//             headerName: "variants image",
//             width: 150,
//             renderCell: ({ row }) => (
//                 <img src={row.variants_image.url} width="50" height="50" />
//             ),
//         },
//         {
//             field: 'category_id', headerName: 'Category', width: 150,
//             renderCell: (params) => {
//                 const category = categories.find((v) => v._id === params.row.category_id);
//                 return category ? category.name : '';
//             }
//         },
//         {
//             field: 'subcategory_id', headerName: 'SubCategory', width: 150,
//             renderCell: (params) => {
//                 const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
//                 return subcategory ? subcategory.name : '';
//             }
//         },
//         {
//             field: 'product_id', headerName: 'Product', width: 150,
//             renderCell: (params) => {
//                 const product = products.find((v) => v._id === params.row.product_id);
//                 return product ? product.name : '';
//             }
//         },
//         {
//             field: 'attributes', headerName: 'Attributes', width: 400,
//             renderCell: (params) => {
//                 const attributes = params.row.attributes;
//                 return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
//             }
//         },
//         { field: 'price', headerName: 'price', width: 160 },
//         { field: 'stock', headerName: 'stock', width: 160 },
//         { field: 'discount', headerName: 'discount', width: 160 },
//         {
//             field: 'Action',
//             headerName: 'Action',
//             width: 150,
//             renderCell: (params) => (
//                 <>
//                     <Button
//                         onClick={() => handleDelete(params.row._id)}
//                         startIcon={<DeleteIcon />}
//                     />
//                     <Button
//                         onClick={() => handleEdit(params.row)}
//                         startIcon={<EditIcon />}
//                     />
//                 </>
//             ),
//         },
//     ];

//     return (
//         <>
//             <div>
//                 <Button variant="contained" onClick={handleClickOpen}>
//                     Add Variant
//                 </Button>
//                 <Dialog open={open} onClose={handleClose}>
//                     <DialogTitle>{update ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
//                     <form onSubmit={handleSubmit}>
//                         <DialogContent sx={{ minWidth: 500 }}>


//                             <FormControl fullWidth margin="dense" error={touched.category_id && Boolean(errors.category_id)}>
//                                 <InputLabel id="category-select-label">Category</InputLabel>
//                                 <Select
//                                     labelId="category-select-label"
//                                     id="category-select"
//                                     name="category_id"
//                                     value={values.category_id}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 >
//                                     {categories?.map((cat) => (
//                                         <MenuItem key={cat._id} value={cat._id}>
//                                             {cat.name}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                                 {touched.category_id && errors.category_id ? (
//                                     <FormHelperText>{errors.category_id}</FormHelperText>
//                                 ) : null}
//                             </FormControl>

//                             <FormControl fullWidth margin="dense" error={touched.subcategory_id && Boolean(errors.subcategory_id)}>
//                                 <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
//                                 <Select
//                                     labelId="subcategory-select-label"
//                                     id="subcategory-select"
//                                     name="subcategory_id"
//                                     value={values.subcategory_id}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 >
//                                     {
//                                         subcategories?.filter((v) => v.category_id === values.category_id)?.map((v) => (
//                                             <MenuItem key={v._id} value={v._id}>
//                                                 {v.name}
//                                             </MenuItem>
//                                         ))
//                                     }
//                                 </Select>
//                                 {touched.subcategory_id && errors.subcategory_id ? (
//                                     <FormHelperText>{errors.subcategory_id}</FormHelperText>
//                                 ) : null}
//                             </FormControl>
//                             <FormControl fullWidth margin="dense" error={touched.product_id && Boolean(errors.product_id)}>
//                                 <InputLabel id="product-select-label">Product</InputLabel>
//                                 <Select
//                                     labelId="product-select-label"
//                                     id="product-select"
//                                     name="product_id"
//                                     value={values.product_id}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 >
//                                     {
//                                         products?.filter((v) => v.subcategory_id === values.subcategory_id)
//                                             ?.map((v) => (
//                                                 <MenuItem key={v._id} value={v._id}>
//                                                     {v.name}
//                                                 </MenuItem>
//                                             ))
//                                     }
//                                 </Select>
//                                 {touched.product_id && errors.product_id ? (
//                                     <FormHelperText>{errors.product_id}</FormHelperText>
//                                 ) : null}
//                             </FormControl>

//                             <div>
//                                 {dynamicFields.map((field, index) => (
//                                     <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
//                                         <TextField
//                                             margin="dense"
//                                             id={`additionalFields[${index}].key`}
//                                             name={`additionalFields[${index}].key`}
//                                             label="Key"
//                                             type="text"
//                                             fullWidth
//                                             variant="outlined"
//                                             onChange={handleDynamicFieldChange(index, 'key')}
//                                             value={field.key}
//                                         />
//                                         <TextField
//                                             margin="dense"
//                                             id={`additionalFields[${index}].value`}
//                                             name={`additionalFields[${index}].value`}
//                                             label="Value"
//                                             type="text"
//                                             fullWidth
//                                             variant="outlined"
//                                             onChange={handleDynamicFieldChange(index, 'value')}
//                                             value={field.value}
//                                         />
//                                         <IconButton onClick={() => removeField(index)}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </div>
//                                 ))}
//                                 <Button variant="outlined" onClick={addField} style={{ marginTop: '20px' }}>
//                                     Add Field
//                                 </Button>
//                             </div>

//                             <input
//                                 id='variants_image'
//                                 name='variants_image'
//                                 type='file'
//                                 onChange={handleFileChange}
//                             />
//                             {
//                                 values.variants_image &&
//                                 <img src={values.variants_image.url ? values.variants_image.url : URL.createObjectURL(values.variants_image)} width="50" height="50" />
//                             }

//                             {errors.variants_image && touched.variants_image && <span style={{ color: 'red' }}>{errors.variants_image}</span>}

//                             <TextField
//                                 margin="dense"
//                                 id="price"
//                                 name="price"
//                                 label="Price"
//                                 type="number"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.price}
//                                 error={errors.price && touched.price ? true : false}
//                                 helperText={errors.price && touched.price ? errors.price : ''}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="stock"
//                                 name="stock"
//                                 label="Stock"
//                                 type="text"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.stock}
//                                 error={errors.stock && touched.stock ? true : false}
//                                 helperText={errors.stock && touched.stock ? errors.stock : ''}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="discount"
//                                 name="discount"
//                                 label="Discount"
//                                 type="text"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.discount}
//                                 error={errors.discount && touched.discount ? true : false}
//                                 helperText={errors.discount && touched.discount ? errors.discount : ''}
//                             />

//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={handleClose} color="secondary">
//                                 Cancel
//                             </Button>
//                             <Button type="submit" variant="contained" color="primary">
//                                 {update ? 'Update' : 'Add'}
//                             </Button>
//                         </DialogActions>
//                     </form>
//                 </Dialog>
//                 <div style={{ height: 400, width: '100%' }}>
//                     <DataGrid
//                         getRowId={(row) => row._id}
//                         rows={variants}
//                         columns={columns}
//                         pageSize={5}
//                         rowsPerPageOptions={[5, 10, 20]}
//                         checkboxSelection
//                         disableSelectionOnClick
//                     />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Variants;


import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, IconButton,
    FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import { object, string, boolean, mixed } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getSubData } from '../../../redux/slice/subcategory.slice';
import { getCategories } from '../../../redux/action/category.action';
import { getProducts } from '../../../redux/action/products.action';
import { addVariant, deleteVariant, editVariant, getVariant } from '../../../redux/action/variants.action';

function Variants() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products || []);
    const categories = useSelector((state) => state.categories.categories || []);
    const subcategories = useSelector((state) => state.subcategories.subcategories || []);
    const variants = useSelector((state) => state.variant.variant || []);

    useEffect(() => {
        dispatch(getVariant());
        dispatch(getProducts());
        dispatch(getCategories());
        dispatch(getSubData());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        setDynamicFields([]);
        formik.resetForm();
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.attributes || {}).map(([key, value]) => ({ key, value })),
        });
        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
    };

    const handleDelete = (id) => {
        dispatch(deleteVariant(id));
    };

    const variantSchema = object({
        category_id: string().required('Category is required'),
        subcategory_id: string().required('Subcategory is required'),
        product_id: string().required('Product is required'),
        price: string().required('Please enter price'),
        stock: string().required('Please enter stock'),
        discount: string().required('Please enter discount'),
        is_active: boolean(),
        variants_image: mixed()
            .required("Please select an image")
            .test("fileSize", "The file is too large", (value) => {
                if (value.size) {
                    return value && value.size <= 2 * 1024 * 1024;
                }
                return true;
            })
            .test("fileType", "Unsupported File Format", (value) => {
                if (value.type) {
                    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                }
                return true;
            })
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            product_id: '',
            price: '',
            stock: '',
            discount: '',
            additionalFields: [],
            is_active: true,
            variants_image: '',
        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            const attributes = {
                ...values.additionalFields.reduce((acc, field) => {
                    acc[field.key] = field.value;
                    return acc;
                }, {}),
            };

            const variantData = {
                ...values,
                attributes,
            };

            if (update) {
                dispatch(editVariant(variantData));
            } else {
                dispatch(addVariant(variantData));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleFileChange = (event) => {
        setFieldValue("variants_image", event.currentTarget.files[0]);
    };

    const columns = [
        {
            field: "variants_image",
            headerName: "Variants Image",
            width: 150,
            renderCell: ({ row }) => (
                row.variants_image?.url ? <img src={row.variants_image.url} width="50" height="50" alt="Variant" /> : 'No Image'
            ),
        },
        {
            field: 'category_id', headerName: 'Category', width: 150,
            renderCell: (params) => {
                const category = categories.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'SubCategory', width: 150,
            renderCell: (params) => {
                const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'product_id', headerName: 'Product', width: 150,
            renderCell: (params) => {
                const product = products.find((v) => v._id === params.row.product_id);
                return product ? product.name : '';
            }
        },
        {
            field: 'attributes', headerName: 'Attributes', width: 400,
            renderCell: (params) => {
                const attributes = params.row.attributes;
                return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        { field: 'price', headerName: 'Price', width: 160 },
        { field: 'stock', headerName: 'Stock', width: 160 },
        { field: 'discount', headerName: 'Discount', width: 160 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => handleDelete(params.row._id)}
                        startIcon={<DeleteIcon />}
                    />
                    <Button
                        onClick={() => handleEdit(params.row)}
                        startIcon={<EditIcon />}
                    />
                </>
            ),
        },
    ];

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Variant
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{update ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent sx={{ minWidth: 500 }}>
                            <FormControl fullWidth margin="dense" error={touched.category_id && Boolean(errors.category_id)}>
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories?.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.category_id && errors.category_id ? (
                                    <FormHelperText>{errors.category_id}</FormHelperText>
                                ) : null}
                            </FormControl>

                            <FormControl fullWidth margin="dense" error={touched.subcategory_id && Boolean(errors.subcategory_id)}>
                                <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    name="subcategory_id"
                                    value={values.subcategory_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        subcategories?.filter((v) => v.category_id === values.category_id)?.map((v) => (
                                            <MenuItem key={v._id} value={v._id}>
                                                {v.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {touched.subcategory_id && errors.subcategory_id ? (
                                    <FormHelperText>{errors.subcategory_id}</FormHelperText>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense" error={touched.product_id && Boolean(errors.product_id)}>
                                <InputLabel id="product-select-label">Product</InputLabel>
                                <Select
                                    labelId="product-select-label"
                                    id="product-select"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        products?.filter((v) => v.subcategory_id === values.subcategory_id)
                                            ?.map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.product_id && errors.product_id ? (
                                    <FormHelperText>{errors.product_id}</FormHelperText>
                                ) : null}
                            </FormControl>

                            <div>
                                {dynamicFields.map((field, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${index}].key`}
                                            name={`additionalFields[${index}].key`}
                                            label="Key"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            onChange={handleDynamicFieldChange(index, 'key')}
                                            value={field.key}
                                        />
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${index}].value`}
                                            name={`additionalFields[${index}].value`}
                                            label="Value"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            onChange={handleDynamicFieldChange(index, 'value')}
                                            value={field.value}
                                        />
                                        <IconButton onClick={() => removeField(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addField} style={{ marginTop: '20px' }}>
                                    Add Field
                                </Button>
                            </div>

                            <input
                                id='variants_image'
                                name='variants_image'
                                type='file'
                                onChange={handleFileChange}
                            />
                            {
                                values.variants_image &&
                                <img src={values.variants_image.url ? values.variants_image.url : URL.createObjectURL(values.variants_image)} width="50" height="50" alt="Variant" />
                            }

                            {errors.variants_image && touched.variants_image && <span style={{ color: 'red' }}>{errors.variants_image}</span>}

                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={errors.price && touched.price ? true : false}
                                helperText={errors.price && touched.price ? errors.price : ''}
                            />
                            <TextField
                                margin="dense"
                                id="stock"
                                name="stock"
                                label="Stock"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stock}
                                error={errors.stock && touched.stock ? true : false}
                                helperText={errors.stock && touched.stock ? errors.stock : ''}
                            />
                            <TextField
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="Discount"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discount}
                                error={errors.discount && touched.discount ? true : false}
                                helperText={errors.discount && touched.discount ? errors.discount : ''}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={variants}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
}

export default Variants;

