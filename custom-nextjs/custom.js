const express = require('express');
const next = require('next');
const path = require('path');
const url = require('url');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fetch = require('node-fetch');

const { check, validationResult } = require('express-validator');

const dev = process.env.NODE_ENV !== 'production';

module.exports = function (app) {

    //Multi - process to utilize all CPU cores.
    // if (!dev && cluster.isMaster) {
    //     console.log(`Node cluster master ${process.pid} is running`);

    //     // Fork workers.
    //     for (let i = 0; i < numCPUs; i++) {
    //         cluster.fork();
    //     }

    //     cluster.on('exit', (worker, code, signal) => {
    //         console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    //     });

    // } else {

    // }
    const nextApp = next({ dir: '.', dev });
    const nextHandler = nextApp.getRequestHandler();

    nextApp.prepare()
        .then(() => {

            if (!dev) {
                // Enforce SSL & HSTS in production
                app.use(function (req, res, next) {
                    var proto = req.headers["x-forwarded-proto"];
                    if (proto === "https") {
                        res.set({
                            'Strict-Transport-Security': 'max-age=31557600' // one-year
                        });
                        return next();
                    }
                    res.redirect("https://" + req.headers.host + req.url);
                });
            }

            // Static files
            // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
            app.use('/public', express.static(path.join(__dirname, 'public'), {
                maxAge: dev ? '0' : '365d'
            }));


            app.get('/', (req, res) => {
                return nextApp.render(req, res, '/', req.query)
            })

            app.post('/getUser', (req, res) => {
                const array = [{ id: 1, name: 'Huy' }, { id: 2, name: 'Thuong' }]
                res.json({ isOk: true, list: array })
            })




            app.get('/post/:postId', async (req, res) => {

                const portId = req.params.postId;
                // const portId2 = req.query.postId;

                //console.log(portId, portId2)
                return nextApp.render(req, res, '/reactweb/app', { postId: portId, fetch: [{ isSuccess: true }] })

            });


            app.get('/a', (req, res) => {
                console.log("ABC")
                return nextApp.render(req, res, '/reactweb/app', req.query)
            })

            app.post('/signin',
                //validate trên server
                [
                    check('username').notEmpty().withMessage('username not empty'),
                    check('password').notEmpty().withMessage('password not empty'),
                    check('recaptcha').custom((value, { req }) => {
                        //  console.log(req.recaptcha)
                        if (value === process.env.CAPTCHA_VALUE) {
                            //  throw new Error('Password confirmation is incorrect');
                            return false;
                        } return true;
                    }).withMessage('Recaptcha is required '),
                ], (req, res) => {

                    const errors = validationResult(req);
                    const username = req.body['username'];
                    const password = req.body['password'];

                    // console.log(errors)


                    if (!errors.isEmpty()) {

                        return nextApp.render(req, res, '/reactweb/app', { isError: true, error: errors.errors[0].msg })
                    }
                    // return nextApp.render(req, res, '/dashboard', { isError : false , error: null })
                    return res.redirect('/dashboard');
                })

            app.get('/dashboard', (req, res) => {
                return nextApp.render(req, res, '/dashboard', req.query)
            })

            // app.get('/reactweb/app', (req, res) => {
            //     console.log("huydsaud")
            //     return nextApp.render(req, res, '/reactweb/app', req.query)
            // })

            const withoutRouteNext = [
                ///// Get Route Nextjs to secure /////////////
                // '/reactweb/app',
                '/dashboard'
            ]

            app.get(withoutRouteNext, (req, res) => {
                return res.send('i am a beautiful butterfly');
            })




            // Default catch-all renders Next app
            app.get('*', (req, res) => {
                // res.set({
                //   'Cache-Control': 'public, max-age=3600'
                // });                
                const parsedUrl = url.parse(req.url, true);
                nextHandler(req, res, parsedUrl);
            });

        });
}