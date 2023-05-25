import React, { useState } from 'react';
import { useGetProductsLimitQuery } from '../../api/apiSlice'

import DashboardItem from './DasboardItem';

import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const DashboardPage = () => {
    const [page, setPage] = useState(0);

    const {
        data: product = [],
        isLoading,
        isSuccess,
        isError,
        error } = useGetProductsLimitQuery(page);
    let content;

    if (isLoading) {
        content = (<Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" width='5rem' height='5rem' />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>)
    }
    if (isSuccess) {
        const rows = [...Array(Math.ceil(product.rows.length / 2))];
        const productRows = rows.map((row, index) => product.rows.slice(index * 2, index * 2 + 2));

        content = productRows.map((row, index) => (
            <div className="row" key={index}>
                {row.map((item, index) => (
                    <div className="col mt-3" style={{ display: "flex", justifyContent: "center" }} key={index}>
                        <DashboardItem product={item} key={item.product_id} />
                    </div>
                ))}
            </div>));
    } else if (isError) {
        content = <div>
            {error.toString()}
        </div>
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="grid">
                {content}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", padding: "2rem" }}>
                <Button
                    disabled={page <= 0}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Prev
                </Button>
                <Button
                    disabled={product.length < 8}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </div >
    );
};

export default DashboardPage;
