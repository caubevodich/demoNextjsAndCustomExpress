// import React from 'react'
// import Link from 'next/link'

// export default () => (
//   <ul>
//     <li><Link href='/b' as='/a'><a>a</a></Link></li>
//     <li><Link href='/a' as='/b'><a>b</a></Link></li>    
//     <li><Link href='/c' ><a>c</a></Link></li>    
//   </ul>
// )

import React, { Component } from "react";
import Router from "next/router";
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2'


export default class Index extends Component {

    
    componentDidMount(){
        console.log("RUN THIS")
        Router.push("/reactweb/app"); // bản chất next/router này là render file trong pages , có thể dùng nó dể chuyển đển route của express được

    };
    render() {
        return (
            <div>INDEX PAGE              
            </div>
        );
    }
}
