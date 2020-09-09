import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Item from "../../../atoms/DashboardMainItem";
import Pagination from "../../../molecules/Main/Pagination";
import Context from "../../../molecules/Main/DashboardContext";

const GETOPERATIONS = gql`
  {
    getOperation {
      id
      type
      UsersId
      value
      amount
      Users {
        name
        CompaniesId
      }
      Products {
        name
      }
      Clients {
        name
      }
    }

    getCompany {
      balance
    }

    getStockBalance
  }
`;

function DashboardMain() {
  const { loading, data, refetch } = useQuery(GETOPERATIONS);
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    refetch();
  }, [refetch]);
  

  useEffect(()=>{
    if(!loading){
     setPosts(data.getOperation.map((operation) => operation).reverse());
    }
  },[data, loading])

  if (loading) {
    return <h1>loading</h1>;
  }


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentpage(pageNumber);

  return (
    <Wrapper>
      <Dashboard>
        <Text>DASHBOARD</Text>
        <Content>
          <Context
            text="Balanço Liquido"
            value={data.getCompany[0].balance}
          ></Context>
          <Context
            text="Balanço em estoque"
            value={data.getStockBalance}
          ></Context>
          <Context
            text="Valor total"
            value={data.getCompany[0].balance + data.getStockBalance}
          ></Context>
        </Content>
      </Dashboard>

      <View>
        <Text>Operações</Text>
        <Header>
          <Title>Usuário</Title>
          <Title>Produto</Title>
          <Title>Valor</Title>
          <Title>Quantidade</Title>
          <Title>Cliente</Title>
          <Title>Tipo</Title>
        </Header>
        {currentPost.map((operation) => (
          <Item key={operation.id} operation={operation}></Item>
        ))}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts}
          paginate={paginate}
        ></Pagination>
      </View>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dashboard = styled.div`
  width: 100%;
  height: 250px;
  margin: 5px 0;
  height: 100%;
`;

const View = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Text = styled.h2`
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 465px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;

const Title = styled.h3`
  text-align: center;
  @media (max-width: 770px) {
    font-size: 15px;
  }

  @media (max-width: 465px) {
    font-size: 10px;
  }
`;

export default DashboardMain;
