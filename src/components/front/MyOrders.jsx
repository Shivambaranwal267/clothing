import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import UserSidebar from "../common/UserSidebar";
import { userToken, apiUrl } from "../common/http";
import Nostate from "../common/Nostate";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchOrders = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/get-orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        console.log(result);

        if (result.status == 200) {
          setOrders(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">My Orders</h4>
            {/* <Link to="" className="btn btn-primary">Button</Link> */}
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loader == true && <Loader />}
                {loader == false && orders.length == 0 && (
                  <Nostate text="Orders not found" />
                )}

                {orders && orders.length > 0 && (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        return (
                          <tr key={`order-${order.id}`}>
                            <td>
                              <Link to={`/account/orders/details/${order.id}`}>
                                {order.id}
                              </Link>
                            </td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>${order.grand_total}</td>
                            <td>{order.created_at}</td>
                            <td>
                              {order.payment_status == "paid" ? (
                                <span className="badge bg-success">Paid</span>
                              ) : (
                                <span className="badge bg-danger">
                                  Not Paid
                                </span>
                              )}
                            </td>
                            <td>
                              {order.status == "pending" && (
                                <span className="badge bg-warning">
                                  Pending
                                </span>
                              )}
                              {order.status == "shipped" && (
                                <span className="badge bg-warning">
                                  Shipped
                                </span>
                              )}
                              {order.status == "delivered" && (
                                <span className="badge bg-success">
                                  Delivered
                                </span>
                              )}
                              {order.status == "cancelled" && (
                                <span className="badge bg-danger">
                                  Cancelled
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
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

export default MyOrders;
