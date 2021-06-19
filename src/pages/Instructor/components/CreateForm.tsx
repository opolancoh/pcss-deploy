import React from 'react';
import { message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

import { addOne } from '@/services/api/instructor-api';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

/**
 * Add new item
 *
 * @param fields
 */
const handleAdd = async (fields: API.Instructor) => {  
  const hide = message.loading('procesando');
  try {
    const response = await addOne({ ...fields });
    console.log('response', response)
    await waitTime(3000);
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.InstructorList>;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (result: boolean) => Promise<void>;
  formVisible: boolean;
  values: Partial<API.Instructor>;
};

const CreateForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();

  return (
    <ModalForm<API.Instructor>
      title={intl.formatMessage({
        id: 'app.item.addItem',
      })}
      visible={props.formVisible}
      modalProps={{
        onCancel: () => props.onCancel(),
      }}
      onFinish={async (values) => {
        const result = await handleAdd(values);
        props.onSubmit(result);
      }}
    >
      <ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="tipoIdentificacion"
          label={<FormattedMessage id="app.person.idType" />}
          options={[
            {
              value: 'cedula',
              label: 'Cédula',
            },
          ]}
          rules={[{ required: true }]}
        />
        <ProFormText
          width="md"
          name="numeroIdentificacion"
          label={<FormattedMessage id="app.person.idNumber" />}
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProFormText
          width="md"
          name="nombres"
          label={<FormattedMessage id="app.person.names" />}
          rules={[{ required: true }]}
        />
        <ProFormText
          width="md"
          name="apellidos"
          label={<FormattedMessage id="app.person.surnames" />}
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="tipoVinculacion"
          label={<FormattedMessage id="pages.instructor.tipoVinculacion" />}
          valueEnum={{
            open: 'Unresolved',
            closed: 'Resolved',
          }}
          rules={[{ required: true }]}
        />
        <ProFormText
          width="md"
          name="totalHorasMes"
          label={<FormattedMessage id="pages.instructor.totalHorasMes" />}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="fechaInicioContrato"
          label={<FormattedMessage id="pages.instructor.fechaInicioContrato" />}
        />
        <ProFormDatePicker
          width="md"
          name="fechaFinContrato"
          label={<FormattedMessage id="pages.instructor.fechaFinContrato" />}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="coordinador"
          label={<FormattedMessage id="pages.instructor.coordinador" />}
        />
        <ProFormText
          width="md"
          name="areaDeConocimiento"
          label={<FormattedMessage id="pages.instructor.areaDeConocimiento" />}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="resultadoDeAprendizaje"
          label={<FormattedMessage id="pages.instructor.resultadoDeAprendizaje" />}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default CreateForm;
