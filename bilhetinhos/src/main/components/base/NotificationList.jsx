import React, { Component } from 'react'
import { NotificationButton, NotificationLink } from './NotificationAction'
import NotificationContent from './NotificationContent'


export default class NotificationList extends Component {
    state = {
        notifications: [
            {
                title: 'Minha linda notificação',
                receivedDate: '30/02/2019',
                description: 'Fulano da Silva quer ser seu amigo',
                sender: 'Bilhetinhos',
                read: false,
                href: '/'
            },
            {
                title: 'Há um problema em sua conta',
                receivedDate: '12/02/2019',
                description: 'Ops... Tem algumas coisas que tu precisa verificar, tche',
                sender: 'Bilhetinhos',
                read: true,
                onClick: () => { alert('PAH!') }
            },
            {
                title: 'Alerta de bilhete!',
                receivedDate: '11/02/2019',
                description: 'Não esquece do nosso trabalho de ciências!',
                sender: 'Fulano da Silva',
                read: true,
                onClick: () => { alert('Alerta de bilhete!') }
            }
        ]
    }


    render() {
        return (
            <div id="popover-notification-content" style={{ display: 'none' }}>
                <div className="overflow-auto" style={{ height: '500px' }}>
                    <div className="list-group">
                        {this.state.notifications.map(n => {
                            if (n.href) {
                                return (
                                    <NotificationLink
                                        key={n.title}
                                        href={n.href}
                                        read={n.read} >
                                        <NotificationContent
                                            title={n.title}
                                            receivedDate={n.receivedDate}
                                            description={n.description}
                                            sender={n.sender} />
                                    </NotificationLink>
                                )
                            } else {
                                return (
                                    <NotificationButton
                                        key={n.title}
                                        onClick={n.onClick}
                                        read={n.read} >

                                        <NotificationContent
                                            title={n.title}
                                            receivedDate={n.receivedDate}
                                            description={n.description}
                                            sender={n.sender} />
                                    </NotificationButton>
                                )
                            }
                        })}
                    </div>
                </div>

            </div>
        )
    }
}
