import React from 'react';
import { Drawer, Col, Row } from 'antd';
import { injectIntl } from 'react-intl';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

type ColumnItem = {
  title: string;
  content?: string;
};

const DescriptionItem: React.FC<ColumnItem> = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export type Props = {
  visible: boolean;
  item: Partial<API.Sede>;
  onClose: () => void;
  intl: any;
};

const Details: React.FC<Props> = (props) => {
  const { item, intl } = props;

  return (
    <Drawer width={640} placement="right" visible={props.visible} onClose={props.onClose}>
      <p style={{ ...pStyle, marginBottom: 24 }}>
        {intl.formatMessage({
          id: 'app.common.details',
        })}
      </p>
      <p style={pStyle}>{`${item.nombre}`}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'app.common.address',
            })}
            content={item.direccion}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.sede.administradorSede',
            })}
            content={item.administradorSede}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default injectIntl(Details);
