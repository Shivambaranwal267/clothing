import React, { useContext } from "react";
import Layout from "./common/Layout";
import { apiUrl } from "./common/http";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {

        if (result.status === 200) {
         const userInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        login(userInfo);
        toast.success("Login successful!");
        navigate("/account");
        } else {
          toast.error(result.message || "Login failed");
          
        }
      });
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3 className=" border-bottom pb-2 mb-3 text-center">Login</h3>

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
                {isSubmitting ? "logging..." : "Login"}
              </button>

              <div className="d-flex justify-content-center pt-4 pb-2">
                Don't have an account? &nbsp;
                <Link to="/account/register">Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
