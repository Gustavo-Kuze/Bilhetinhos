import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLanguage } from '../../../redux/actions/languageActions'

const LanguageSelector = props => {

    const callChangeLanguage = e => {
        props.changeLanguage(e.target.innerText)
        window.location.reload()
    }

    return (
        <div className="dropdown ">
            <button className="btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-language"></i> {props.language}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={(e) => callChangeLanguage(e)}>pt</button>
                <button className="dropdown-item" onClick={(e) => callChangeLanguage(e)}>en</button>
                <button className="dropdown-item" onClick={(e) => callChangeLanguage(e)}>es</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.language
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeLanguage
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)
