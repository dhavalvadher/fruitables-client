import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slice/cart.slice';
import { getProducts } from '../../../redux/action/products.action';
import { getshop } from '../../../redux/action/shop.action';

function Shop(props) {
  const products = useSelector(state => state.products);
  console.log(products);


  const dispatch = useDispatch();

  const location = useLocation();
  const { subcategory_id } = location.state || {};

  useEffect(() => {
    dispatch(getshop());
    dispatch(getProducts());
  }, [dispatch]);

  const handleProduct = (id) => {
    dispatch(addToCart({ id, count: 1 }));
  }

  // const filteredProducts = subcategory_id
  //   ? (products.products || []).filter((v) => v.subcategory_id === subcategory_id)
  //   : (products.products || []);

  const filteredProducts = subcategory_id ? products.products.filter((v) => v.subcategory_id === subcategory_id) : products.products;
  console.log(filteredProducts);
  
 

  return (
    <div>
      {/* Fruits Shop Start*/}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
                    <input
                      name='search'
                      type="search"
                      className="form-control p-3"
                      placeholder="keywords"
                      aria-describedby="search-icon-1" />
                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                  </div>
                </div>
                <div className="col-6" />
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                      <option value="volvo">Nothing</option>
                      <option value="saab">Popularity</option>
                      <option value="opel">Organic</option>
                      <option value="audi">Fantastic</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Apples</a>
                              <span>(3)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Oranges</a>
                              <span>(5)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Strawbery</a>
                              <span>(2)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Banana</a>
                              <span>(8)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#"><i className="fas fa-apple-alt me-2" />Pumpkin</a>
                              <span>(5)</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4 className="mb-2">Price</h4>
                        <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min={0} max={10} defaultValue={0} oninput="amount.value=rangeInput.value" />
                        <output id="amount" name="amount" min-value={0} max-value={10} htmlFor="rangeInput">0</output>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Additional</h4>
                        <div className="mb-2">
                          <input type="radio" className="me-2" id="Categories-1" name="Categories-1" defaultValue="Beverages" />
                          <label htmlFor="Categories-1"></label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h4 className="mb-3">Featured products</h4>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                          <img src="img/featur-1.jpg" className="img-fluid rounded" alt />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                          <img src="img/featur-2.jpg" className="img-fluid rounded" alt />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                          <img src="img/featur-3.jpg" className="img-fluid rounded" alt />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-4">
                        <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                        <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                          <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">

                    {filteredProducts.map((v) => (
                      <div className="col-md-6 col-lg-6 col-xl-4" key={v.id}>
                        {/* <Link to={`/Shop/${v.id}`}> */}
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-img">
                              <img src={v.product_image.url} className="img-fluid w-100 rounded-top" alt={v.name} />
                            </div>
                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}></div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>{v.name}</h4>
                              <p>{v.description}</p>
                              <p>{v.stock} / Pcs.</p>
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>
                                <Link to="#" onClick={() => handleProduct(v.id)} className="btn border border-secondary rounded-pill px-3 text-primary">
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </Link>
                              </div>
                            </div>
                          </div>
                        {/* </Link> */}
                      </div>
                    ))}
                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a href="#" className="rounded">«</a>
                        <a href="#" className="active rounded">1</a>
                        <a href="#" className="rounded">2</a>
                        <a href="#" className="rounded">3</a>
                        <a href="#" className="rounded">4</a>
                        <a href="#" className="rounded">5</a>
                        <a href="#" className="rounded">6</a>
                        <a href="#" className="rounded">»</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fruits Shop End*/}
    </div>
  );
}

export default Shop;

// import React, { useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../../redux/slice/cart.slice';
// import { getProducts } from '../../../redux/action/products.action';
// import { getshop } from '../../../redux/action/shop.action';

// function Shop() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { subcategory_id } = location.state || {};

//   const products = useSelector((state) => state.products.products || []);
  
//   useEffect(() => {
//     dispatch(getshop());
//     dispatch(getProducts());
//   }, [dispatch]);

//   const handleProduct = (id) => {
//     dispatch(addToCart({ id, count: 1 }));
//   };

//   const filteredProducts = subcategory_id
//     ? products.filter((v) => v.subcategory_id === subcategory_id)
//     : products;

