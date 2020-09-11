import React, { useState ,useEffect} from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload } from '@alifd/next';
import { history } from 'ice';
import { UploadProps } from '@alifd/next/types/upload';
import { Moment } from 'moment';
import { request,useParams } from 'ice';
import styles from './index.module.scss';
const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

async function getTopics() {
  const params  = useParams();
  if(params.id){
    await request({
      url: '/api/v1/topics/'+params.id
    }).then(res => {
      DEFAULT_DATA.title = res.title
      DEFAULT_DATA.category_id = res.category_id
      DEFAULT_DATA.body = res.body
    }).catch(err => {
  
    })
  }else{
    DEFAULT_DATA.title = ''
    DEFAULT_DATA.category_id = ''
    DEFAULT_DATA.body = ''
  }
}

async function postTopics(values) {
  const params  = useParams();
  if(params.id){
    request.patch('/api/v1/topics/'+params.id, values).then(res => {
      console.log(res);
      if(res){
        history.push('/list/basic');
      }
    }).catch(err => {
    })
  }else{
    request.post('/api/v1/topics', values).then(res => {
      console.log(res);
      if(res){
        history.push('/list/basic');
      }
    }).catch(err => {
    })
  }

}

export interface DataSource {
  title?: string;
  category_id?: string;
  date?: Moment[];
  type?: string;
  pic?: UploadProps[];
  body?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: 'private',
};

const DEFAULT_ON_SUBMIT = (values: BasicFormProps, errors: []): void => {
  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  postTopics(values)

  Message.success('提交成功');
};

const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {

  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
    onCancel = () => {
      history.push('/list/basic')
     },
  } = props;

  getTopics()
  console.log('----------')

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const [postData, setValue] = useState<BasicFormProps>(dataSource);

  const formChange = (values: BasicFormProps): void => {
    setValue(values);
  };

  return (
    <Card free>
      <Card.Content>
        <Form
          className={styles.BasicForm}
          responsive
          fullWidth
          value={postData}
          labelAlign="top"
          onChange={formChange}
        >
          <FormItem {...formItemLayout} label="文章标题：" required requiredMessage="必填">
            <Input placeholder="请输入文章标题" name="title" value={dataSource.title}/>
          </FormItem>

          <FormItem {...formItemLayout} label="文章所属分类：" required requiredMessage="必填">
            <Input placeholder="请输入文章分类" name="category_id" value={dataSource.category_id}/>
          </FormItem>

          <FormItem {...formItemLayout} label="文章内容：" >
            <Input.TextArea placeholder="请输入文章详细信息" name="body" value={dataSource.body}/>
          </FormItem>

          <FormItem colSpan={12}>
            <Box spacing={8} direction="row">
              <Form.Submit
                type="primary"
                onClick={onSubmit}
                validate
              >提交</Form.Submit>
              <Button onClick={onCancel} type="secondary">取消</Button>
            </Box>
          </FormItem>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default BasicForm;
