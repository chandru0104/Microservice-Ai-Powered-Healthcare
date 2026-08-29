import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';

const DocfileUpload: React.FC<UploadProps> = (props) => {
  return (
    <Upload {...props} beforeUpload={() => false} maxCount={1}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default DocfileUpload;