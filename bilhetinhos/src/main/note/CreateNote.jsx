import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'

export default class CreateNote extends Component {
    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <h1>Criar uma nota</h1>
                            <form>
                                <div className="form-group ">
                                    <textarea id="ta-note-message" className="form-control" name="note-message" rows="10"></textarea>
                                    <button className="btn btn-primary btn-lg mt-3">Criar</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>
            </Skeleton>
        )
    }
}



