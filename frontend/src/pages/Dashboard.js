import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { Chart } from "react-google-charts";
import './navbar.css'
import styles from "./dashboard.module.css"

import UserContext from "../contexts/User/UserContext";

const options = {
    hAxis: {
        title: 'Time (ms)',
    },
    vAxis: {
        title: 'Angle ( °)',
    },
};

var data = [
    ['time', 'Current Angle', 'Target angle'],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
]

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: '',
            email: '',
            k_p: '',
            k_i: '',
            k_d: '',
            users: [],
            label: [],
            data1: [],
            data2: [],
            graphstate: [['time', 'Current Angle', 'Target angle'], [1, 1, 1]]
        };
        this.handleAngle = this.handleAngle.bind(this);
        this.handlekp = this.handlekp.bind(this);
        this.handleki = this.handleki.bind(this);
        this.handlekd = this.handlekd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => {
    //         axios.get('/api/getData')
    //             .then(response => {
    //                 data = response.data
    //                 console.log(data)
    //                 data = data.map(el => el.map(Number))
    //                 data.unshift(['time', 'Current Angle', 'Target angle'])
    //                 this.setState({ graphstate: data })
    //             })
    //     }, 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    handleAngle(event) {
        this.setState({ angle: event.target.value });
    }

    handlekp(event) {
        console.log("K_p : " + String(event.target.value))
        if (event.target.value > 0) {
            this.setState({ k_p: event.target.value });
        } else {
            this.setState({ k_p: '' })
        }
    }

    handleki(event) {
        console.log("K_i : " + String(event.target.value))
        console.log(typeof (event.target.value))
        if (event.target.value > 0) {
            this.setState({ k_i: event.target.value });
        } else {
            this.setState({ k_i: '' })
        }
    }

    handlekd(event) {
        console.log("K_d : " + String(event.target.value))
        if (event.target.value > 0) {
            this.setState({ k_d: event.target.value });
        } else {
            this.setState({ k_d: '' })
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const newAngle = {
            angle: this.state.angle
        }
        let temp = this.state.angle.length > 0;
        if (temp) {
            axios.post('/api/sendData', newAngle)
                .then(res => {
                    console.log("Angle Sent");
                    console.log(res);
                    this.setState({ angle: '' })
                })
                .catch(err => {
                    console.log("Failed to Send Angle, Check connection");
                });
        }
    }
    render() {
        console.log(this.state.graphstate)
        return (<>
            <UserContext.Consumer>
                {context => (
                    <div>
                        <div id="navbar">
                            <a class="active" href="/">Home</a>
                            <a href="#" onClick={() => context.handleLogout()}>Logout</a>
                        </div>
                        <div className={styles.charts}>
                            <Chart
                                width={'100%'}
                                height={'420px'}
                                chartType="LineChart"
                                data={this.state.graphstate}
                                options={options}
                            />
                        </div>
                        <div className={styles.firstDivistion}>
                            <form onSubmit={this.onSubmit}>
                                <table className={styles.table}>
                                    <tr>
                                        <td>
                                            <Form.Group size="lg" controlId="email">
                                                <label>
                                                    Angle (&deg;) :
                                                </label>
                                                <Form.Control autoFocus type="string" value={this.state.angle}
                                                    onChange={this.handleAngle} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group size="lg" controlId="email">
                                                <label>
                                                    K<sub> p</sub> :
                                                </label>
                                                <Form.Control autoFocus type="string" value={this.state.k_p}
                                                    onChange={this.handlekp} />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Group size="lg" controlId="email">
                                                <label>
                                                    K<sub> i</sub> :
                                                </label>
                                                <Form.Control autoFocus type="string" value={this.state.k_i}
                                                    onChange={this.handleki} />
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Group size="lg" controlId="email">
                                                <label>
                                                    K<sub> d</sub> :
                                                </label>
                                                <Form.Control autoFocus type="string" value={this.state.k_d}
                                                    onChange={this.handlekd} />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.button_td} colSpan='2'>
                                            <Button className={styles.button} block size="lg" type="submit" value="send" id="btn_1">
                                                Send
                                            </Button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                        <div className={styles.secondDivistion}>
                            <iframe
                                src="https://player.twitch.tv/?channel=esw_project&parent=esw-team4.herokuapp.com"
                                height="100%"
                                width="100%"
                                allowfullscreen="true"
                            >
                            </iframe>
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default Main;
