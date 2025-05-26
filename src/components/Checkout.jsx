import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/Mens/seven.jpg";
import { useState } from "react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">
              <strong>Billing Details</strong>
            </h3>
            <form action="">
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    name=""
                    id=""
                    className="form-control"
                    rows={3}
                    placeholder="Address"
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-5">
            <h3 className="border-bottom pb-3">
              <strong>items</strong>
            </h3>
            <table className="table">
              <tbody>
                <tr>
                  <td className="" width={100}>
                    <img src={ProductImg} alt="prdImg" width={80} />
                  </td>
                  <td width={600}>
                    <h4>Dummy Product title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">S</button>
                      </div>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="" width={100}>
                    <img src={ProductImg} alt="prdImg" width={80} />
                  </td>
                  <td width={600}>
                    <h4>Dummy Product title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">S</button>
                      </div>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="row ">
              <div className="col-md-12">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <div className="">Subtotal</div>
                  <div className="">$20</div>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <div className="">Shipping</div>
                  <div className="">$5</div>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <div className="">
                    <strong>Grant Total</strong>
                  </div>
                  <div className="">$25</div>
                </div>
              </div>
            </div>

            <h3 className="border-bottom pt-4 pb-3">
              <strong>Payment Method</strong>
            </h3>

            <div className="pt-2">
              <input
                type="radio"
                onClick={handlePaymentMethod}
                checked={paymentMethod == "stripe"}
                value={"stripe"}
              />
              <label htmlFor="" className="form-label ps-2">
                Stripe
              </label>

              <input
                type="radio"
                onClick={handlePaymentMethod}
                checked={paymentMethod == "cod"}
                value={"cod"}
                className="ms-3"
              />
              <label htmlFor="" className="form-label ps-2">
                COD
              </label>
            </div>

            <div className="d-flex py-3">
              <button className="btn btn-primary">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
