import React from "react";
import { Link } from "react-router-dom";

import Icon_Pencil from "../../assets/images/menu_header.png";

const SidebarMaster: React.FunctionComponent = () => {
  return (
    <div className="template-summary">
      <nav>
        <ul className={`summary`}>
          <li className={`divider`}></li>
          <li className={`chapter`}>
            <Link to={`/`} style={{ backgroundColor: "lightgray" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <img
                  src={Icon_Pencil}
                  alt="Icon_Pencil"
                  style={{ width: "25%", borderRadius: "50%" }}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>My React Storybook - 장동원</div>
            </Link>
            <ul className={`articles`}>
              <li className={`chapter`} style={{ marginTop: 10 }}>
                <b>Libraries</b>
                <ul className="articles">
                  <li className="chapter">
                    <Link to={"/d3"}>D3 Chart</Link>
                  </li>
                </ul>
              </li>
              <li className="chapter" style={{ marginTop: 10 }}>
                <b>Bootstrap UI</b>

                <ul className="articles">
                  <li className="chapter">
                    <Link to={"/interfaces/_test"}>_Test</Link>
                  </li>
                </ul>
              </li>
              <li className="chapter" style={{ marginTop: 10 }}>
                <b>My UI</b>

                <ul className="articles">
                  <li className="chapter">
                    <Link to={"/interfaces/nprogress"}>NProgress</Link>
                  </li>
                  <li className="chapter">
                    <Link to={"/interfaces/skeleton"}>Skeleton</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="divider"></li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMaster;
