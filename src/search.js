import React from "react";
import { Input } from "antd";

const SearchBox = Input.Search;

const Search = ({ ...props }) => (
  <SearchBox
    placeholder="Type Search"
    onSearch={props.onSearch}
    value={props.value}
    onChange={props.onChange}
    enterButton
  />
);

export default Search;
