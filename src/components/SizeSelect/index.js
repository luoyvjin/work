import { connect } from "dva";

const SizeSelector = ({ dispatch, Products }) => {
  function handleDelete(item) {
    // dispatch({
    //   type: item.action ? "Size/delete" : "Size/add",
    //   payload: item.name,
    // });
    dispatch({
      type: "Products/Initialize",
      payload: { type: "selected", payload: item.name },
    });
  }
  return (
    <div style={{ fontSize: ".8em" }}>
      <div>
        <div className="title" style={{ fontSize: "20px" }}>
          Size:
        </div>
        <div className="size" style={{ display: "flex", flexWrap: "wrap" }}>
          {Products.size.map((item) => {
            return (
              <div
                style={{
                  width: "35px",
                  lineHeight: "35px",
                  borderRadius: "50%",
                  backgroundColor: item.action ? "#1b1a20" : "#ececec",
                  color: item.action ? "#ececec" : "#1b1a20",
                  textAlign: "center",
                  margin: "10px 5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDelete(item);
                }}
                key={item.name}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center" }}>
          Leave a star on Github if this repository was useful :)
        </div>
      </div>
    </div>
  );
};

export default connect(({ Products }) => ({
  Products,
}))(SizeSelector);
