import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { apiUrl } from "../common/http";
import { CartContext } from "../context/Cart";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { getQty } = useContext(CartContext);

  const fetchCategories = () => {
    fetch(`${apiUrl}/get-categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setCategories(result.data);
        } else {
          console.log("Something went wrong");
        }
        // console.log(result);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header className="shadow">
      <div className="bg-dark text-center py-3">
        <span className="text-white">Shopping</span>
      </div>

      <div className="container">
        <Navbar expand="lg" className="">
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" width={170} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              {categories &&
                categories.map((category) => {
                  return (
                    <Nav.Link
                      key={`cat=${category.id}`}
                      href={`/shop?category=${category.id}`}
                    >
                      {category.name}
                    </Nav.Link>
                  );
                })}
            </Nav>

            <div className="nav-right d-flex">
              <Link to="/account" className="ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                </svg>
              </Link>

              <Link to="/cart" className="ms-3 cart-bucket">
                <span>{getQty()}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="28"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                </svg>
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
