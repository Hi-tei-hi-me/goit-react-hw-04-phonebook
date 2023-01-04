import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1.5px solid gray;
  border-radius: 10px;
  padding: 15px;
  background-color: #a77d7d;
`;

export const Label = styled.label`
  width: 100%;
`;

export const Input = styled(Field)`
  width: 100%;
`;

export const AddButton = styled.button`
  margin: 0 auto;
`;
