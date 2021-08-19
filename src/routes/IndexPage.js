import { useEffect, useState } from "react";
import { connect } from "dva";
import SizeSelector from "../components/SizeSelect";
import {
  Select,
  Card,
  Row,
  Col,
  Button,
  Drawer,
  Modal,
  message,
  Spin,
} from "antd";
import GoodsCard from "../components/GoodsCard";
import "./indexPage.less";

function IndexPage({ dispatch, Products, Cart }) {
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { Meta } = Card;
  const getCount = (count = 0) => {
    Cart.forEach((item) => {
      count += item.num;
    });
    return count;
  };
  //获取总金额
  const getSubTotalPrice = () => {
    let price = 0;
    Cart.forEach((item) => {
      price += item.num * item.price;
    });
    return price;
  };
  //获取最大分期
  const getInstallments = () => {
    let installments = 0;
    Cart.forEach((item) => {
      installments =
        item.installments > installments ? item.installments : installments;
    });
    return installments;
  };
  useEffect(() => {
    dispatch({
      type: "Products/Initialize",
    });
  }, []);

  let handleChange = (value) => {
    dispatch({
      type: "Products/Initialize",
      payload: { type: "stor", payload: value },
    });
  };
  //显示购物车
  const showDrawer = (item) => {
    setVisible(true);
    dispatch({
      type: "Cart/pushGoods",
      payload: item,
    });
  };
  //关闭购物车
  const onClose = () => {
    setVisible(false);
  };
  // 显示购物车
  const onOpen = () => {
    setVisible(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  // 是否结算
  const handleOk = () => {
    if (Cart && Cart.length > 0) {
      setIsModalVisible(false);
      dispatch({
        type: "Cart/empty",
        payload: "",
      });
      setVisible(false);
      message.success("结算成功");
    } else {
      message.error("请添加商品");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div
      style={{ padding: "20px 2%", maxWidth: "1200px", margin: "50px auto 0" }}
    >
      <div
        style={{
          position: "fixed",
          right: "0",
          top: "0",
          backgroundColor: "#000",
          padding: "10px",
          cursor: "pointer",
          zIndex: "11",
        }}
        onClick={onOpen}
      >
        <img
          src={require("../assets/shopCart.png")}
          alt=""
          style={{ width: "40px" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "9px",
            fontSize: "12px",
            backgroundColor: "#eabf00",
            color: "#0c0b10",
            lineHeight: "18px",
            width: "18px",
            textAlign: "center",
            borderRadius: "50%",
          }}
        >
          {getCount()}
        </div>
      </div>
      <Row>
        <Col xs={24} sm={4} md={4} lg={4} xl={4}>
          <SizeSelector />
        </Col>
        <Col xs={24} sm={20} md={20} lg={20} xl={20}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <div> {Products.products?.length} Product(s) found.</div>
              <div>
                Order by
                <Select
                  defaultValue="Select"
                  style={{ width: "170px", marginLeft: "10px" }}
                  onChange={handleChange}
                >
                  <Option value={1}>Select</Option>
                  <Option value={2}>Lowest to highest</Option>
                  <Option value={3}>Highest to lowest</Option>
                </Select>
              </div>
            </div>
            <Row style={{ marginTop: "20px" }} gutter={[0, 16]}>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  display: !(Products.products?.length > 0) ? "" : "none",
                }}
              >
                <Spin
                  size="large"
                  spinning={!(Products.products?.length > 0)}
                />
              </div>
              {Products.products?.map((item) => {
                return (
                  <Col
                    key={item.id}
                    xs={12}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    style={{ position: "relative" }}
                  >
                    {item.isFreeShipping ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "#ececec",
                          backgroundColor: "#1b1a20",
                          top: "10px",
                          right: "10px",
                          zIndex: "10",
                          padding: "5px",
                          fontSize: "12px",
                        }}
                      >
                        Free shipping
                      </div>
                    ) : (
                      ""
                    )}
                    <Card
                      className="card"
                      bodyStyle={{ padding: " 20px" }}
                      hoverable
                      style={{ margin: "0 5px" }}
                      onClick={() => {
                        showDrawer(item);
                      }}
                      cover={
                        <img
                          src={require(`../assets/${item.id + 1}.jpg`)}
                          style={{ width: "100%" }}
                        />
                      }
                    >
                      <Meta
                        title={
                          <div
                            style={{
                              textAlign: "center",
                              whiteSpace: "pre-wrap",
                              height: "45px",
                              position: "relative",
                              margin: "10px",
                            }}
                          >
                            {item.title}
                            <div
                              style={{
                                height: "2px",
                                width: "20px",
                                backgroundColor: "#eabf00",
                                position: "absolute",
                                bottom: "-8px",
                                left: "50%",
                                marginLeft: "-10px",
                              }}
                            ></div>
                          </div>
                        }
                        description={
                          <div style={{ textAlign: "center" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div>Size：</div>
                              {item.availableSizes.map((size, index) => {
                                return (
                                  <div key={index} style={{ margin: "0 " }}>
                                    {index > 0 ? "，" : ""} {size}{" "}
                                  </div>
                                );
                              })}
                            </div>
                            <div
                              style={{ textAlign: "center", color: "#1b1a20" }}
                            >
                              ${" "}
                              <span
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              >
                                {item.price.toFixed(2)}
                              </span>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              or {item.installments}X $
                              {(item.price / item.installments).toFixed(2)}
                            </div>
                            <Button
                              className="btn1"
                              size="large"
                              style={{
                                marginTop: "10px",
                                width: "100%",
                                backgroundColor: "#1b1a20",
                                color: "#fff",
                              }}
                            >
                              Add to cart
                            </Button>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
      <Drawer
        placement="right"
        className="drawer"
        mask={false}
        closable={false}
        onClose={onClose}
        visible={visible}
        closable={true}
        width={document.body.clientWidth <= 650 ? "100%" : 450}
        footerStyle={{ border: "0", padding: "0" }}
        closeIcon={visible ? <div className="close">X</div> : ""}
        drawerStyle={{ backgroundColor: "#1b1a20", color: "#ececec" }}
        bodyStyle={{ padding: "0" }}
        footer={
          <div style={{ backgroundColor: "#1b1a20", padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>SUBTOTAL</div>
              <div>
                <div style={{ color: "#eabf00", fontSize: "22px" }}>
                  $ {getSubTotalPrice().toFixed(2)}
                </div>
                {getInstallments() ? (
                  <div>
                    OR UP TO {getInstallments()} X ${" "}
                    {(getSubTotalPrice() / getInstallments()).toFixed(2)}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Button
                className="hover"
                size="large"
                style={{
                  width: "100%",
                  backgroundColor: "#0c0b10",
                  color: "#ececec",
                  border: "0",
                }}
                onClick={showModal}
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        }
      >
        <div
          style={{
            margin: "10px 0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={require("../assets/shopCart.png")}
              alt=""
              style={{
                width: "40px",
                marginRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-3px",
                right: "9px",
                fontSize: "12px",
                backgroundColor: "#eabf00",
                color: "#0c0b10",
                lineHeight: "18px",
                width: "18px",
                textAlign: "center",
                borderRadius: "50%",
              }}
            >
              {getCount()}
            </div>
          </div>

          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Cart</div>
        </div>
        {Cart?.length > 0 ? (
          Cart.map((item, index) => <GoodsCard record={item} key={item.id} />)
        ) : (
          <div
            style={{
              color: "#fff",
              textAlign: "center",
              padding: "20px 0",
              fontSize: "20px",
            }}
          >
            Add some products in the cart
            <br />
            :)
          </div>
        )}
      </Drawer>
      <Modal
        title="结算"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Checkout - Subtotal: $ {getSubTotalPrice().toFixed(2)}
      </Modal>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect(({ Products, Cart }) => ({
  Products,
  Cart,
}))(IndexPage);
