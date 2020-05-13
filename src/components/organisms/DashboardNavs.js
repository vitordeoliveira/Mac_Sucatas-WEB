import React from "react";
import styled from "styled-components";

import Item from "../atoms/DashboardItem";
import { AiFillDashboard, AiOutlineLogout } from "react-icons/ai";
import {
  FaCartPlus,
  FaBox,
  FaUserTag,
  FaUserPlus,
  FaMoneyBillWave,
} from "react-icons/fa";
import { GiSellCard } from "react-icons/gi";

function DashboardNavs() {
  return (
    <List>
      <Item to="" icon={<AiFillDashboard></AiFillDashboard>}>
        Dashboard
      </Item>
      <Item to="product" icon={<FaBox></FaBox>}>
        Adicionar Produtos
      </Item>
      <Item to="buy" icon={<FaCartPlus></FaCartPlus>}>
        Compra
      </Item>
      <Item to="sell" icon={<GiSellCard></GiSellCard>}>
        Venda
      </Item>
      <Item to="fornecedor" icon={<FaUserPlus></FaUserPlus>}>
        Fornecedores
      </Item>
      <Item to="comprador" icon={<FaUserTag></FaUserTag>}>
        Compradores
      </Item>
      <Item to="cust" icon={<FaMoneyBillWave></FaMoneyBillWave>}>
        Custo Operacional
      </Item>
      <Item logout icon={<AiOutlineLogout></AiOutlineLogout>}>
        LogOut
      </Item>
    </List>
  );
}

const List = styled.ul`
  height: auto;
  list-style: none;
  padding: 0;
`;

export default DashboardNavs;
