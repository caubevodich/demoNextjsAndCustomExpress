import React, { Component } from "react";
import Router from "next/router";
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2'

import { host } from '../../api/connectApi';
import { getUserInfo } from '../../api/user';

//import "../../public/css/theme-03.css"

class App extends Component {

    // static getInitialProps({ req, res, query }) {
    //    // console.log(query)
    //     return { data: query };

    // }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            recaptcha: '',
            listUsers : null
        }

    }

   async componentDidMount() {
        const { data } = this.props;
        // console.log(this.props.data)
        if (data.isError) {
            Swal.fire('Oops...', data.error, 'error')
        }

        await this.getInfo();

    }

    getInfo = async () => {
        const user = await getUserInfo();
        this.setState({ listUsers : user.list })
        console.log(user)
    }



    catpchaChange = (value) => {
        //  console.log("Captcha value:", value);
        this.setState({ recaptcha: value })
    }

    postForm = (path, params, method = 'post') => {
        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        const form = document.createElement('form');
        form.method = method;
        form.action = path;
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }
        document.body.appendChild(form);
        form.submit();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password, recaptcha } = this.state;
        this.postForm('/signin', { username: username, password: password, recaptcha: recaptcha });
        $('#btnSignIn').attr('disabled', 'disabled');  //jquery
    }

    render() {
        return (
            <div>
                <div className="forny-container">
                    <div className="forny-inner">
                        <div className="forny-form">
                            <div className="mb-8 text-center forny-logo">
                                <Link href='/' ><img src={require('../../public/images/logo-03.svg')} /></Link>
                            </div>
                            <div className="text-center">
                                <h4>Login into account</h4>
                                <p className="mb-10">Use your credentials to access your account.</p>
                            </div>
                            <form>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="18" height="24" viewBox="0 0
                                            18 24">
                                                    <g transform="translate(-61.127)">
                                                        <g
                                                            transform="translate(61.127)">
                                                            <path
                                                                d="M75.6,15.584A3.128,3.128,0,0,1,72.452,12.7a5.374,5.374,0,0,0,1.229-1.234,7.564,7.564,0,0,0,1.331-3.524.537.537,0,0,0,.134-.191,5.891,5.891,0,0,0,.445-2.264A5.275,5.275,0,0,0,70.574,0a4.6,4.6,0,0,0-2.088.5,3.62,3.62,0,0,0-.738.134,4.171,4.171,0,0,0-2.6,2.407,6.062,6.062,0,0,0-.292,3.924,6.386,6.386,0,0,0,.27.831.537.537,0,0,0,.125.185A6.772,6.772,0,0,0,67.8,12.7a3.129,3.129,0,0,1-3.146,2.885,3.689,3.689,0,0,0-3.53,3.706V23.46a.536.536,0,0,0,.532.54H78.595a.536.536,0,0,0,.532-.54V19.291A3.688,3.688,0,0,0,75.6,15.584ZM68.044,1.676a2.588,2.588,0,0,1,.61-.1.526.526,0,0,0,.224-.061,3.576,3.576,0,0,1,1.7-.433,4.2,4.2,0,0,1,3.951,4.41c0,.073,0,.146-.005.218A2.3,2.3,0,0,0,72.862,5H69.234a.974.974,0,0,1-.593-.2,1.006,1.006,0,0,1-.328-.432.649.649,0,0,0-.645-.413.656.656,0,0,0-.592.5,5.033,5.033,0,0,1-1.2,2.188C65.336,4.406,66.3,2.187,68.044,1.676Zm-.463,9.346a6.408,6.408,0,0,1-1.29-3.289,6.123,6.123,0,0,0,1.549-2.2A2.083,2.083,0,0,0,68,5.669a2.021,2.021,0,0,0,1.23.414h3.629a1.264,1.264,0,0,1,1.153.76s0,.008,0,.011c0,3.051-1.744,5.532-3.887,5.532A3.315,3.315,0,0,1,67.581,11.022ZM68.8,13.23a3.821,3.821,0,0,0,2.647,0A4.241,4.241,0,0,0,73,15.78l-2.8,4.041a.091.091,0,0,1-.151,0l-2.8-4.042A4.242,4.242,0,0,0,68.8,13.23Zm9.258,9.69H62.192V19.29a2.612,2.612,0,0,1,2.59-2.629,4.5,4.5,0,0,0,1.553-.333l2.846,4.114a1.153,1.153,0,0,0,.947.5h0a1.153,1.153,0,0,0,.947-.5l2.846-4.113a4.326,4.326,0,0,0,1.552.333,2.612,2.612,0,0,1,2.59,2.629Z"
                                                                transform="translate(-61.127)"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>

                                        <input className="form-control"
                                            name="username" id="usernameLogin" type="username" autoComplete="off" value={this.state.username}
                                            placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })}></input>

                                    </div>
                                </div>

                                <div className="form-group password-field">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="16" height="24" viewBox="0 0
                                            16 24">
                                                    <g transform="translate(0)">
                                                        <g transform="translate(5.457
                                                    12.224)">
                                                            <path
                                                                d="M207.734,276.673a2.543,2.543,0,0,0-1.749,4.389v2.3a1.749,1.749,0,1,0,3.5,0v-2.3a2.543,2.543,0,0,0-1.749-4.389Zm.9,3.5a1.212,1.212,0,0,0-.382.877v2.31a.518.518,0,1,1-1.035,0v-2.31a1.212,1.212,0,0,0-.382-.877,1.3,1.3,0,0,1-.412-.955,1.311,1.311,0,1,1,2.622,0A1.3,1.3,0,0,1,208.633,280.17Z"
                                                                transform="translate(-205.191
                                                        -276.673)"></path>
                                                        </g>
                                                        <path
                                                            d="M84.521,9.838H82.933V5.253a4.841,4.841,0,1,0-9.646,0V9.838H71.7a1.666,1.666,0,0,0-1.589,1.73v10.7A1.666,1.666,0,0,0,71.7,24H84.521a1.666,1.666,0,0,0,1.589-1.73v-10.7A1.666,1.666,0,0,0,84.521,9.838ZM74.346,5.253a3.778,3.778,0,1,1,7.528,0V9.838H74.346ZM85.051,22.27h0a.555.555,0,0,1-.53.577H71.7a.555.555,0,0,1-.53-.577v-10.7a.555.555,0,0,1,.53-.577H84.521a.555.555,0,0,1,.53.577Z"
                                                            transform="translate(-70.11)"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>

                                        <input className="form-control"
                                            name="password" id="passwordLogin" type="password" autoComplete="off"
                                            placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })}></input>

                                        <div className="input-group-append cursor-pointer">
                                            <span className="input-group-text">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="16" viewBox="0 0
                                            24 16">
                                                    <g transform="translate(0 0)">
                                                        <g transform="translate(0 0)">
                                                            <path
                                                                d="M23.609,117.568a15.656,15.656,0,0,0-5.045-4.859,12.823,12.823,0,0,0-6.38-1.811c-.062,0-.309,0-.371,0a12.823,12.823,0,0,0-6.38,1.811,15.656,15.656,0,0,0-5.045,4.859,2.464,2.464,0,0,0,0,2.658,15.656,15.656,0,0,0,5.045,4.859,12.822,12.822,0,0,0,6.38,1.811c.062,0,.309,0,.371,0a12.823,12.823,0,0,0,6.38-1.811,15.656,15.656,0,0,0,5.045-4.859A2.464,2.464,0,0,0,23.609,117.568Zm-17.74,6.489a14.622,14.622,0,0,1-4.712-4.538,1.155,1.155,0,0,1,0-1.245,14.621,14.621,0,0,1,4.712-4.538,12.747,12.747,0,0,1,1.586-.79,8.964,8.964,0,0,0,0,11.9A12.748,12.748,0,0,1,5.869,124.057ZM12,125.75c-3.213,0-5.827-3.074-5.827-6.853s2.614-6.853,5.827-6.853,5.827,3.074,5.827,6.853S15.211,125.75,12,125.75Zm10.841-6.23a14.621,14.621,0,0,1-4.712,4.538,12.737,12.737,0,0,1-1.585.788,8.964,8.964,0,0,0,0-11.9,12.74,12.74,0,0,1,1.587.791,14.622,14.622,0,0,1,4.712,4.538A1.155,1.155,0,0,1,22.839,119.52Z"
                                                                transform="translate(0.002
                                                        -110.897)"></path>
                                                        </g>
                                                        <g transform="translate(9.565
                                                    5.565)">
                                                            <path
                                                                d="M205.24,202.8a2.435,2.435,0,1,0,2.435,2.435A2.438,2.438,0,0,0,205.24,202.8Zm0,3.917a1.482,1.482,0,1,1,1.482-1.482A1.483,1.483,0,0,1,205.24,206.721Z"
                                                                transform="translate(-202.805
                                                        -202.804)"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                <div className="g-recaptcha-outer">
                                    <div className="g-recaptcha-inner">
                                        <ReCAPTCHA size="compact" className="g-recaptcha" name="recaptcha"
                                            sitekey="6LcF5ZQUAAAAAB4Q9oziNtEtpYXvsDVGHiWMYxjx"
                                            onChange={this.catpchaChange}
                                        />

                                    </div>
                                </div>

                                <div className="row mt-6 mb-6">
                                    <div className="col-12 text-right">
                                        <Link href='/forgotpassword'><a>Forgot password?</a></Link>
                                    </div>
                                </div>


                                <div>
                                    <button className="btn btn-primary btn-block" id="btnSignIn" type="submit" onClick={this.handleSubmit}>Login</button>
                                </div>

                            </form>




                            <div className="text-center mt-10">
                                Don't have an account? <Link href='/signup'><a>Register here</a></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.getInitialProps = async ({ req, res, query }) => {
    // const postId = query.postId
    // //  const res = await axios.get(`http://localhost:8000/api/v0/posts/${postId}`);

    // console.log("Param Query : " + postId)
    // return { data: res.data };
    // console.log(query)
    return { data: query };

    // return ctx
};


export default App;