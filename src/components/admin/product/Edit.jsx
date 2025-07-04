import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/products/${params.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);

          setProductImages(result.data.product_images);
          setSizesChecked(result.productSizes);
          reset({
            title: result.data.title,
            category: result.data.category_id,
            brand: result.data.brand_id,
            sku: result.data.sku,
            qty: result.data.qty,
            short_description: result.data.short_description,
            description: result.data.description,
            price: result.data.price,
            compare_price: result.data.compare_price,
            barcode: result.data.barcode,
            status: result.data.status,
            is_featured: result.data.is_featured,
          });
        });

      // setContent(result.data.description); // Set initial description
    },
  });

  // const saveProduct = async (data) => {
  //   const formData = { ...data, description: content };

  //   setDisable(true);
  //   console.log(data);

  //   const res = await fetch(`${apiUrl}/products/${params.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${adminToken()}`,
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setDisable(false);
  //       if (result.status == 200) {
  //         toast.success(result.message);
  //         navigate("/admin/products");
  //       } else {
  //         const formErrors = result.errors;
  //         Object.keys(formErrors).forEach((field) => {
  //           setError(field, { message: formErrors[field][0] });
  //         });
  //       }
  //     });
  // };

  const saveProduct = async (data) => {
  try {
    if (!params.id) {
      toast.error("Invalid product ID");
      return;
    }

    const formData = { ...data, description: content, sizes: sizesChecked };
    console.log("Sending Form Data:", formData);
    console.log("SKU Sent:", formData.sku);
    console.log("API URL:", `${apiUrl}/products/${params.id}`);
    console.log("Token:", adminToken());

    setDisable(true);

    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    });

    console.log("Response Status:", res.status);
    const result = await res.json();
    console.log("Response Body:", result);

    setDisable(false);

    if (res.status === 200) {
      toast.success(result.message || "Product updated successfully");
      // Verify SKU after update
      const updatedRes = await fetch(`${apiUrl}/products/${params.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      const updatedResult = await updatedRes.json();
      console.log("Updated SKU:", updatedResult.data.sku);
      navigate("/admin/products");
    } else {
      if (result.errors) {
        Object.keys(result.errors).forEach((field) => {
          setError(field, { message: result.errors[field][0] });
        });
      } else {
        toast.error(result.message || "Failed to update product");
      }
    }
  } catch (error) {
    setDisable(false);
    console.error("Fetch Error:", error);
    toast.error("An error occurred while updating the product");
  }
};

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCategories(result.data);
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBrands(result.data);
      });
  };

  const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSizes(result.data);
      });
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    formData.append("product_id", params.id); // Add this line using the product ID from useParams
    setDisable(true);

    const res = await fetch(`${apiUrl}/save-product-image`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          productImages.push(result.data);
          setProductImages(productImages);
        } else {
          toast.error(result.errors.image[0]);
        }
        setDisable(false);
        e.target.value = "";
      });
  };

  const changeImage = async (image) => {
    const res = await fetch(
      `${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result);
          console.log(result);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const deleteImage = async (id) => {
    if (confirm("Are you sure you want to delete image?")) {
      const res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status == 200) {
            const newProductImages = productImages.filter(
              (productImages) => productImages.id != id
            );
            setProductImages(newProductImages);
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Edit</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Title
                    </label>
                    <input
                      {...register("title", {
                        required: "The title field is required", // Fixed typo
                      })}
                      type="text"
                      id="title"
                      className={`form-control ${errors.title && "is-invalid"}`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title?.message}
                      </p>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Category
                        </label>
                        <select
                          {...register("category", {
                            required: "Please Select a Category",
                          })}
                          className={`form-control ${
                            errors.category && "is-invalid"
                          }`}
                        >
                          <option value="">Select a Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option
                                  key={`category-${category.id}`}
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Brand
                        </label>
                        <select {...register("brand")} className="form-control">
                          <option value="">Select a Brand</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option
                                  key={`category-${brand.id}`}
                                  value={brand.id}
                                >
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>

                    <textarea
                      {...register("short_description")}
                      className="form-control"
                      placeholder="Short Description"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          {...register("price", {
                            required: "The Price field is required",
                          })}
                          className={`form-control ${
                            errors.price && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Price"
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Compare Price
                        </label>
                        <input
                          {...register("compare_price")}
                          type="text"
                          placeholder="Compare Price"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>

                        <input
                          {...register("sku", {
                            required: "The Sku field is required",
                          })}
                          type="text"
                          placeholder="Sku"
                          className={`form-control ${
                            errors.sku && "is-invalid"
                          }`}
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                          {...register("barcode")}
                          type="text"
                          placeholder="Barcode"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Qty
                        </label>
                        <input
                          {...register("qty")}
                          type="text"
                          placeholder="Qty"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          Status
                        </label>
                        <select
                          {...register("status", {
                            required: "Please select a status",
                          })}
                          id="status"
                          className={`form-control ${
                            errors.status && "is-invalid"
                          }`}
                        >
                          <option value="">Select a Status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {errors.status?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Featured
                      </label>
                      <select
                        {...register("is_featured", {
                          required: "This field is required",
                        })}
                        id="status"
                        className={`form-control ${
                          errors.is_featured && "is-invalid"
                        }`}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {errors.status && (
                        <p className="invalid-feedback">
                          {errors.status?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Sizes
                      </label>

                      {sizes &&
                        sizes.map((size) => {
                          return (
                            <div
                              className="form-check-inline ps-2"
                              key={`psize-${size.id}`}
                            >
                              <input
                                {...register("sizes")}
                                checked={sizesChecked.includes(size.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSizesChecked([...sizesChecked, size.id]);
                                  } else {
                                    setSizesChecked(
                                      sizesChecked.filter(
                                        (sid) => size.id != sid
                                      )
                                    );
                                  }
                                }}
                                className="form-check-input"
                                type="checkbox"
                                value={size.id}
                                id={`size-${size.id}`}
                              />
                              <label
                                className="form-check-label ps-2"
                                htmlFor="{`size-${size.id}`}"
                              >
                                {size.name}
                              </label>
                            </div>
                          );
                        })}
                    </div>

                    <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <input
                        onChange={handleFile}
                        type="file"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      {productImages &&
                        productImages.map((productImage, index) => {
                          return (
                            <div className="col-md-3" key={`image-${index}`}>
                              <div className="card shadow">
                                <img
                                  className="w-100"
                                  src={productImage.image_url}
                                  alt=""
                                />
                              </div>
                              <button
                                type="button"
                                className=" w-100 btn btn-danger mt-3"
                                onClick={() => deleteImage(productImage.id)}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className=" w-100 btn btn-secondary mt-3"
                                onClick={() => changeImage(productImage.image)}
                              >
                                Set as Default
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 mb-5"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
