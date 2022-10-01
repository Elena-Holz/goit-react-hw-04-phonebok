import css from 'components/Filter/Filter.module.css'
import PropTypes from "prop-types";

const Filter = ({ filter, handelChange }) => {
    
    return (
        <div className={css.formGrup}>
            <label className={css.titleInput}>Find contacts by name</label><br />
            <input className={css.input} type='text' name="filter" onChange={handelChange} value={filter} />
        </div>
)

}

export default Filter

Filter.propTypes = {

    filter: PropTypes.string.isRequired,
     handelChange: PropTypes.func.isRequired,
    
}

