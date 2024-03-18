import { Field } from 'formik';
import PiDropdown from '../../pages/auth/register/dropDown';

const PiSelect = ({
  name,
  data,
  title,
  placeholder = 'John Doe',
  type = 'text',
  displayName,
}) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <label className="block relative floated-label col-span-6">
            <p>{name}</p>
            <PiDropdown
              title={title}
              data={data}
              field={field}
              form={setFieldValue}
              name={name}
            />
          </label>
        );
      }}
    </Field>
  );
};

export default PiSelect;
