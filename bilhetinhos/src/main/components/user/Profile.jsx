import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton'

class Profile extends Component {
    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Perfil</h1>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

// export default connect(null, bindActionCreators({}))(Profile)
export default Profile