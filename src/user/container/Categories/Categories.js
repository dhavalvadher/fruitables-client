// import React from 'react';
// import Category from '../../../admin/container/Category/Category';


// function Categories() {
//   return (
//     <nav>
//       <ul>
//         <li><a href="/">Home</a></li>
//         <li>
//           <a href="#">Categories</a>
//           <ul className="dropdown">
//             <li><a href="#">Subcategory 1</a></li>
//             <li><a href="#">Subcategory 2</a></li>
//             {/* Add the Category component under the dropdown */}
//             <li><Category /></li>
//           </ul>
//         </li>
    
//       </ul>
//     </nav>
//   );
// }

// export default Categories;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCategories } from '../../../redux/action/category.action';
// import { getSubData } from '../../../redux/slice/subcategory.slice';
// // import { getProducts } from '../../../redux/action/products.action';
// import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// import { getProducts } from '../../../redux/action/products.action';

// function Categories() {
//   const dispatch = useDispatch();
//   const categories = useSelector(state => state.categories.categories);
//   const subcategories = useSelector(state => state.subcategories.subcategories);
//   const products = useSelector(state => state.products.products);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubcategory, setSelectedSubcategory] = useState('');

//   useEffect(() => {
//     dispatch(getCategories());
//     dispatch(getSubData());
//     dispatch(getProducts());
//   }, [dispatch]);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//     setSelectedSubcategory('');
//   };

//   const handleSubcategoryChange = (event) => {
//     setSelectedSubcategory(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl fullWidth margin="dense">
//         <InputLabel id="category-label">Select Category</InputLabel>
//         <Select
//           labelId="category-label"
//           id="category"
//           value={selectedCategory}
//           label="Category"
//           onChange={handleCategoryChange}
//         >
//           {categories.map(category => (
//             <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {selectedCategory && (
//         <FormControl fullWidth margin="dense">
//           <InputLabel id="subcategory-label">Select Subcategory</InputLabel>
//           <Select
//             labelId="subcategory-label"
//             id="subcategory"
//             value={selectedSubcategory}
//             label="Subcategory"
//             onChange={handleSubcategoryChange}
//           >
//             {subcategories.filter(subcategory => subcategory.category_id === selectedCategory).map(subcategory => (
//               <MenuItem key={subcategory._id} value={subcategory._id}>{subcategory.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       {selectedSubcategory && (
//         <FormControl fullWidth margin="dense">
//           <InputLabel id="product-label">Select Product</InputLabel>
//           <Select
//             labelId="product-label"
//             id="product"
//             // value={selectedProduct}
//             label="Product"
//             // onChange={handleProductChange}
//           >
//             {products.filter(product => product.subcategory_id === selectedSubcategory).map(product => (
//               <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}
//     </div>
//   );
// }

// export default Categories;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subcategory.slice';
import { getProducts } from '../../../redux/action/products.action';
// import { getCategories } from './redux/actions/categoryActions';
// import { getSubcategories } from './redux/actions/subcategoryActions';
// import { getProducts } from './redux/actions/productActions';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subcategories);
  const products = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    dispatch(getSubData(categoryId));
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSelectedSubcategory(subcategoryId);
    dispatch(getProducts(subcategoryId));
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      {selectedCategory && (
        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
          <option value="">Select Subcategory</option>
          {subcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
          ))}
        </select>
      )}

      {selectedSubcategory && (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
