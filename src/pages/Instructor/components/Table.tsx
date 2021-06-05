import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, ConfigProvider } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './UpdateForm';
import UpdateForm from './UpdateForm';
import { getItems, addItem, updateItem, removeItem } from '@/services/api/instructor-api';
import type { Instructor as Item, PageParams } from '@/services/api/api-typings';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: Item) => {
  const hide = message.loading('正在添加');
  try {
    await addItem({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
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
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: Item[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeItem({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** Pop-up window update */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** Pop-up window create */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** Pop-up window update */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<Item>();

  const actionRef = useRef<ActionType>();

  const intl = useIntl();

  const columns: ProColumns<Item>[] = [
    {
      dataIndex: 'nombrePersona',
      title: <FormattedMessage id="app.person.name" />,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              console.log(entity);
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
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
            console.log('app.item.remove', record);
          }}
        >
          <FormattedMessage id="app.item.remove" />
        </a>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={intl}>
      <ProTable<Item, PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.instructor.table.title',
        })}
        rowKey="claveInstructor"
        search={false}
        options={false}
        columns={columns}
        pagination={{
          showTotal: undefined,
          showSizeChanger: false,
        }}
        actionRef={actionRef}
        request={getItems}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="app.item.add" />
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};

export default TableList;
