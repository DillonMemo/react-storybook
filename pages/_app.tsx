import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

const App = ({ Component }) => {
  console.log(Component, Component ? true : false);
  return (
    <>
      <Head>
        <title>Application</title>
      </Head>
      <header>
        <ul>
          <li>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </header>
      <div>
        <Component />
      </div>
    </>
  );
};

export default App;
