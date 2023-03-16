import { Modal } from "antd";
import ReactPlayer from "react-player";

const HotspotModal = ({ showModal, setShowModal, answser, title }) => {
  return (
    <>
      <Modal
        className=""
        style={{ backgroundColor: "transparent" }}
          bodyStyle={{
            backgroundImage: "url('/images/papper.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
          }}
        title={null}
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        widht={720}
        footer={null}
      >
        <div className="modal-description">
          <h3>{title}</h3>
          <hr/>
          {answser}
        </div>
      </Modal>
    </>
  );
};

export default HotspotModal;