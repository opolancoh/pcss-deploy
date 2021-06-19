import React, { useState, useRef } from 'react';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message, Button, ConfigProvider } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

// import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
// import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
// import ProDescriptions from '@ant-design/pro-descriptions';

import { getAll, removeOne } from '@/services/api/instructor-api';
import CreateForm from './CreateForm';
// import type { FormValueType } from './UpdateForm';
// import UpdateForm from './UpdateForm';
import { thousandsSeparatorWithDots } from '@/utils/utils';

const { confirm } = Modal;

/**
 * 更新节点
 *
 * @param fields
 */
/* const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateItem({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
}; */

function showRemoveConfirm({ title, content, handleOnOk }) {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    cancelText: 'No',

    onOk() {
      handleOnOk();
    },
  });
}

const TableList: React.FC = () => {
  /** Pop-up window update */
  // const [showDetail, setShowDetail] = useState<boolean>(false);
  /** Pop-up window create */
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  /** Pop-up window update */
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<API.Instructor>();

  const actionRef = useRef<ActionType>();

  const intl = useIntl();

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
              // setShowDetail(true);
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
          onClick={() => {
            console.log('app.item.detail', record);
          }}
        >
          <FormattedMessage id="app.item.detail" />
        </a>,
        <a
          key="update"
          onClick={() => {
            console.log('app.item.update', record);
          }}
        >
          <FormattedMessage id="app.item.update" />
        </a>,
        <a
          key="remove"
          onClick={() => {
            console.log('ecord:', record);
            showRemoveConfirm({
              title: intl.formatMessage({
                id: 'app.item.removeMessage',
              }),
              content: `${record.nombres} ${record.apellidos}`,
              handleOnOk: async () => {
                const hide = message.loading(
                  intl.formatMessage({
                    id: 'app.processing.loading',
                  }),
                );
                try {
                  await removeOne(record.personaId);
                  hide();
                  message.success(
                    intl.formatMessage({
                      id: 'app.processing.success',
                    }),
                  );
                  if (actionRef.current) {
                    actionRef.current.reload();
                    console.log('Table reloaded!', actionRef.current);
                  }
                } catch (error) {
                  hide();
                  message.error(
                    intl.formatMessage({
                      id: 'app.processing.error',
                    }),
                  );
                }
              },
            });
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
              setCreateFormVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="app.item.add" />
          </Button>,
        ]}
      />
      <CreateForm
        onSubmit={async (success) => {
          console.log('Table onSubmit', success);
          if (success) {
            setCreateFormVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
              console.log('Table reloaded!', actionRef.current);
            }
          }
        }}
        onCancel={() => {
          setCreateFormVisible(false);
          setCurrentRow(undefined);
        }}
        formVisible={createFormVisible}
        values={currentRow || {}}
      />
    </ConfigProvider>
  );
};

export default TableList;
