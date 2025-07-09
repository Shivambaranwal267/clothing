import React, { useContext } from "react";
import Layout from "../common/Layout";
import { apiUrl } from "../common/http";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

const Login = () => {
  const { login } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === 200) {
        const adminInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };

        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        login(adminInfo);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <div className="card shadow border-0 login">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="card-body p-4">
              <h3 className="text-center">Admin Panel Login</h3>
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
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  placeholder="admin@example.com"
                />
                {errors.email &&
                  <p className="invalid-feedback">
                    {errors.email?.message}
                  </p>
                }
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
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password.message}</p>
                )}
                 {/* <span className="">forget password?</span> */}
              </div>
              <div className="d-flex justify-content-center">
                 <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
                
              </button>
             

              </div>

             
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;