
import { Modal, Radio, Input, Button, Space } from "antd"
import {
	LoadingOutlined,
} from '@ant-design/icons';

const CancelReasonsModal = (props) => {
    let { cancelReasonModal, setCancelReasonModal, cancelSubmit, radio, handleRadio,  cancelReason, loading} = props
    const { TextArea } = Input

    return (
		<Modal
        visible={cancelReasonModal}
        footer={null}
        onCancel={() => setCancelReasonModal(false)}
        style={{ top: 20 }}
        >
            <p className=" text-lg f-w-600">Select one of the reason below?</p>
            <div className="py-4">
            <form onSubmit={cancelSubmit}>
                <Radio.Group name="cancel_reasons_id" defaultValue={radio} onChange={handleRadio}>
                    <Space direction="vertical">
                        {
                            cancelReason?.map((res, key) => (
                                <Radio value={res.id}  key={key} >{res.title} </Radio>
                            ))
                        }
                        <Radio value={5}>Other</Radio>
                    </Space>
                
                </Radio.Group>
                {
                    radio === 5 ?
                    <TextArea
                    required={true}
                    className="mt-2"
                    rows={3}
                    name={"custom_cancel_reason"}
                    placeholder="Enter Reason Here"
                    /> : null
                }

                <Button block type="primary" className="mb-0 mt-3" htmlType="submit">
                   {loading ? <LoadingOutlined /> : "Submit"}
                </Button>
            </form>
                    
            </div>
        </Modal>
    )
}

export default CancelReasonsModal