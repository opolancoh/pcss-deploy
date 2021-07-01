import React from 'react';
import { Drawer, Col, Row } from 'antd';
import { injectIntl } from 'react-intl';

import { formatDate } from '@/utils/utils';

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
  item: Partial<API.Instructor>;
  onClose: () => void;
  intl: any;
};

const Details: React.FC<Props> = (props) => {
  const { item, intl } = props;

  return (
    <Drawer width={640} placement="right" visible={props.visible} onClose={props.onClose}>
      <p style={{ ...pStyle, marginBottom: 24 }}>
        {intl.formatMessage({
          id: 'app.details',
        })}
      </p>
      <p style={pStyle}>{`${item.nombres} ${item.apellidos}`}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'app.person.idType',
            })}
            content={item.tipoIdentificacion}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'app.person.idNumber',
            })}
            content={item.numeroIdentificacion}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.tipoVinculacion',
            })}
            content={item.tipoVinculacion}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.totalHorasMes',
            })}
            content={item.totalHorasMes?.toString()}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.fechaInicioContrato',
            })}
            content={formatDate(item.fechaInicioContrato)}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.fechaFinContrato',
            })}
            content={formatDate(item.fechaFinContrato)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.coordinador',
            })}
            content={item.coordinador || '-'}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.competencia',
            })}
            content={item.competencia || '-'}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.resultadoDeAprendizaje',
            })}
            content={item.resultadoDeAprendizaje || '-'}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.areaDeConocimiento',
            })}
            content={item.areaDeConocimiento || '-'}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default injectIntl(Details);
