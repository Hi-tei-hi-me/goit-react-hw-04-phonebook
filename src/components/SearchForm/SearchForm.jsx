import PropTypes from 'prop-types';
import { SearchForm, Label, Input } from './SearchForm.styled';

export default function Filter({ value, onChange }) {
  return (
    <SearchForm>
      <Label htmlFor="filter">Find contact by name:</Label>
      <Input name="filter" type="text" value={value} onChange={e => onChange(e.target.value)} />
    </SearchForm>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
