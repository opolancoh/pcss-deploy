import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, message, Button, ConfigProvider } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

// import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
// import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
// import ProDescriptions from '@ant-design/pro-descriptions';

import { thousandsSeparatorWithDots } from '@/utils/utils';
import { getAll, getOne, removeOne } from '@/services/api/instructor-api';
import AddUpdate from './components/AddUpdate';
import Details from './components/Details';

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

function showRemoveConfirm({ title, content, handleOnOk, okText, cancelText }) {
  confirm({
    title,
    content,
    okText,
    cancelText,
    onOk() {
      handleOnOk();
    },
  });
}

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Instructor>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [addUpdateFormVisible, setAddUpdateFormVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleGetOne = async (id: number) => {
    const hide = message.loading(
      intl.formatMessage({
        id: 'app.processing.loading',
      }),
    );
    try {
      const result = await getOne(id);
      setCurrentRow(result);
      setIsEditMode(true);
      setAddUpdateFormVisible(true);
      hide();
      // message.success('配置成功');
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({
          id: 'app.processing.error',
        }),
      );
    }
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
              setShowDetail(true);
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
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          <FormattedMessage id="app.item.detail" />
        </a>,
        <a
          key="update"
          onClick={async () => {
            await handleGetOne(record.personaId);
          }}
        >
          <FormattedMessage id="app.item.update" />
        </a>,
        <a
          key="remove"
          onClick={() => {
            showRemoveConfirm({
              title: intl.formatMessage({
                id: 'app.item.removeMessage',
              }),
              content: `${record.nombres} ${record.apellidos}`,
              okText: intl.formatMessage({
                id: 'app.ok',
              }),
              cancelText: intl.formatMessage({
                id: 'app.cancel',
              }),
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
              setIsEditMode(true);
              setAddUpdateFormVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="app.item.add" />
          </Button>,
        ]}
      />
      <AddUpdate
        onSubmit={async (success) => {
          if (success) {
            setAddUpdateFormVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setAddUpdateFormVisible(false);
          setCurrentRow(undefined);
        }}
        formVisible={addUpdateFormVisible}
        isEditMode={isEditMode}
        item={currentRow || {}}
      />
      {showDetail && currentRow?.personaId && (
        <Details
          id={currentRow?.personaId}
          visible={showDetail}
          onClose={() => {
            setShowDetail(false);
          }}
        />
      )}
    </ConfigProvider>
  );
};

export default TableList;
