import { createWithRemoteLoader } from '@kne/remote-loader';
import getColumns from './getColumns';
import { useRef } from 'react';
import { Space, Button, App, Flex, Alert } from 'antd';
import style from './style.module.scss';

const Signature = createWithRemoteLoader({
  modules: [
    'components-core:Layout@TablePage',
    'components-core:Global@usePreset',
    'components-core:FormInfo',
    'components-core:FormInfo@useFormModal',
    'components-core:InfoPage@CentralContent'
  ]
})(({ remoteModules }) => {
  const [TablePage, usePreset, FormInfo, useFormModal, CentralContent] = remoteModules;
  const { ajax, apis } = usePreset();
  const ref = useRef(null);
  const { TextArea } = FormInfo.fields;
  const formModal = useFormModal();
  const { modal } = App.useApp();
  return (
    <TablePage
      {...Object.assign({}, apis.signature.list)}
      pagination={{ paramsType: 'params' }}
      name="signature-list"
      ref={ref}
      page={{
        titleExtra: (
          <Space align="center">
            <Button
              type="primary"
              onClick={() => {
                const formModalApi = formModal({
                  title: '添加密钥',
                  size: 'small',
                  formProps: {
                    onSubmit: async data => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.signature.create, {
                          data
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      ref.current.reload();
                      formModalApi.close();
                      modal.info({
                        icon: null,
                        size: 'large',
                        width: '800px',
                        title: '密钥生成成功',
                        content: (
                          <Flex vertical gap={10}>
                            <Alert type="error" message="请妥善保存当前密钥，关闭窗口后将不能再获取到，请勿泄漏" />
                            <CentralContent
                              dataSource={resData.data}
                              col={1}
                              columns={[
                                {
                                  name: 'appId',
                                  title: 'AppId'
                                },
                                {
                                  name: 'secretKey',
                                  title: 'SecretKey'
                                }
                              ]}
                            />
                          </Flex>
                        )
                      });
                    }
                  },
                  children: <TextArea name="description" label="描述" maxLength={100} />
                });
              }}
            >
              添加密钥
            </Button>
          </Space>
        )
      }}
      columns={[
        ...getColumns(),
        {
          name: 'options',
          title: '操作',
          type: 'options',
          fixed: 'right',
          valueOf: item => {}
        }
      ]}
    />
  );
});

export default Signature;
