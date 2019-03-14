import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton/Skeleton'
import { setBoardPrivacy } from '../../redux/actions/userActions'

export class Settings extends Component {

    handleSelectionChanged = (e) => {
        this.props.setBoardPrivacy(this.props.uid, e.target.value)
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">{window.translate({ text: "user-menu-btn-settings" })}</h1>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <div className="form-group w-50">
                                <h5>{window.translate({text: 'settings-board-privacy-label'})}</h5>
                                <select className="custom-select" onChange={this.handleSelectionChanged} value={this.props.boardPrivacy}>
                                    <option value="public">{window.translate({text: 'settings-board-privacy-select-public'})}</option>
                                    <option value="mates">{window.translate({text: 'settings-board-privacy-select-mates'})}</option>
                                    <option value="private">{window.translate({text: 'settings-board-privacy-select-private'})}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.user.uid,
    boardPrivacy: state.user.boardPrivacy || 'public'
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setBoardPrivacy
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
