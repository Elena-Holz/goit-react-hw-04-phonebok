import PropTypes from "prop-types";

import { Component } from "react";
import { nanoid } from "nanoid";
import css from 'components/FormAddPhone/FormAddPhone.module.css'

export default class FormAddPhone extends Component {
    state = {
        name: '',
        number: '',
    }
  
    nameId = nanoid();
    numberId = nanoid();

    handelChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }
  
    handelSabmit = (event) => {
        event.preventDefault();
        const { name, number } = this.state;
        this.props.onSubmit({ name, number });
        this.setState({
            name: '',
            number: '',
        })
    }

    render() {
        const { nameId, numberId, handelSabmit, handelChange } = this;
        const { name, number } = this.state;
        return (
                <form onSubmit={handelSabmit}>
                    <div className={css.formGrup}>
                        <label className={css.titleInput} htmlFor="name">Name</label><br />
                        <input className={css.input}
                            id={nameId}
                            type="text"
                            value={name}
                            name='name'
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            onChange={handelChange}
                        />
                    </div>
                    <div className={css.formGrup}>
                        <label className={css.titleInput} htmlFor="number">Number</label><br />
                        <input className={css.input}
                            id={numberId}
                            type="tel"
                            name='number'
                            value={number}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            onChange={handelChange}
                            />
                    </div>
                    <button className={css.button}>Add contact</button>
                </form>
        )
    }
}

FormAddPhone.propTypes = {

    name: PropTypes.string,
    number: PropTypes.string,
    
}