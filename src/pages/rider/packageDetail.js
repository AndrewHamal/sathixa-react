import { useHistory, Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { Tabs, Skeleton, Modal, Layout, PageHeader, Steps, Button, Space, Radio, Input } from "antd";
import packageimg from "../../assets/vendor/packageimg.svg";
import CanvasDraw from "react-canvas-draw";
import { getPrackageDetail, savePackageSignature, getCancelReason, saveCancelReason } from "@/api/rider/index"
import { packageDetail, storePackageDetail } from "@/reducers/rider/reducers"
import { useDispatch, useSelector } from "react-redux"
import { Toast, Modal as modelMobile } from "antd-mobile";
import DeliverModal from "@/components/rider/DeliverSignModal"
import { dataURLtoFile } from "@/helper/helper"
import CancelReasonsModal from "@/components/rider/CancelReasonModal"

const { TabPane } = Tabs;

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

const PackageRider = () => {

	const { TextArea } = Input

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loader, setLoader] = useState(true);
	const [loading, setLoading] = useState(false);
	const [radio, setRadio] = useState(1);
	const [cancelReason, setCancelReason] = useState(null)
	const [cancelReasonModal, setCancelReasonModal] = useState(false)
	const [canceled, setCancel] = useState(false)
	const [loadingCanc, setLoadingCanc] = useState(false)

	let signpad = useRef()
	const alert = modelMobile.alert;

	const dispatch = useDispatch();
	const packageDetailSelector = useSelector(packageDetail);

	let { id } = useParams();

	function callback(key) {
		console.log(key);
	}

	const canvasDraw = () => {
		return <CanvasDraw
			imgSrc=""
			hideInterface={true}
			loadTimeOffset={5}
			className="sign-draw"
		/>
	}

	const showModal = () => {
		canvasDraw()
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		signpad.current.clear()
	};

	useEffect(() => {
		// pull cancel reason 
		getCancelReason()
			.then(res => {
				setCancelReason(res.data)
			}).catch(err => {
				alert(err.message)
			})

		if (packageDetailSelector === null || packageDetailSelector?.package?.id !== id) {
			getPackageDetail();
		} else {
			setLoader(false)
		}
	}, [])

	const getPackageDetail = () => {
		getPrackageDetail(id)
			.then(res => {
				dispatch(storePackageDetail(res.data))
				setLoader(false)
			}).catch(err => {
				console.log(err)
			})
	}

	const history = useHistory();

	const clearSign = () => {
		signpad.current.clear()
	}

	const completeDelivery = () => {

		setLoading(true)

		if (signpad.current.getTrimmedCanvas().width === 1) {
			Toast.fail('Please add signature to the canvas.')
			setLoading(false)
			return
		}

		let img = signpad.current.getTrimmedCanvas()
			.toDataURL('image/png');

		let formData = new FormData()
		formData.append('package_id', packageDetailSelector?.package?.id);
		formData.append('receiver_signature_image', dataURLtoFile(img, 'signature' + packageDetailSelector?.package?.receiver_name))
		formData.append('receiver_signature_name', packageDetailSelector?.package?.receiver_name)

		savePackageSignature(formData)
			.then(res => {
				Toast.success('Package delivered successfully');
				setIsModalVisible(false);
				clearSign();
				setLoading(false);
				getPackageDetail();

			}).catch(err => {
				Toast.fail('Someting went wrong. please try again');
				setLoading(false)
			})

	}

	// handle radio button change from modal 
	const handleRadio = (e) => {
		setRadio(e.target.value)
	}

	// cancel reason submit 
	const cancelSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData(e.target)
		formData.append('package_id', id);
		setLoadingCanc(true)
		saveCancelReason(formData)
			.then(res => {
				Toast.success(res.data.message)
				setCancelReasonModal(false)
				getPackageDetail();
				setLoadingCanc(false)
			}).catch(err => {
				Object.entries(err?.data?.errors).map(res => {
					Toast.info(res[1][0]);
				})
				setLoadingCanc(false)
			})
	}

	return (
		<Layout>
			<PageHeader
				style={{ position: "fixed", zIndex: 1, width: "100%" }}
				onBack={() => history.goBack()}
				className="site-page-header bg-red"
				title="Package"
			/>

			<Content
				className="site-layout"
				style={{
					padding: "0 14px",
					marginTop: 60,
				}}
			>
				{loader ? <Skeleton active />
					:
					<div className="site-layout-background mb-3">
						<Tabs defaultActiveKey="1" onChange={callback}>
							<TabPane tab={ packageDetailSelector?.cancel_ride !== null ? 'Canceled' : packageDetailSelector.process_step === 3 ? "Delivered" : "Ongoing"} key="1">
								<div className="package-card ">
									<div className="d-flex  flex-wrap">
										<img src={packageimg} alt="" className="width-pack" />
										<table className="table ml-2 my-auto">
											<tbody>
												<tr>
													<td className="font-14 font-weight-600 text-capitalize">
														{packageDetailSelector?.package?.vendor?.first_name + ' ' + packageDetailSelector?.package?.vendor?.last_name}
													</td>
													<td className="font-14 font-weight-600 text-align-end pl-1">
														x {packageDetailSelector?.package?.no_of_package}
													</td>
												</tr>
												<tr>
													<td className="p-small">Categories</td>
													<td className="p-small p-small-sharp ">
														{packageDetailSelector?.package?.category?.title}
													</td>
												</tr>
												<tr>
													<td className="p-small">Weight</td>
													<td className="p-small p-small-sharp ">{packageDetailSelector?.package?.weight}KG</td>
												</tr>
												<tr>
													<td className="p-small font-14">Price</td>
													<td className="vendor-package-price font-14  ">
														Rs {packageDetailSelector?.package?.product_price}
													</td>
												</tr>
											</tbody>
										</table>
										<div className="my-auto ml-auto">
											{	
												packageDetailSelector?.cancel_ride !== null ?
												<p className="status-success font-12 text-danger">Canceled</p> :
												packageDetailSelector.process_step == 3 ?
												<p className="status-success font-12 text-success">Delivered</p>
												: <p className="status-active font-12 text-warning">Processing</p>
											}
										</div>
									</div>
								</div>

								{
									packageDetailSelector.process_step !== 3 &&
									packageDetailSelector?.cancel_ride !== null ?
										<Button onClick={() => setCancelReasonModal(true)} type="" block className="my-2">
											Cancel Pickup
									</Button>
										: ''
								}

								{/* //Additional Info Section */}

								{
									packageDetailSelector?.package?.special_instruction !== null ?
										<section>
											<p className="mt-2 mb-1 font-12">Additional Information</p>
											<div className="package-card ">
												<p className="add-info ">
													{packageDetailSelector?.package?.special_instruction}
												</p>
											</div>
										</section> : ''
								}

								{/* //payment details info */}
								<section className="package-card my-2">
									<div className="d-flex justify-content-between">
										<p className="p-location-14">Delivery Charge</p>
										<p className="p-location-14 ">Rs 200</p>
									</div>
									<div className="d-flex justify-content-between pt-3">
										<p className="p-location-14 text-red">Total</p>
										<p className="p-location-14 text-red">{parseInt(packageDetailSelector?.package?.product_price) + parseInt(200)}</p>
									</div>
								</section>

								{
									packageDetailSelector?.cancel_ride === null ?
									<section>
										<p className="mt-3 mb-1 font-12">Reciever Info</p>
										<div className="package-card ">
											<div className="d-flex">
												<i className="fas fa-user-alt mr-2 d-p-color fa-xs my-auto "></i>
												<p className="f-w-600">{packageDetailSelector?.package?.receiver_name}</p>
											</div>
											<div className="d-flex mt-3 pb-2">
												<i className="fas fa-phone-alt mr-2 d-p-color fa-xs my-auto  "></i>
												<p className="f-w-600">{packageDetailSelector?.package?.receiver_phone}</p>
											</div>
											{packageDetailSelector.process_step !== 3 &&
												packageDetailSelector?.accepted_package?.cancel_reasons_id === null
												&& packageDetailSelector?.accepted_package?.custom_cancel_reason === null
												?
												<Button
													type=""
													block
													className="my-2"
													onClick={showModal}
												>
													Add Signature
											</Button>
												: ""}
										</div>
									</section>
								: null}

								{
									packageDetailSelector?.cancel_ride === null ?
									<div className="d-flex" style={packageDetailSelector.process_step !== 3 ? { padding: "0 13px" } : {}}>
										<a className="mr-1 w-100" href={`tel:${packageDetailSelector?.package?.receiver_phone}`}>
											<Button type="primary flex-fill w-100 " className="my-2">
												<i className="fas fa-phone-volume pr-2 text-white"></i>
												Call Vendor
											</Button>
										</a>
										<Button type="default flex-fill w-100 ml-1" className="my-2">
											<i className="far fa-comment-dots pr-2"></i>
											Message
										</Button>
									</div> : null
								}
							
							</TabPane>

						</Tabs>
					</div>
				}
			</Content>

			<DeliverModal
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
				signpad={signpad}
				loading={loading}
				clearSign={clearSign}
				completeDelivery={completeDelivery}
			/>

			<CancelReasonsModal
				cancelReasonModal={cancelReasonModal}
				setCancelReasonModal={setCancelReasonModal}
				cancelSubmit={cancelSubmit}
				radio={radio}
				handleRadio={handleRadio}
				cancelReason={cancelReason}
				loading={loadingCanc}
			/>

		</Layout>
	);
};

export default PackageRider;
