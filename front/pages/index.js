import Head from 'next/head'
import styles from '../styles/Home.module.css'

import fetch from 'isomorphic-unfetch';
import Router from "next/router";

export default function Home({data, page}) {
    let hasNextPage =  () => {
        return data && data.nextPage !== undefined ? (<button className="btn btn-success mb-5"  onClick={() => Router.push(`?page=${parseInt(page) +1}`)}> > </button>) : '';
    }
    let hasPreviousPage =  () => {
        return data && data.previousPage !== undefined ? (<button className={`btn btn-success mb-5 float-right`} onClick={() => Router.push(`?page=${parseInt(page) -1}`)}> {'<'}</button>) : '';
    }

    let getProducts = async (page) => {
        return await fetch(`http://localhost:4000/api/products/all?limit=5&page=${page}`);
    }
    Home.getInitialProps = async ({query: { page = 1}}) => {
        const res = await getProducts(page);
        const data = await res.json();
        return {
            data,
            page
        };

    };
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                      crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                        crossOrigin="anonymous"></script>
            </Head>

            <div className="container mt-5">
                <div className="row mb-5">
                    <div className="col text-center">
                        <span className={styles.title}><strong>ALL PRODUCTS</strong></span>
                    </div>
                </div>
                {
                    data &&
                    data.data.map((product) => (
                        <div key={product._id} className="row p-2 mb-5 bg-white border rounded">
                            <div className="col-md-3 mt-1">
                                <img className={`img-fluid img-responsive rounded ${styles.productImage}`}
                                     src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"/>
                            </div>
                            <div className="col-md-6 mt-1">
                                <h5>{product.name}</h5>
                                <div className="d-flex flex-row">
                                    <div className={`${styles.ratings} mr-2`}><i className="fa fa-star"></i><i
                                        className="fa fa-star"></i><i
                                        className="fa fa-star"></i><i className="fa fa-star"></i></div>
                                </div>
                                <p>Quis lectus nulla at volutpat diam ut venenatis tellus. Ut sem nulla
                                    pharetra diam sit amet. Orci porta non pulvinar neque laoreet. Pellentesque id nibh
                                    tortor id
                                    aliquet lectus. Amet risus nullam eget felis eget. Congue nisi vitae suscipit tellus
                                    mauris a
                                    diam maecenas sed. Enim blandit volutpat maecenas volutpat blandit aliquam etiam.
                                    Parturient
                                    montes nascetur ridiculus mus mauris vitae..
                                </p>

                            </div>
                            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                                <div className="d-flex flex-row align-items-center">
                                    <h4 className="mr-1">${product.price}</h4>
                                </div>
                                <h6 className="text-success">Free shipping</h6>
                            </div>

                        </div>
                    ))
                }
                <div className="row">
                    <div className="col">
                        {
                            hasPreviousPage()
                        }
                    </div>
                    <div className="col">
                        {
                            hasNextPage()
                        }
                    </div>
                </div>
            </div>

            <footer className="footer">
            </footer>
        </div>
    )
}
