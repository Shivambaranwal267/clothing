import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { apiUrl, adminToken } from "../../components/common/http";
import Loader from "../common/Loader";
import Nostate from "../common/Nostate";

const User = () => {
  const [user, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchUsers = async () => {
    setLoader(true);
    await fetch(`${apiUrl}/all-user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        console.log(result);

        if (result.status == 200) {
          setUsers(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Users</h4>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loader == true && <Loader />}
                {loader == false && user.length == 0 && (
                  <Nostate text="Users not found" />
                )}
                {user && user.length > 0 && (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((user) => {
                        return (
                          <tr key={`order-${user.id}`}>
                            <td>
                              <Link to={`/admin/user/${user.id}`}>
                                {user.id}
                              </Link>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            
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

export default User;
