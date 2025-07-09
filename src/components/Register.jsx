import React from "react";
import Layout from "./common/Layout";
import { apiUrl } from "./common/http";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.status === 200) {
          toast.success(result.message);

          navigate("/account/login");
        } else {
          // toast.error(result.message || "Login failed");
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3 className=" border-bottom pb-2 mb-3 text-center">Register</h3>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: "The name field is required",
                  })}
                  type="text"
                  id="name"
                  className={`form-control ${errors.name && "is-invalid"}`}
                  placeholder="Enter your name..."
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.name?.message}</p>
                )}
              </div>

              <div className="mb-3">
                {/* Changed htmlFor to "email" and added id="email" to input */}
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The Email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  id="email" /* Added id attribute */
                  className={`form-control ${errors.email && "is-invalid"}`}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>

              <div className="mb-3">
                {/* Changed htmlFor to "password" and added id="password" to input */}
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "The Password field is required",
                  })}
                  type="password"
                  id="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password.message}</p>
                )}
                {/* <span className="">forget password?</span> */}
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "You have register..." : "Register"}
              </button>

              <div className="d-flex justify-content-center pt-4 pb-2">
                Already have an account? &nbsp;
                <Link to="/account/login">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
