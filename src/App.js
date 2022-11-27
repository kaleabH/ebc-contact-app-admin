import "./App.css";
import AddContacts from "./components/AddContacts";
import ContactList from "./components/ContactsList";
import OffsetBox from "./components/OffsetBox";
import React, { useState } from "react";
function App() {
  const [refreshList, setRefreshList] = useState(true);
  return (
    <>
      <OffsetBox />
      <AddContacts onRefresh={setRefreshList} />
      <ContactList refresh={refreshList} onRefresh={setRefreshList} />
    </>
  );
}

export default App;
