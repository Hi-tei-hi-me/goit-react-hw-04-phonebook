import PropTypes from 'prop-types';
import Contact from './Contact';
import { ContactsList } from './Contacts.styled';

export default function ContactList({ listContacts, handleCLick }) {
  return (
    <ContactsList>
      {listContacts.map(({ id, name, number }) => {
        return <Contact key={id} id={id} name={name} number={number} handleCLick={handleCLick} />;
      })}
    </ContactsList>
  );
}

ContactList.propTypes = {
  listContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleCLick: PropTypes.func.isRequired,
};
