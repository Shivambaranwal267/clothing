import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { adminToken, apiUrl } from "../common/http";

const ChangePassword = () => {
  const [disable, setDisable] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const changePassword = async (data) => {
    setDisable(true);

    const res = await fetch(`${apiUrl}/admin/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setDisable(false);

    if (result.status === 200) {
      toast.success(result.message);
      reset();
      navigate("/admin/dashboard");
    } else {
      toast.error(
        result.message || "An error occurred while changing the password."
      );
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Change Password</h4>
            <Link to="/admin/dashboard" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(changePassword)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3 position-relative">
                    <label htmlFor="current_password" className="form-label">
                      Current Password
                    </label>
                    <input
                      {...register("current_password", {
                        required: "The current password field is required",
                      })}
                      type={showCurrentPassword ? "text" : "password"}
                      id="current_password"
                      className={`form-control ${
                        errors.current_password && "is-invalid"
                      }`}
                      placeholder="Current Password"
                    />
                    <span
                      className="position-absolute end-0 top-50 pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                    {errors.current_password && (
                      <p className="invalid-feedback">
                        {errors.current_password?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3 position-relative">
                    <label htmlFor="new_password" className="form-label">
                      New Password
                    </label>
                    <input
                      {...register("new_password", {
                        required: "The new password field is required",
                        minLength: {
                          value: 8,
                          message:
                            "The new password must be at least 8 characters",
                        },
                      })}
                      type={showNewPassword ? "text" : "password"}
                      id="new_password"
                      className={`form-control ${
                        errors.new_password && "is-invalid"
                      }`}
                      placeholder="New Password"
                    />
                    <span
                      className="position-absolute end-0 top-50 pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                    {errors.new_password && (
                      <p className="invalid-feedback">
                        {errors.new_password?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3 position-relative">
                    <label
                      htmlFor="new_password_confirmation"
                      className="form-label"
                    >
                      Confirm New Password
                    </label>
                    <input
                      {...register("new_password_confirmation", {
                        required: "The confirm new password field is required",
                        validate: (value, { new_password }) =>
                          value === new_password ||
                          "The passwords do not match",
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      id="new_password_confirmation"
                      className={`form-control ${
                        errors.new_password_confirmation && "is-invalid"
                      }`}
                      placeholder="Confirm New Password"
                    />
                    <span
                      className="position-absolute end-0 top-50  pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                    {errors.new_password_confirmation && (
                      <p className="invalid-feedback">
                        {errors.new_password_confirmation?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
