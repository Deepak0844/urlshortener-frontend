import { useState } from "react";
import TableChartIcon from "@mui/icons-material/TableChart";
import LinkIcon from "@mui/icons-material/Link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useHistory } from "react-router-dom";
import React from "react";
import { Layout, Menu } from "antd";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu1 from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { Routes } from "./Router";
//router
import { Switch } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRouter from "./Authentication/protected";
import { Loader } from "./loader";


const { Header, Content, Sider } = Layout; //for dashboard
export default function DashboardLayout() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Layout>
        <Sider
          style={{ zIndex: 1 }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            style={{ marginTop: "50px" }}
          >
            <Menu.Item
              onClick={() => {
                history.push("/dashboard");
              }}
              key="1"
              icon={<DashboardIcon />}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                history.push("/urlshortener");
              }}
              icon={<LinkIcon />}
            >
              Url Shortener
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                history.push("/table");
              }}
              icon={<TableChartIcon />}
            >
              Url Data
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: "30px", color: "white" }} />
              </IconButton>
              <Menu1
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/signin");
                    setAnchorEl(null);
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu1>
            </div>
          </Header>
          <Content style={{ minHeight: "92.8vh", height: "auto" }}>
            <div className="site-layout-background">
              {/* adding all components to content */}
              <Suspense fallback={Loader}>
                <Switch>
                  {Routes.map((route, index) => {
                    return (
                      <ProtectedRouter
                        path={route.path}
                        key={index}
                        component={route.component}
                        exact={route.exact}
                      />
                    );
                  })}
                </Switch>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
