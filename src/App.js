import "./App.css";
import ContactList from "./components/ContactsList";
import OffsetBox from "./components/OffsetBox";
import CheckInternet from "./components/CheckInternet";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import AddCategory from "./components/AddCategory";
// import CryptoGraph from "./components/CryptoGraph";
function App() {
  const [refreshList, setRefreshList] = useState(true);
  const [online, setOnline] = useState("loading");

  useEffect(() => {
    // window.addEventListener("online", () => {
    //   setOnline(true);
    //   console.log("online");
    // });

    // window.addEventListener("offline", () => {
    //   setOnline(false);
    //   console.log("offline");
    // });
    document.getElementsByTagName("body")[0].style.background =
      "linear-gradient(180deg, #024BC0 15.74%, rgba(15, 93, 218, 0.41) 62.1%, rgba(3, 100, 255, 0.23) 99.07%)";
    if (window.navigator.onLine) {
      console.log("online");
      setOnline("online");
    } else {
      console.log("offline");
      setOnline("offline");
    }
  }, []);
  return online === "loading" ? (
    <Loading />
  ) : online === "online" ? (
    <>
      <OffsetBox />
      {/* <CryptoGraph /> */}
      <AddCategory onRefresh={setRefreshList} />
      <ContactList refresh={refreshList} onRefresh={setRefreshList} />
    </>
  ) : (
    <CheckInternet />
  );
}

export default App;
