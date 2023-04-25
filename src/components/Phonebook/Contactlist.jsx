import PropTypes from "prop-types";
import css from "./Phonebook.module.css";

export default function Contactlist({items, removeContact}) {
  const elements = items.map(({ name, number, id }) => {
    return <li className={css.contactlist} key={id}> {name}: {number}
      <span className={css.contactlist__button} onClick={() => removeContact(id)}>
        Delete
      </span>
    </li>
  })
  return (
    <ul>{elements}</ul>
  )
}

Contactlist.propTypes = {
  removeContact: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
})),
}