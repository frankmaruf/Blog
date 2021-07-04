import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MyData } from "../Store";
import axios from "axios";
import { UserConst } from "../Store/Const/userConst";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { List, ListItem } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

const SearchModal = ({ actions, show, setShow, searchData, setSearchData }) => {
  const inputRef = useRef(null); //to fucus input field current.focus()
  const handleClose = () => setShow(false); //for close modal
  const [search, setSearch] = useState(""); // for input field
  const url = `users?search=${search}`; // default search URL
  const getSearchData = async () => {
    //for getting the the search data with async
    const response = await axios.get(url); // interconnect with url for search data
    const data = await response.data.data; //getting the response data
    setSearchData(data); //setting the search data
  };
  useEffect(() => {
    //for Controling the focus after we press the search button and getting the SearchData
    if (show === true) {
      inputRef.current.focus();
    }
    if (search) {
      getSearchData();
    }
  }, [show, search]);
  return (
    <div>
      <div>
        <Modal //for search
          keyboard={true}
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Search User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              autocomplete="off"
              ref={inputRef}
              name="search"
              onChange={(e) => {
                setSearch(() => e.target.value);
              }}
              value={search}
            />
            <List>
              {searchData.map((data) => {
                return (
                  <ListItem key={data.id}>
                    <ListItemAvatar>{actions(data.id)}</ListItemAvatar>
                    <ListItemText className="ml-2">{data.email}</ListItemText>
                    <ListItemText>@{data.username}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SearchModal;