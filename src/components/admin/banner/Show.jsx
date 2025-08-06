// import React, { useState, useEffect } from "react";
// import Layout from "../../common/Layout";
// import Sidebar from "../../common/Sidebar";
// import { apiUrl } from "../../common/http";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import Loader from "../../common/Loader";
// import Nostate from "../../common/Nostate";
// import { toast } from "react-toastify";

// const Show = () => {
//   const [banner, setBanner] = useState([]);
//   const [loader, setLoader] = useState(false);

//   const fetchOrders = async () => {
//     setLoader(true);
//     const res = await fetch(`${apiUrl}/admin/banner`, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setLoader(false);

//         if (result.status == 200) {
//           setBanner(result.data);
//           console.log("banner data", result.data);
//         } else {
//           console.log("Something went wrong");
//         }
//       });
//   };

//   const deleteBanner = async (id) => {
//     if (confirm("Are you sure you want to delete ")) {
//       const res = await fetch(`${apiUrl}/admin/banner/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-type": "application/json",
//           Accept: "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           if (result.status == 200) {
//             const newBanner = banner.filter((banner) => banner.id != id);
//             setBanner(newBanner);
//             toast.success(result.message);
//           } else {
//             console.log("Something went wrong");
//           }
//         });
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);
//   return (
//     <Layout>
//       <div className="container">
//         <div className="row">
//           <div className="d-flex justify-content-between mt-5 pb-3">
//             <h4 className="h4 pb-0 mb-0">banner</h4>
//             <Link to="/admin/banner/create" className="btn btn-primary">
//               Create
//             </Link>
//           </div>
//           <div className="col-md-3">
//             <Sidebar />
//           </div>
//           <div className="col-md-9">
//             <div className="card shadow">
//               <div className="card-body p-4">
//                 {loader == true && <Loader />}
//                 {loader == false && banner.length == 0 && (
//                   <Nostate text="Banner not found" />
//                 )}

//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <td width="50">ID</td>
//                       <td>Name</td>
//                       <td width="100">image</td>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {banner.map((image, id) => {
//                       return (
//                         <tr key={id}>
//                           <td width="50">{id + 1}</td>
//                           <td>{image.description}</td>
//                           <td>
//                             <img src={image.imageUrl} width="100px" />
//                           </td>
//                           <td>
//                             <Link
//                               to={`/admin/banner/edit/${image.id}`}
//                               className="text-primary"
//                             >
//                               <svg
//                                 stroke="currentColor"
//                                 fill="currentColor"
//                                 strokeWidth="0"
//                                 viewBox="0 0 512 512"
//                                 height="1em"
//                                 width="1em"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
//                               </svg>
//                             </Link>
//                             <Link
//                               to=""
//                               className="text-danger ms-2"
//                               onClick={() => deleteBanner(image.id)}
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="18"
//                                 height="18"
//                                 fill="currentColor"
//                                 className="bi bi-trash3"
//                                 viewBox="0 0 16 16"
//                               >
//                                 <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                               </svg>
//                             </Link>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Show;

import React, { useState, useEffect } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { apiUrl } from "../../common/http";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import Nostate from "../../common/Nostate";
import { toast } from "react-toastify";

const Show = () => {
  const [banner, setBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/admin/banner`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.status === 200) {
        setBanner(result.data);
        console.log("Banner data fetched successfully:", result.data);
      } else {
        throw new Error(result.message || "Failed to fetch banners");
      }
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError(err.message);
      toast.error("Failed to load banners. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBanner = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/admin/banner/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (response.ok && result.status === 200) {
          setBanner((prevBanners) => prevBanners.filter((banner) => banner.id !== id));
          toast.success(result.message || "Banner deleted successfully");
        } else {
          throw new Error(result.message || "Failed to delete banner");
        }
      } catch (err) {
        console.error("Error deleting banner:", err);
        toast.error("Failed to delete banner. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Banners</h4>
            <Link to="/admin/banner/create" className="btn btn-primary">
              Create
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {isLoading && <Loader />}
                {!isLoading && error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                {!isLoading && !error && banner.length === 0 && (
                  <Nostate text="No banners found" />
                )}
                {!isLoading && !error && banner.length > 0 && (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th width="50">ID</th>
                        <th>Name</th>
                        <th width="100">Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banner.map((image, index) => (
                        <tr key={image.id}>
                          <td width="50">{index + 1}</td>
                          <td>{image.description}</td>
                          <td>
                            <img
                              src={image.imageUrl}
                              alt={image.description}
                              width="100"
                              onError={(e) =>
                                (e.target.src = "/path/to/fallback-image.jpg")
                              }
                            />
                          </td>
                          <td>
                            <Link
                              to={`/admin/banner/edit/${image.id}`}
                              className="text-primary me-2"
                            >
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                              </svg>
                            </Link>
                            <button
                              className="text-danger border-0 bg-transparent"
                              onClick={() => deleteBanner(image.id)}
                              disabled={isLoading}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;