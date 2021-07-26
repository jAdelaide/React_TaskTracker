import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className="header">
            <h1> {title} </h1>
            <Button
            color={showAdd ? "rgb(145, 20, 80)" : "indigo"}
            onClick={onAdd}
            text={showAdd ? "Done" : "Add"}
            />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
