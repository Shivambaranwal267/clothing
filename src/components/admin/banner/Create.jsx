// import React, { useState } from "react";
// import Layout from "../../common/Layout";
// import Sidebar from "../../common/Sidebar";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { apiUrl } from "../../common/http";
// import { toast } from "react-toastify";

// const Create = () => {
//   const [disable, setDisable] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const saveBanner = async (data) => {
//     setDisable(true);
//     console.log(data);

//     const res = await fetch(`${apiUrl}/admin/banner`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setDisable(false);
//         if (result.status == 200) {
          
            
//           toast.success(result.message);
//           navigate("/admin/banner/show");
//         } else {
//           console.log("Something went wrong");
//         }
//       });
//   };

//   return (
//     <Layout>
//       <div className="container">
//         <div className="row">
//           <div className="d-flex justify-content-between mt-5 pb-3">
//             <h4 className="h4 pb-0 mb-0">Banner / Create</h4>
//             <Link to="/admin/brands" className="btn btn-primary">
//               Back
//             </Link>
//           </div>
//           <div className="col-md-3">
//             <Sidebar />
//           </div>
//           <div className="col-md-9">
//             <form onSubmit={handleSubmit(saveBanner)}>
//               <div className="card shadow">
//                 <div className="card-body p-4">
//                   <div className="mb-3">
//                     <label htmlFor="image" className="form-label">
//                       Image
//                     </label>
//                     <input
//                       {...register("image", {
//                         required: "The image field is required", // Fixed typo
//                       })}
//                       type="file"
//                       id="image"
//                       className={`form-control ${errors.image && "is-invalid"}`}
                      
//                     />
//                     {errors.image && (
//                       <p className="invalid-feedback">{errors.image?.message}</p>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="description" className="form-label">
//                       Description
//                     </label>
//                     <input
//                       {...register("description", {
//                         required: "The description field is required", // Fixed typo
//                       })}
//                       type="text"
//                       id="image"
//                       className={`form-control ${errors.description && "is-invalid"}`}
                      
//                     />
//                     {errors.description && (
//                       <p className="invalid-feedback">{errors.description?.message}</p>
//                     )}
//                   </div>
                 
//                   <div className="mb-3">
//                     <label htmlFor="link" className="form-label">
//                       Link
//                     </label>
//                     <input
//                       {...register("link", {
//                         required: "The Link field is required", // Fixed typo
//                       })}
//                       type="text"
//                       id="link"
//                       className={`form-control ${errors.link && "is-invalid"}`}
                      
//                     />
//                     {errors.link && (
//                       <p className="invalid-feedback">{errors.link?.message}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 disabled={disable}
//                 type="submit"
//                 className="btn btn-primary mt-3"
//               >
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Create;
import React, { useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Create = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveBanner = async (data) => {
    setDisable(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("description", data.description);
    formData.append("link", data.link);

    try {
      const res = await fetch(`${apiUrl}/admin/banner`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setDisable(false);
      if (result.status === true) {
        toast.success(result.message);
        navigate("/admin/banner/show");
      } else {
        toast.error(result.message || "Failed to create banner");
      }
    } catch (error) {
      setDisable(false);
      console.error("Error:", error);
      toast.error("An error occurred while creating the banner");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Banner / Create</h4>
            <Link to="/admin/banner/show" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveBanner)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input
                      {...register("image", {
                        required: "The image field is required",
                        validate: {
                          fileType: (files) =>
                            files[0]?.type.includes("image") || "Only image files are allowed",
                          fileSize: (files) =>
                            (files[0]?.size < 5 * 1024 * 1024) || "File size must be less than 5MB",
                        },
                      })}
                      type="file"
                      id="image"
                      accept="image/*"
                      className={`form-control ${errors.image && "is-invalid"}`}
                    />
                    {errors.image && (
                      <p className="invalid-feedback">{errors.image?.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      {...register("description", {
                        required: "The description field is required",
                      })}
                      type="text"
                      id="description"
                      className={`form-control ${errors.description && "is-invalid"}`}
                    />
                    {errors.description &&  (
                      <p className="invalid-feedback">{errors.description?.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="link" className="form-label">
                      Link
                    </label>
                    <input
                      {...register("link", {
                        required: "The link field is required",
                      })}
                      type="text"
                      id="link"
                      className={`form-control ${errors.link && "is-invalid"}`}
                    />
                    {errors.link && (
                      <p className="invalid-feedback">{errors.link?.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                {disable ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;