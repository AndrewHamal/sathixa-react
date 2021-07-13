import SignatureCanvas from 'react-signature-canvas'
import { Modal, Button} from "antd"
import { Modal as modelMobile } from "antd-mobile"
import {
	LoadingOutlined,
} from '@ant-design/icons';

const ModelSign = (props) => { 

    let {isModalVisible, signpad, completeDelivery, handleCancel, clearSign, loading} = props

    const alert = modelMobile.alert;

    return (
        <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            style={{ top: 20 }}
            >
            <p className="text-center text-lg f-w-600">Reciever Signature</p>

                    <SignatureCanvas ref={signpad} penColor='black'
                    canvasProps={{className: 'sigCanvas border rounded my-4'}} />
                    <Button block type="" onClick={clearSign} className="mb-2">
                Clear signature
            </Button>
            <Button disabled={loading} block type="primary"    
                    onClick={() =>
                        alert('Complete Delivery', 'Are you sure???', [
                            { text: 'Cancel', onPress: () => console.log('cancel') },
                            { text: 'Ok', onPress: () => completeDelivery()},
                        ])
                    }
                    className="mb-2">

                    {loading ? <LoadingOutlined /> : "Complete Delivery"}
            </Button>
        </Modal>
        )
}

export default ModelSign