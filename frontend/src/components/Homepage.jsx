import React from 'react'
import Navbar from './Navbar'
import { Card, Col, Row, Rate } from 'antd';
const { Meta } = Card;

export default function Homepage() {
    return (
        <div>
            <Navbar />
            
                <Row gutter={16} justify="center" align="middle" style={{ textAlign: 'center', margin: "50px 0" }}>
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                    
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                </Row>
                <Row gutter={16} justify="center" align="middle" style={{ textAlign: 'center' }}>
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                    
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                    <Col span={4}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                        title="Europe Street beat"
                        description={
                        <div>
                            <Rate allowHalf defaultValue={3.5} />
                            <div style={{ marginTop: '8px' }}>Price: $19.99</div>
                        </div>
                        }
                    />
                    </Card>
                    </Col>
                </Row>
            
        </div>
    )
}
