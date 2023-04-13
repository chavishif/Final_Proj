import React, { useEffect, useState } from "react";
import { Navbar, Button, Link, Text, Card, Radio, Input } from "@nextui-org/react";
import { ShoppingCart, Heart, User } from "react-feather";
import { Outlet, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Link as RouterLink } from 'react-router-dom';
import { clearCart } from "./services/cartSlice"
import { RootState } from "./app/store";
import "../src/styles/cart.css";
import Cart from "./features/components/cart/Cart";
import Wishlist from "./features/components/wishlist/Wishlist"
import CartItem from "./features/components/cart/CartItem";
import SearchIcon from "./features/components/general/SearchIcon";
import { VariantsSelectorWrapper } from "./features/components/general/VariantsSelectorWrapper";
import { Layout } from "./features/components/general/Layout";
import { AcmeLogo } from "./features/components/general/Acmelogo";
import logo from "../src/images/logo.jpeg"
import { } from "./services/wishlistSlice";
import {
  loginAsync, selectLooged, logout, selectAccess, selectUsername, refreshAsync
} from './features/login/loginSlice';
import About from "./features/components/general/About";
import HomePage from "./features/components/general/HomePage";
import Footer from "./features/components/general/Footer";
import SearchBox from "./features/components/general/SearchBox";
import { NavDropdown } from "react-bootstrap";

export default function App(): JSX.Element {

  const [variant, setVariant] = useState<"static" | "floating" | "sticky">("floating");
  const [activeColor, setActiveColor] = useState<"primary" | "secondary" | "success" | "warning" | "error">("primary");
  const variants = ["static", "floating", "sticky"];
  const colors = ["primary", "secondary", "success", "warning", "error"];
  const dispatch = useAppDispatch();
  const { cartItems, totalAmount, quantity } = useAppSelector((state: RootState) => state.cart);
  const { quantity: wishlistQuantity } = useAppSelector((state: RootState) => state.wishlist);
  // const [logged, setLogged] = useState(localStorage.getItem("logged"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const logged = useAppSelector(selectLooged)
  // const username = useAppSelector(selectUsername)
  const [showAbout, setShowAbout] = useState(false);


  const collapseItems = [
    { name: "Sofas", path: "/category/Sofas" },
    { name: "Closets", path: "/category/Closets" },
    { name: "Chairs", path: "/category/Chairs" },
    { name: "Tables", path: "/category/Tables" },
    { name: "About", path: "/About" },
  ];

  useEffect(() => {
    // setLogged(localStorage.getItem("logged"));
    setUsername(localStorage.getItem("username"));
    // other code here
  }, [logged]);

  const remember = localStorage.getItem("remember")


  useEffect(() => {

    const token = localStorage.getItem("refresh")
    let remember = localStorage.getItem("remember")
    if (remember !== null)
      if (JSON.parse(remember) === true) {
        if (token)
          dispatch(refreshAsync(token))
      }
  }, [])
  return (

    <Layout>
      <Wishlist />
      <Cart />
      <Navbar isBordered variant="sticky">

        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          <RouterLink to="/home" style={{ textDecoration: 'none', color: "black" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
              <Text b color="inherit" hideIn="xs">

              </Text>
            </div>
          </RouterLink>
        </Navbar.Brand>


        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",

            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",

              },
            }}
          >
            <SearchBox collapseItems={collapseItems} />
            {/* <Input
            clearable
            contentLeft={
              <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
            }
            contentLeftStyling={false}
            css={{
              w: "100%",
              "@xsMax": {
                mw: "300px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..." */}
            {/* /> */}
          </Navbar.Item>
          <button className="btn btn-outline-dark" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight" >
            <ShoppingCart size={18} />
            {quantity !== 0 && <span>{quantity}</span>}
          </button>
          {/* <RouterLink to="/cart" >
            <ShoppingCart size={18} />
            {quantity !== 0 && <span>{quantity}</span>}
          </RouterLink> */}
          <button className="btn btn-outline-dark"
            type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas2"
            aria-controls="offcanvas2">

            <Heart size={18} />
            {wishlistQuantity !== 0 && <span>{wishlistQuantity}</span>}
          </button>

          {logged || remember === "true" ? (
            <>

              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item as={RouterLink} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { dispatch(logout()); }}>Log out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <button className="btn btn-outline-dark" >
              <RouterLink to="/auth">
                <User size={18} style={{ "color": "black" }} />
              </RouterLink>
            </button>
          )}
        </Navbar.Content>

        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item.name}>
              <RouterLink
                style={{ textDecoration: "none", color: "black" }}
                color="inherit"
                // css={{
                //   minWidth: "100%",
                // }}
                to={item.path}
              >
                {item.name}
              </RouterLink>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
      <Footer />
    </Layout >

  )
}