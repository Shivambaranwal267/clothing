import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { apiUrl, adminToken } from "../common/http";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchUsers = async () => {
    await fetch(`${apiUrl}/all-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setUsers(result.total_users);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const fetchOrders = async () => {
    await fetch(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setProducts(result.total_product);
          console.log(result.total_product);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const fetchProducts = async () => {
    await fetch(`${apiUrl}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setOrders(result.total_orders);
          console.log(result.total_orders);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Dashboard</h4>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h2>{users}</h2>

                    <span>Users</span>
                  </div>
                  <div className="card-footer">
                    <a href="#">View Users</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h2>{orders}</h2>
                    <span>Orders</span>
                  </div>
                  <div className="card-footer">
                    <a href="#">View Orders</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h2>{products}</h2>
                    <span>Products</span>
                  </div>
                  <div className="card-footer">
                    <a href="#">View Products</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
