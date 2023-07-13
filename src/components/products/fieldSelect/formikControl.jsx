import { Radio } from 'flowbite-react';
import Input from '../../controls/input';
import Select from '../../controls/select';
import CheckboxGroup from '../../controls/checkbox';
import Datepicker from '../../controls/datepicker';
import TextArea from '../../controls/textarea';

function FormikControl(props) {
  const { control, ...rest } = props;

  const groupControl = (control) => {
    switch (control) {
      case 3:
        return <Input {...rest} />;
      case 'textarea':
        return <TextArea {...rest} />;
      case 4:
        return <Select {...rest} />;
      case 'radio':
        return <Radio {...rest} />;
      case 'checkbox':
        return <CheckboxGroup {...rest} />;
      case 'date':
        return <Datepicker {...rest} />;

      default:
        return null;
    }
  };
  return <div>{groupControl(control)}</div>;
}

export default FormikControl;
