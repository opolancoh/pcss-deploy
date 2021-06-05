import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

const Layout: React.FC = ({ children }) => {
  return (
    <PageHeaderWrapper>
      <Card>{children}</Card>
    </PageHeaderWrapper>
  );
};

export default Layout;
