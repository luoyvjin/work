import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import "./index.less";
import { connect } from "dva";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  }
  handleMouseOver = () => {
    this.setState({
      mouseOver: true,
    });
  };
  handleMouseOut = () => {
    this.setState({
      mouseOver: false,
    });
  };
  // 删除商品
  deleteGoods = (record) => {
    this.props.dispatch({
      type: "Cart/deleteGoods",
      payload: record,
    });
  };
  // 商品减法
  reductionGoods = (record) => {
    this.props.dispatch({
      type: "Cart/reduction",
      payload: record,
    });
  };
  // 商品加法
  addGoods = (record) => {
    this.props.dispatch({
      type: "Cart/pushGoods",
      payload: record,
    });
  };
  render() {
    const item = this.props.record;
    const { mouseOver } = this.state;
    return (
      <Row
        key={item.id}
        style={{
          position: "relative",
          backgroundColor: mouseOver ? "#0c0b10" : "",
          padding: "20px",
        }}
      >
        <div className="line"></div>
        <div
          className="delete"
          onClick={() => {
            this.deleteGoods(item);
          }}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          X
        </div>
        <Col span={5}>
          <img
            src={require(`../../assets/${item.id + 1}.jpg`)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={14} style={{ paddingLeft: "20px" }}>
          <div className={mouseOver ? "deleteLine" : ""}>{item.title}</div>
          <div className={mouseOver ? "deleteLine" : ""}>
            {item.availableSizes[0]} | {item.style}
          </div>
          <div className={mouseOver ? "deleteLine" : ""}>
            Quantity：{item.num}
          </div>
        </Col>
        <Col span={5} style={{ marginTop: "40px", textAlign: "right" }}>
          <div
            className={mouseOver ? "deleteLine" : ""}
            style={{ color: "#eabf00", fontSize: "16px" }}
          >
            $ {item.price.toFixed(2)}
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              size="small"
              className="btn"
              style={{ marginRight: "2px" }}
              disabled={item.num === 1}
              onClick={() => {
                this.reductionGoods(item);
              }}
            >
              -
            </Button>
            <Button
              size="small"
              className="btn"
              onClick={() => {
                this.addGoods(item);
              }}
            >
              +
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect(({ Products, Cart }) => ({ Products, Cart }))(index);
