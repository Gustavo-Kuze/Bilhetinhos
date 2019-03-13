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
                                <h5>Alterar a privacidade do quadro</h5>
                                <select className="custom-select" onChange={this.handleSelectionChanged} value={this.props.boardPrivacy}>
                                    <option value="public">Público (visível a todos)</option>
                                    <option value="mates">Colegas (Apenas seus colegas podem ver)</option>
                                    <option value="private">Privado (Apenas você pode ver)</option>
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
