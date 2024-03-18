import { Field } from 'formik';
import PiDropdown from '../../pages/auth/register/dropDown';

const PiSelect = ({ name, data, title }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <label className="block relative floated-label col-span-12 my-3 sm:my-0 sm:col-span-6">
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
