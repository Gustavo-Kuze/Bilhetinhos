import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class Like extends Component {

    render() {
        return (
            <>
                <button className="btn btn-link"><i className="far fa-heart"></i></button>
                <small className="text-primary">3</small>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Like)