//   return (
//     <div>
//       {/* Fruits Shop Start*/}
//       <div className="container-fluid fruite py-5">
//         <div className="container py-5">
//           <h1 className="mb-4">Fresh fruits shop</h1>
//           <div className="row g-4">
//             <div className="col-lg-12">
//               <div className="row g-4">
//                 <div className="col-xl-3">
//                   <div className="input-group w-100 mx-auto d-flex">
//                     <input
//                       name='search'
//                       type="search"
//                       className="form-control p-3"
//                       placeholder="keywords"
//                       aria-describedby="search-icon-1"
//                     />
//                     <span id="search-icon-1" className="input-group-text p-3">
//                       <i className="fa fa-search" />
//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-6" />
//                 <div className="col-xl-3">
//                   <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
//                     <label htmlFor="fruits">Default Sorting:</label>
//                     <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
//                       <option value="nothing">Nothing</option>
//                       <option value="popularity">Popularity</option>
//                       <option value="organic">Organic</option>
//                       <option value="fantastic">Fantastic</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="row g-4">
//                 <div className="col-lg-3">
//                   <div className="row g-4">
//                     <div className="col-lg-12">
//                       <div className="mb-3">
//                         <h4>Categories</h4>
//                         <ul className="list-unstyled fruite-categorie">
//                           {[
//                             { name: 'Apples', count: 3 },
//                             { name: 'Oranges', count: 5 },
//                             { name: 'Strawberries', count: 2 },
//                             { name: 'Banana', count: 8 },
//                             { name: 'Pumpkin', count: 5 },
//                           ].map((category, index) => (
//                             <li key={index}>
//                               <div className="d-flex justify-content-between fruite-name">
//                                 <a href="#"><i className="fas fa-apple-alt me-2" />{category.name}</a>
//                                 <span>({category.count})</span>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="mb-3">
//                         <h4 className="mb-2">Price</h4>
//                         <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min={0} max={10} defaultValue={0} oninput="amount.value=rangeInput.value" />
//                         <output id="amount" name="amount" min-value={0} max-value={10} htmlFor="rangeInput">0</output>
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="mb-3">
//                         <h4>Additional</h4>
//                         <div className="mb-2">
//                           <input type="radio" className="me-2" id="Categories-1" name="Categories-1" defaultValue="Beverages" />
//                           <label htmlFor="Categories-1"></label>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <h4 className="mb-3">Featured products</h4>
//                       {[
//                         { name: 'Big Banana', price: 2.99, oldPrice: 4.11, img: 'img/featur-1.jpg' },
//                         { name: 'Big Banana', price: 2.99, oldPrice: 4.11, img: 'img/featur-2.jpg' },
//                         { name: 'Big Banana', price: 2.99, oldPrice: 4.11, img: 'img/featur-3.jpg' },
//                       ].map((product, index) => (
//                         <div key={index} className="d-flex align-items-center justify-content-start mb-4">
//                           <div className="rounded me-4" style={{ width: 100, height: 100 }}>
//                             <img src={product.img} className="img-fluid rounded" alt={product.name} />
//                           </div>
//                           <div>
//                             <h6 className="mb-2">{product.name}</h6>
//                             <div className="d-flex mb-2">
//                               {[...Array(4)].map((_, i) => (
//                                 <i key={i} className="fa fa-star text-secondary" />
//                               ))}
//                               <i className="fa fa-star" />
//                             </div>
//                             <div className="d-flex mb-2">
//                               <h5 className="fw-bold me-2">${product.price} $</h5>
//                               <h5 className="text-danger text-decoration-line-through">${product.oldPrice} $</h5>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                       <div className="d-flex justify-content-center my-4">
//                         <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">View More</a>
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="position-relative">
//                         <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="Fresh Fruits Banner" />
//                         <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
//                           <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-9">
//                   <div className="row g-4 justify-content-center">
//                     {filteredProducts.map((v) => (
//                       <div className="col-md-6 col-lg-6 col-xl-4" key={v.id}>
//                         <div className="rounded position-relative fruite-item">
//                           <div className="fruite-img">
//                             <img src={v.product_image.url} className="img-fluid w-100 rounded-top" alt={v.name} />
//                           </div>
//                           <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}></div>
//                           <div className="p-4 border border-secondary border-top-0 rounded-bottom">
//                             <h4>{v.name}</h4>
//                             <p>{v.description}</p>
//                             <p>{v.stock} / Pcs.</p>
//                             <div className="d-flex justify-content-between flex-lg-wrap">
//                               <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>
//                               <Link to="#" onClick={() => handleProduct(v.id)} className="btn border border-secondary rounded-pill px-3 text-primary">
//                                 <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <div className="col-12">
//                       <div className="pagination d-flex justify-content-center mt-5">
//                         <a href="#" className="rounded">«</a>
//                         <a href="#" className="active rounded">1</a>
//                         <a href="#" className="rounded">2</a>
//                         <a href="#" className="rounded">3</a>
//                         <a href="#" className="rounded">4</a>
//                         <a href="#" className="rounded">5</a>
//                         <a href="#" className="rounded">6</a>
//                         <a href="#" className="rounded">»</a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Fruits Shop End*/}
//     </div>
//   );
// }

// export default Shop;
