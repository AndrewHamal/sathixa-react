import { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiCategory } from "../../api/vendor/dashboard"
import { category, getCategories } from "../../reducers/reducers";
import { useDispatch, useSelector } from "react-redux";
import { submitPackage } from "../../api/vendor";
import { Upload, Button, Slider, Layout, PageHeader, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InputItem, Toast } from 'antd-mobile';
import { storePackageForm, getPackageForm, packageStore} from "@/reducers/reducers";
import { dataURLtoFile } from "@/helper/helper"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;

if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const antIcon = <LoadingOutlined style={{ fontSize: 18, color:'#fff' }} spin />;

const { Content } = Layout;

const SendPackage = () => {

    const [volume, setVolume] = useState( 2)
    const [value, setValue] = useState();
    const [fileAll, setFile] = useState({ files : [] })
    const [toggle, setToggle] = useState(false)
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState([]);
    const [errorPhone, setErrorPhone] = useState(null);
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const packageFormSelector = useSelector(getPackageForm)

    const dispatch = useDispatch()
    const getCaterogies = useSelector(getCategories)

    const handleChange = (file, fileList) => {
        setFile(prevState => ({
            files: [...prevState.files, file]
        }))

        
        return false;
    }

    const deleteFile = (file) => {
        let files = fileAll.files.filter( res => {
            if(file.uid !== res.uid)
                return res
        })
        setFile({files})
    }

    const handleOnChange = (value) => {
        setVolume( parseInt(value) )
        dispatch(storePackageForm({ ...packageFormSelector, value: { ...packageFormSelector?.value, ['weight']: value } }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setDisable(true)

        let formData = new FormData(event.target)

        Object.entries(packageFormSelector?.value?.receiver_address).map(v => {
            formData.append(`location[${v[0]}]`, v[1]);
        })

        if(typeof packageFormSelector?.value?.files !== "undefined" && packageFormSelector?.value?.files?.length != 0){ 
            packageFormSelector?.value?.files.map(v => {
                formData.append('image[]', dataURLtoFile(v, 'image' + Math.random()));
            }) 
        }else {
            fileAll.files.forEach((image, i) => {
                formData.append('image[]', image);
            })
        }
    
        if(packageFormSelector?.value?.weight !== null && typeof packageFormSelector?.value?.weight !== "undefined") {
            formData.append('weight' , packageFormSelector?.value?.weight)
        }else{
            formData.append('weight' , volume)
        }

        submitPackage(formData)
        .then(res => {
            setDisable(false)
            document.getElementById('form').reset()
            setError([])
            history.push('/package')
            Toast.success(res.data.message, 2)
            dispatch(packageStore([]))
            dispatch(storePackageForm([]))
        }).catch(err => {
            setDisable(false)
            setError(err.data.errors)
        })
    }

    const changeHandle = (e) => {
        let name = e?.target?.name
        let value = e?.target?.value      
        dispatch(storePackageForm({ ...packageFormSelector, value: { ...packageFormSelector?.value, [name]: value } }))
    }

    const show = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                minAspectRatio: 1.333,
                minFrameRate: 30,
                width: 1280,
                heigth: 720
            }
        })
    }

    useState(() => {
        if (!getCaterogies.length)
        {
            apiCategory()
                .then(res => {
                    dispatch(category(Array.from(res.data)))
                })
        }
    },[getCaterogies])

    const phoneChange = (value) => {
       setValue(value)
       dispatch(storePackageForm({ ...packageFormSelector, value: { ...packageFormSelector?.value, ['phone']: value } }))
        if (value.replace(/\s/g, '').length < 10) {
            setErrorPhone({
                hasError: true,
            });
        } else {
            setErrorPhone({
                hasError: false,
            });
        }
    }

    const onErrorClick = () => {
        if (errorPhone) {
            Toast.info('Please enter 11 digits');
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleLocation = () => {
        const getFile = fileAll.files.map(v => new Promise((resolve, reject) => {
            toBase64(v)
            .then(res => {
                resolve(res)
            })
        }))

        Promise.all(getFile)
        .then(res => { 
            dispatch(storePackageForm({ ...packageFormSelector, value: { ...packageFormSelector?.value, ['files']: res } }))
        })

        history.push('/map-search?from=sendpackage')
    }

    return (
        <Layout>
        <PageHeader
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
            className="site-page-header bg-red "
            onBack={() => history.push('dashboard')}
            title="Send Package"
        />
        <Content
            className="site-layout"
            style={{
            padding: "0 14px",
            marginTop: 67,
            }}
        >
        <section className="my-3" id={"sendPackageModal"}>
        <div>
            <form onSubmit={handleSubmit} id={"form"}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">What are my sending ?</label>
                    <select className="form-control" defaultValue={packageFormSelector?.value?.category_id} onChange={changeHandle} name={"category_id"} id="exampleFormControlSelect1" required>
                        <option defaultChecked={true}  disabled={true}>Select Category</option>
                        {
                            Array.from(getCaterogies).map((response, key) => (
                                <option key={key} value={response.id}>{response.title}</option>
                            ))
                        }
                    </select>

                    { error.category_id ? <div className={"mt-1"}><small className={"text-danger font-11"}>{error.category_id} </small></div> : '' }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Number of Packages?</label>
                    <select className="form-control" defaultValue={packageFormSelector?.value?.no_of_package}  onChange={changeHandle} name={"no_of_package"} id="exampleFormControlSelect1" required>
                        {
                            [1,2,3,4,5].map((res, key) => (
                                <option key={key} value={res}>{res}</option>
                            ))
                        }
                    </select>
                    { error.no_of_package ? <div className={"mt-1"}><small className={"text-danger font-11"}>{error.no_of_package} </small></div> : '' }
                </div>
         
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Enter receiver's name</label>
                    <input type="text" defaultValue={packageFormSelector?.value?.receiver_name} className="form-control" onChange={changeHandle} name={"receiver_name"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Shivam Rijal" required/>
                    { error.receiver_name ? <div className={"mt-1"}><small className={"text-danger font-11"}>{error.receiver_name} </small></div> : '' }
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Receiver's address</label>
                    <input type="text" 
                    className="form-control" 
                    name={"receiver_address"} id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    defaultValue={packageFormSelector?.value?.receiver_address?.whole_address}
                    onFocus={handleLocation} 
                    placeholder="Shantinagar, Kathmandu" required/>
                    { error.receiver_address ? <div className={"mt-1"}><small className={"text-danger font-11 lh-1"}> {error.receiver_address} </small></div> : '' }
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone number</label>
                    <InputItem
                        type={"phone"}
                        error={errorPhone?.hasError}
                        placeholder="977"
                        onChange={phoneChange}
                        clear
                        minLength={8}
                        defaultValue={packageFormSelector?.value?.phone}
                        name={"receiver_phone"}
                        className="form-control"
                        onErrorClick={onErrorClick}
                        required
                    ></InputItem>

                    { error.receiver_phone ? <div className={"mt-1"}><small className={"text-danger font-11"}>{error.receiver_phone} </small></div> : '' }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Product Price</label>
                    <input
                        type={"number"}
                        placeholder="Price"
                        defaultValue={packageFormSelector?.value?.product_price}
                        name={"product_price"}
                        className="form-control"
                        onChange={changeHandle}
                        required
                    />

                    { error.product_price ? <div className={"mt-1"}><small className={"text-danger font-11"}>{error.product_price} </small></div> : '' }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Weights in kg</label>

                    <Slider
                        type={"primary"}
                        max={10}
                        min={1}
                        defaultValue={packageFormSelector?.value?.weight || 2}
                        className={"m-0"}
                        onChange={handleOnChange}
                    />
                    { error.weight ? <div className={"mt-1"}><small className={"text-danger font-11"}>{error.weight} </small></div> : '' }
                </div>
                
                <div className="form-group">
                    <label htmlFor="" onClick={e => toggle ? setToggle(false) : setToggle(true) }>
                        Additional Info</label>
                    <textarea name=""
                     className="form-control" 
                     cols="30" 
                     onChange={changeHandle} 
                     name={"special_instruction"} 
                     defaultValue={packageFormSelector?.value?.special_instruction}
                     placeholder={"Write a messages..."}></textarea>
                </div>
                        
                <div className="form-group">
                    <Upload
                        listType="picture"
                        multiple={true}
                        beforeUpload={handleChange}
                        onRemove = {deleteFile}
                        accept={'image/*'}
                        FileList={[]}
                    >
                        <Button icon={<UploadOutlined />} className={"btn-none"}>Upload Image</Button>
                    </Upload>
                    
                    { typeof packageFormSelector?.value?.files !== "undefined" && packageFormSelector?.value?.files.length > 0 ?
                        <small className="text-warning">* { packageFormSelector?.value?.files.length } file stored </small>
                    :"" }

                </div>
        
                <div className={"form-group"}>
                    <p htmlFor="" className={"text-black font-weight-bold"}>Total Amount : Rs.200</p>
                </div>
                <div className="btn-container">
                    <button type="submit" className="btn btn-primary w-100" disabled={disable}> {disable ? <Spin indicator={antIcon} /> : 'Submit'} </button>
                </div>
            </form>
        </div>
        </section>
        </Content>
        </Layout>
    )
}

export default SendPackage
