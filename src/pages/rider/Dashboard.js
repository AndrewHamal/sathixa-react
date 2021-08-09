import "leaflet/dist/leaflet.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Avatar,Button, Image, message } from "antd";
import Layout from "antd/lib/layout/layout";
import MyMap from "@/components/maps/MyMap";
import { Modal, Toast } from 'antd-mobile';
import { acceptPackage, onGoingPackage, updateRiderStatus, savePackageSignature, getCancelReason, saveCancelReason } from "@/api/rider/index"
import DialogSign from "@/components/rider/DeliverSignModal"
import { dataURLtoFile } from "@/helper/helper"
import { storePackageAlert, packageAlertData } from "@/reducers/rider/reducers"
import { useSelector, useDispatch } from "react-redux";
import { PhoneOutlined } from '@ant-design/icons';
import CancelReasonsModal from "@/components/rider/CancelReasonModal"
import Countdown from "react-countdown";

function confirm(e) {
  message.success("Click on Yes");
}

function cancel(e) {
  message.error("Click on No");
}

const RiderAccept = (props) => {
  let { mainHistory } = props
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [packageAlert, setPackageAlert] = useState(null);
  const [statusPackage, setStatusPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [refetch, setRefetch] = useState(0);
	const [loadingCanc, setLoadingCanc] = useState(false)
  const [cancelReasonModal, setCancelReasonModal] = useState(false)
  const [cancelReason, setCancelReason] = useState(null)
  const [radio, setRadio] = useState(1);
  
  let signpad = useRef();
  const dialogAccept = useRef();
  const showButtonRef = useRef();

  const packageAlert = useSelector(packageAlertData)
  
  const alert = Modal.alert;

  const history = useHistory();

  useEffect(() => {
    let isMounted = true

    if(isMounted){
      if(packageAlert === null)
        fetchRecentPackage()
      else{
        setLoading(false)
        setTimeout(() => {
          setRefetch(refetch + 1);
        }, 200)
    
      }
    }

    return () => { isMounted = false }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageAlert])

  function fetchRecentPackage() {
    onGoingPackage(1)
    .then(res => {
      if(res.data.data.length == 0){
        dispatch(storePackageAlert(null))
        setStatusPackage(null);
        setRefetch(refetch + 1);
        setLoading(false);
        return
      }

      dispatch(storePackageAlert(res.data.data[0].package))
      setStatusPackage(res.data.data[0]);
      setRefetch(refetch + 1);
      setLoading(false);
    }).catch(err => {
      Toast.fail('someting went wrong')
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false);
		signpad.current.clear()
  };

  const riderAcceptPackage = (id) => {
 
    if(id == 0){
      let formData = new FormData();
      formData.append('process_step', 1);
      formData.append('package_id', packageAlert.id);
      formData.append('_method', 'PATCH');

      updateRiderStatus(statusPackage.id, formData)
      .then(res => {
        Toast.success('Okay! going to pickup the package')
        fetchRecentPackage()
      }).catch( err => {
        console.log(err)
        Toast.success('Something went wrong!')
      })
      return 
    }

    if(id == 1){
      let formData = new FormData();
      formData.append('process_step', 2);
      formData.append('package_id', packageAlert.id);
      formData.append('_method', 'PATCH');

      updateRiderStatus(statusPackage.id, formData)
      .then(res => {
        Toast.success('Successfully picked up the package')
        fetchRecentPackage()
      }).catch( err => {
        console.log(err)
        Toast.success('Something went wrong!')
      })
      return 
    }

    if(id == 2){
      setIsModalVisible(true)
      return 
    }

    acceptPackage(packageAlert.id)
    .then(res => {
      Toast.success('hurray!!! Package is successfully accepted');
      dispatch(storePackageAlert(null))
      fetchRecentPackage();
    }).catch(err => {
      Toast.fail(err.response.data.message)
    })
  }

  // updateRiderStatus
  function handleDialog() {
      dialogAccept.current.style.bottom = "-250px"
      dialogAccept.current.style.visibility = "hidden"
      showButtonRef.current.style.visibility = "visible"
  }

  function showDialog() {
    dialogAccept.current.style.visibility = "visible"
    dialogAccept.current.style.bottom = "14px"
    showButtonRef.current.style.visibility = "hidden"
    
  }

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
		formData.append('package_id', statusPackage?.package?.id);
		formData.append('receiver_signature_image', dataURLtoFile(img, 'signature' + statusPackage?.package?.receiver_name))
		formData.append('receiver_signature_name', statusPackage?.package?.receiver_name)

		savePackageSignature(formData)
			.then(res => {
				Toast.success('Package delivered successfully');
				setIsModalVisible(false);
        fetchRecentPackage();
				setLoading(false);

			}).catch(err => {
				Toast.fail('Someting went wrong. please try again');
				setLoading(false)
			})

	}

  useEffect(() => {
		// pull cancel reason 

    let isMounted = true
		getCancelReason()
    .then(res => {

      if(isMounted)
        setCancelReason(res.data)
      
    }).catch(err => {
      alert(err.message)
    })

    return () => { isMounted = false }

	}, [])

  	// handle radio button change from modal 
	const handleRadio = (e) => {
		setRadio(e.target.value)
	}

	// cancel reason submit 
	const cancelSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData(e.target)
		formData.append('package_id', packageAlert?.id);
		setLoadingCanc(true)
		saveCancelReason(formData)
			.then(res => {
				Toast.success(res.data.message);
				setCancelReasonModal(false);
        fetchRecentPackage();
				setLoadingCanc(false);
			}).catch(err => {
				Object.entries(err?.data?.errors).map(res => {
					Toast.info(res[1][0]);
				})
				setLoadingCanc(false)
			})
	}

  const Completionist = () => <span>Time out!!!</span>;

  if(loading) return ''

  return (
    <Layout>
    <section className="vhc-100 map-bg position-relative">
    
      <div className="common-map position-relative">
        <div className="col-2 my-auto profile-pop">
          <Avatar
            className="ava-bg"
            src={
              <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" width="90" />
            }
          />
        </div>

      <MyMap packageAlert={packageAlert} setSummary={setSummary} refetch={refetch}/>

      </div>

      {
        packageAlert !== null && packageAlert?.process_step !== 3 ?
        <>
          <button className="show-detail-dialog btn" onClick={showDialog} ref={showButtonRef}><i className="fa fa-angle-up"></i></button>
          <div className="col-12 rider-accept" ref={dialogAccept}>
            <div className="card p-3 ">
              <div className="d-flex">
                <Avatar
                  className="ava-bg my-auto"
                  src={
                    <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" />
                  }
                />
                <div className="ml-2">
                  <p className="heading-xl f-w-600 line-height-07 text-capitalize">{ packageAlert.vendor.first_name + ' ' + packageAlert.vendor.last_name  }</p>
                  <p className="faded-text ">{ packageAlert?.vendor?.location?.city }</p>
                </div>
                { packageAlert?.process_step !== null ?
                  <div className="ml-auto pl-3 mr-2 text-right">
                    <a href={`tel:${packageAlert?.vendor?.phone}`}><button className="btn btn-sm bg-light text-dark">
                      <PhoneOutlined />
                    </button></a>
                  </div> : 
                  <button className="ml-auto mr-2 text-white btn btn-sm bg-secondary border-15 p-0" style={{width:"24px", height:"24px", fontSize:"12px"}} disabled>
                  <Countdown date={Date.now() + 3000 * 10} renderer={props => <div>{props.seconds}</div>}>
                    <Completionist />
                  </Countdown>
                  </button>
                }

                <div className={'pl-2 text-right'} onClick={handleDialog}>
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
              <div className="d-flex mt-2">
                <div>
                  <p className="faded-text-sm ">Delivery Items</p>
                  <p className="heading-l f-w-600">{ packageAlert?.category?.title } x{ packageAlert.no_of_package }</p>
                </div>
              </div>

              <div className="d-flex my-2">
                <div className="d-flex">
                  <i className="fas fa-map-marker-alt fa-xs my-auto mr-1 text-red"></i>
                  <p className="faded-text ">{ packageAlert?.location?.whole_address }</p>
                </div>
              </div>

              <div className="d-flex">
                <small className="my-auto">Distance: {summary?.distance}</small>
                <small className="my-auto mx-1">|</small>
                <small className="my-auto">Time: {summary?.time}</small>
              </div>

              <div className="d-flex my-2">
                  <Button
                    type="primary"
                    className="w-100"
                    onClick={() =>{
                      return statusPackage?.process_step !== 2 ?
                        alert('Accept', 'Are you sure???', [
                          { text: 'Cancel', onPress: () => console.log('cancel') },
                          { text: 'Ok', onPress: () => riderAcceptPackage(statusPackage?.process_step)},
                      ]) : riderAcceptPackage(statusPackage?.process_step)
                    }}
                  >
                    { statusPackage?.process_step === 0 ? "Going For Package" : statusPackage?.process_step === 1 ? "Pickup" : statusPackage?.process_step === 2 ? "Delivered" : "Accept"}
                  </Button>
                
                  <Button
                  className="ml-2"
                  onClick={() =>
                    { statusPackage?.process_step === null || typeof statusPackage?.process_step === "undefined" ?
                     alert('Cancel', 'Are you sure???', [
                      { text: 'Cancel', onPress: () => console.log('cancel') },
                      { text: 'Ok', onPress: () => dispatch(storePackageAlert(null))},
                    ]) : setCancelReasonModal(true) }}
                  > Cancel </Button>
              </div>
            </div>
          </div>
        </>
        : ""
      }
  
    </section>

    <DialogSign 
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

export default RiderAccept;
