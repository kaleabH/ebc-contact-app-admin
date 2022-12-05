import "./App.css";
import AddContacts from "./components/AddContacts";
import ContactList from "./components/ContactsList";
import OffsetBox from "./components/OffsetBox";
import CheckInternet from "./components/CheckInternet";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import AddCategory from "./components/AddCategory";
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
      <AddContacts onRefresh={setRefreshList} />
      <AddCategory onRefresh={setRefreshList} />
      <ContactList refresh={refreshList} onRefresh={setRefreshList} />
    </>
  ) : (
    <CheckInternet />
  );
}

export default App;
