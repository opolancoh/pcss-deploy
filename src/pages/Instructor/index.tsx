import React, { useState, useRef } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Button, ConfigProvider, Modal } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { thousandsSeparatorWithDots, MessageId } from '@/utils/utils';
import { getAll, getOne, removeOne } from '@/services/api/instructor-api';
import AddUpdate from './components/AddUpdate';
import Details from './components/Details';

const { confirm } = Modal;

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Instructor>();
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [addUpdateVisible, setAddUpdateVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleGetOne = async (id: number) => {
    const hide = message.loading(
      intl.formatMessage({
        id: MessageId.Loading,
      }),
    );
    try {
      const result = await getOne(id);
      setCurrentRow(result);
      hide();
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({
          id: MessageId.Error,
        }),
      );
    }
  };

  const handleRemoveOne = async (id: number) => {
    try {
      await removeOne(id);
      message.success(
        intl.formatMessage({
          id: MessageId.Success,
        }),
      );
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: MessageId.Error,
        }),
      );
    }
  };

  const showRemoveConfirm = (id: number, content: string) => {
    confirm({
      title: intl.formatMessage({
        id: 'app.item.removeMessage',
      }),
      icon: <ExclamationCircleOutlined />,
      content,
      okText: intl.formatMessage({
        id: 'app.ok',
      }),
      okType: 'danger',
      cancelText: intl.formatMessage({
        id: 'app.cancel',
      }),
      onOk: async () => {
        await handleRemoveOne(id);
      },
    });
  };

  const columns: ProColumns<API.Instructor>[] = [
    {
      dataIndex: 'tipoIdentificacion',
      title: <FormattedMessage id="app.person.idType" />,
    },
    {
      dataIndex: 'numeroIdentificacion',
      title: <FormattedMessage id="app.person.idNumber" />,
      renderText: (val: string) => thousandsSeparatorWithDots(val),
    },
    {
      dataIndex: 'nombrePersona',
      title: <FormattedMessage id="app.person.name" />,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setDetailsVisible(true);
            }}
          >
            {`${entity.nombres} ${entity.apellidos}`}
          </a>
        );
      },
    },
    {
      dataIndex: 'tipoVinculacion',
      title: <FormattedMessage id="pages.instructor.tipoVinculacion" />,
    },
    {
      dataIndex: 'totalHorasMes',
      title: <FormattedMessage id="pages.instructor.totalHorasMes" />,
    },
    {
      dataIndex: 'fechaInicioContrato',
      title: <FormattedMessage id="pages.instructor.fechaInicioContrato" />,
      valueType: 'date',
    },
    {
      dataIndex: 'fechaFinContrato',
      title: <FormattedMessage id="pages.instructor.fechaFinContrato" />,
      valueType: 'date',
    },
    {
      dataIndex: 'areaDeConocimiento',
      title: <FormattedMessage id="pages.instructor.areaDeConocimiento" />,
    },
    {
      dataIndex: 'option',
      title: <FormattedMessage id="app.table.actions" />,
      valueType: 'option',
      render: (_, record) => [
        <a
          key="detail"
          onClick={async () => {
            await handleGetOne(record.personaId);
            setDetailsVisible(true);
          }}
        >
          <FormattedMessage id="app.item.detail" />
        </a>,
        <a
          key="update"
          onClick={async () => {
            await handleGetOne(record.personaId);
            setIsEditMode(true);
            setAddUpdateVisible(true);
          }}
        >
          <FormattedMessage id="app.item.update" />
        </a>,
        <a
          key="remove"
          onClick={() => {
            showRemoveConfirm(record.personaId, `${record.nombres} ${record.apellidos}`);
          }}
        >
          <FormattedMessage id="app.item.remove" />
        </a>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={intl}>
      <ProTable<API.Instructor, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.instructor.table.title',
        })}
        rowKey="personaId"
        search={false}
        options={false}
        columns={columns}
        pagination={{
          showSizeChanger: false,
        }}
        actionRef={actionRef}
        request={getAll}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setIsEditMode(false);
              setAddUpdateVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="app.item.add" />
          </Button>,
        ]}
      />
      {addUpdateVisible && (
        <AddUpdate
          onSubmit={async (success) => {
            if (success) {
              setAddUpdateVisible(false);
              message.success(
                intl.formatMessage({
                  id: MessageId.Success,
                }),
              );
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            setAddUpdateVisible(false);
            setCurrentRow(undefined);
          }}
          visible={addUpdateVisible}
          isEditMode={isEditMode}
          item={currentRow || {}}
        />
      )}
      {detailsVisible && (
        <Details
          visible={detailsVisible}
          item={currentRow || {}}
          onClose={() => {
            setDetailsVisible(false);
          }}
        />
      )}
    </ConfigProvider>
  );
};

export default TableList;
