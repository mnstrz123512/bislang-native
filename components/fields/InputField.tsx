import React from 'react';
import {useField} from 'formik';
import {View} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import ErrorText from './ErrorText';

interface InputFieldProps extends TextInputProps {
  name: string;
}

const InputField = (props: InputFieldProps) => {
  const [field, meta, helper] = useField(props.name);

  return (
    <View>
      <TextInput
        mode="outlined"
        {...props}
        value={field.value}
        onChangeText={text => {
          helper.setValue(text);
        }}
        error={Boolean(meta.error && meta.touched)}
      />
      <ErrorText error={meta.error} dirty={meta.touched} />
    </View>
  );
};

export default InputField;
