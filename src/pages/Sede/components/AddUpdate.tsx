import React from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';
import { injectIntl } from 'react-intl';

import { addOne, updateOne } from '../service';

type Props = {
  onCancel: () => void;
  onSubmit: (result: boolean) => Promise<void>;
  visible: boolean;
  isEditMode: boolean;
  item: Partial<API.Sede>;
  intl: any;
};

const AddUpdate: React.FC<Props> = (props) => {
  const { visible, isEditMode, item, intl } = props;

  const formTitleId = isEditMode ? 'app.item.updateItem' : 'app.item.addItem';
  const submitText = intl.formatMessage({
    id: 'app.common.ok',
  });
  const resetText = intl.formatMessage({
    id: 'app.common.cancel',
  });
  const requiredMsg = intl.formatMessage({
    id: 'app.form.requiredMsg',
  });

  const handleAddUpdate = async (fields: API.Sede) => {
    try {
      if (isEditMode) await updateOne(fields);
      else await addOne(fields);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ModalForm<API.Sede>
      visible={visible}
      title={intl.formatMessage({
        id: formTitleId,
      })}
      submitter={{
        searchConfig: {
          submitText,
          resetText,
        },
      }}
      modalProps={{
        onCancel: () => props.onCancel(),
      }}
      onFinish={async (values) => {
        const result = await handleAddUpdate(values);
        props.onSubmit(result);
      }}
      initialValues={item}
    >
      <ProFormText width="md" name="personaId" hidden={true} />
      <ProForm.Group>
        <ProFormText
          width="md"
          name="nombre"
          label={<FormattedMessage id="app.common.name" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
        <ProFormText
          width="md"
          name="direccion"
          label={<FormattedMessage id="app.common.address" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="administradorId"
          label={<FormattedMessage id="pages.sede.administradorSede" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default injectIntl(AddUpdate);
