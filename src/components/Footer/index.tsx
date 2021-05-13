import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  return (
    <DefaultFooter
      copyright={`2020 ${defaultMessage}`}
      links={[
        {
          key: 'SENA Main Site',
          title: 'SENA',
          href: 'https://www.sena.edu.co',
          blankTarget: true,
        },
      ]}
    />
  );
};
