import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton/Skeleton'

export class Settings extends Component {

    handleSelectionChanged = (e) => {
        console.log(e.target.value)
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <h1 className="h3">{window.translate({ text: "user-menu-btn-settings" })}</h1>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <div className="form-group">
                                <p>Alterar a privacidade do quadro</p>
                                <select className="custom-select" onChange={this.handleSelectionChanged}>
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

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
