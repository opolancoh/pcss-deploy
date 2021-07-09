import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { removeOne } from '@/services/api/instructor-api';

const { confirm } = Modal;

/* type Props = {
  onCancel: () => void;
  onSubmit: (result: boolean) => Promise<void>;
  visible: boolean;
  isEditMode: boolean;
  item: Partial<API.Instructor>;
  intl: any;
}; */


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

  const Remove = ({id, content}) => {
    confirm({
      title: 'app.item.removeMessage',
      icon: <ExclamationCircleOutlined />,
      content,
      okText: 'app.common.ok',
      okType: 'danger',
      cancelText: 'app.common.cancel',
      onOk: async () => {
        await handleRemoveOne(id);
      },
    });
  };



export default Remove;
