import css from 'components/ContactsItem/ContactsItem.module.css'
import PropTypes from "prop-types";

function ContactsItem({ items, removeContact }) {
    const elements = items.map(({ name, number, id }) => {
        return <li className={css.listItem} key={id}>{name}: {number}
            <span className={css.deleteItem} onClick={() => removeContact(id)}>Delete</span></li>
    })
        return (
           <>
            <ol>{elements}</ol>
        </>
        )
}

export default ContactsItem 

ContactsItem.defaultProps = {
    items: []
}

ContactsItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }))
}