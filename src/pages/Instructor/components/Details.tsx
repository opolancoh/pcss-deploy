import React from 'react';
import { message } from 'antd';
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import { injectIntl } from 'react-intl';

import { getOne } from '@/services/api/instructor-api';
import { useState } from 'react';
import { useEffect } from 'react';

import { formatDate } from '@/utils/utils';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
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
  id: number;
  visible: boolean;
  onClose: () => void;
  intl: any;
};

const Details: React.FC<Props> = (props) => {
  const { id, intl } = props;

  const [data, setData] = useState<Partial<API.Instructor>>({});

  useEffect(() => {
    const fetchData = async () => {
      // setIsError(false);
      // setIsLoading(true);

      try {
        const result = await getOne(id);
        console.log('result', result);
        setData(result);
      } catch (error) {
        // setIsError(true);
        console.log('error', error);
      }

      // setIsLoading(false);
    };

    fetchData();
  }, [id]);

  /*   const handleGetOne = async () => {
    // const hide = message.loading('procesando');
    try {
      const response = await getOne(id);
      console.log('response', response);
      // hide();
      return true;
    } catch (error) {
      // hide();
      // message.error('添加失败请重试！');
      return false;
    }
  }; */

  return (
    <Drawer width={640} placement="right" visible={props.visible} onClose={props.onClose}>
      <p style={{ ...pStyle, marginBottom: 24 }}>
        {intl.formatMessage({
          id: 'app.details',
        })}
      </p>
      <p style={pStyle}>{`${data.nombres} ${data.apellidos}`}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'app.person.idType',
            })}
            content={data.tipoIdentificacion}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'app.person.idNumber',
            })}
            content={data.numeroIdentificacion}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.tipoVinculacion',
            })}
            content={data.tipoVinculacion}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.totalHorasMes',
            })}
            content={data.totalHorasMes}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.fechaInicioContrato',
            })}
            content={formatDate(data.fechaInicioContrato)}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.fechaFinContrato',
            })}
            content={formatDate(data.fechaFinContrato)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.coordinador',
            })}
            content={data.coordinador || '-'}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.competencia',
            })}
            content={data.competencia || '-'}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.resultadoDeAprendizaje',
            })}
            content={data.resultadoDeAprendizaje || '-'}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={intl.formatMessage({
              id: 'pages.instructor.areaDeConocimiento',
            })}
            content={data.areaDeConocimiento || '-'}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default injectIntl(Details);
