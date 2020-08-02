import React from "react";
import styled from "styled-components";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <List>
        {pageNumbers.map((number) => (
          <Item key={number} onClick={() => paginate(number)}>
            {number}
          </Item>
        ))}
      </List>
    </nav>
  );
}

const List = styled.ul`
  display: flex;
`;

const Item = styled.p`
  width: 25px;
  height: 25px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 2px gray;
  }
`;

export default Pagination;
