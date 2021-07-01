import React from 'react';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';
import { injectIntl } from 'react-intl';

import { addOne, updateOne } from '@/services/api/instructor-api';
import { getAll as getAllTipoIdentificacion } from '@/services/api/tipo-identificacion-api';
import { getAll as getAllTipoVinculacion } from '@/services/api/tipo-vinculacion-api';

const fetchTipoIdentificacion = async () => {
  const result = await getAllTipoIdentificacion();
  return result.map((d) => ({ value: d.tipoIdentificacionId, label: d.descripcion }));
};

const fetchTipoVinculacion = async () => {
  const result = await getAllTipoVinculacion();
  return result.map((d) => ({ value: d.tipoVinculacionId, label: d.descripcion }));
};

type FormProps = {
  onCancel: () => void;
  onSubmit: (result: boolean) => Promise<void>;
  visible: boolean;
  isEditMode: boolean;
  item: Partial<API.Instructor>;
  intl: any;
};

const AddUpdate: React.FC<FormProps> = (props) => {
  const { visible, isEditMode, item, intl } = props;

  const formTitleId = isEditMode ? 'app.item.updateItem' : 'app.item.addItem';
  const submitText = intl.formatMessage({
    id: 'app.ok',
  });
  const resetText = intl.formatMessage({
    id: 'app.cancel',
  });
  const requiredMsg = intl.formatMessage({
    id: 'app.form.requiredMsg',
  });

  const handleAddUpdate = async (fields: API.Instructor) => {
    try {
      if (isEditMode) await updateOne(fields);
      else await addOne(fields);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ModalForm<API.Instructor>
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
        <ProFormSelect
          width="md"
          name="tipoIdentificacionId"
          label={<FormattedMessage id="app.person.idType" />}
          request={async () => await fetchTipoIdentificacion()}
          rules={[{ required: true, message: requiredMsg }]}
        />
        <ProFormText
          width="md"
          name="numeroIdentificacion"
          label={<FormattedMessage id="app.person.idNumber" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="nombres"
          label={<FormattedMessage id="app.person.names" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
        <ProFormText
          width="md"
          name="apellidos"
          label={<FormattedMessage id="app.person.surnames" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="tipoVinculacionId"
          label={<FormattedMessage id="pages.instructor.tipoVinculacion" />}
          request={async () => await fetchTipoVinculacion()}
          rules={[{ required: true, message: requiredMsg }]}
        />
        <ProFormDigit
          width="md"
          name="totalHorasMes"
          label={<FormattedMessage id="pages.instructor.totalHorasMes" />}
          rules={[{ required: true, message: requiredMsg }]}
          min={0}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="fechaInicioContrato"
          label={<FormattedMessage id="pages.instructor.fechaInicioContrato" />}
          rules={[{ required: true, message: requiredMsg }]}
        />
        <ProFormDatePicker
          width="md"
          name="fechaFinContrato"
          label={<FormattedMessage id="pages.instructor.fechaFinContrato" />}
          rules={[{ required: true, message: requiredMsg }]}
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
          name="competencia"
          label={<FormattedMessage id="pages.instructor.competencia" />}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="resultadoDeAprendizaje"
          label={<FormattedMessage id="pages.instructor.resultadoDeAprendizaje" />}
        />
        <ProFormText
          width="md"
          name="areaDeConocimiento"
          label={<FormattedMessage id="pages.instructor.areaDeConocimiento" />}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default injectIntl(AddUpdate);
