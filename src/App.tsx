import React from 'react';
import { Flex, Layout } from "antd";
import './App.scss';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/header';
import AppFooter from './components/footer';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

function App() {
  const { Header, Footer, Content } = Layout;

  return (
    <ConfigProvider locale={ruRU}>
      <Flex gap="middle" wrap className='full-height'>
        <Layout>
          <Header><AppHeader /></Header>
          <Content><Outlet /></Content>
          <Footer><AppFooter /></Footer>
        </Layout>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
