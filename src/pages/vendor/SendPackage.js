import { useState } from "react";
import 'react-rangeslider/lib/index.css'
import { useHistory } from "react-router-dom";
import { apiCategory } from "../../api/vendor/dashboard"
import { category, getCategories } from "../../reducers/reducers";
import { useDispatch, useSelector } from "react-redux";
import { submitPackage } from "../../api/vendor";
import { Upload, Button, Slider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SendPackage = () => {

    const [volume, setVolume] = useState( 2)
    const [fileAll, setFile] = useState({ files : [] })
    const [toggle, setToggle] = useState(false)
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState([]);
    const history = useHistory()

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
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setDisable(true)

        let formData = new FormData(event.target)

        fileAll.files.forEach((image, i) => {
            formData.append('image[]', image);
        })
        formData.append('weight' , volume)
        submitPackage(formData)
            .then(res => {
                if(res.status === 202) {
                    setDisable(false)
                    document.getElementById('form').reset()
                    setError([])
                    history.push('/success')
                    return
                }

                setDisable(false)
                setError(res.data.errors)
            })
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


    return (
        <section className="container mt-5 pb-4 px-4" id={"sendPackageModal"}>
        <div className="col-md-12">
            <div className="d-flex justify-content-between mb-3">
                <i className="fas fa-arrow-left"  onClick={() =>  history.goBack()}/>
                <p className="main-p" onClick={() =>  history.goBack()}>cancel</p>
            </div>
            <form onSubmit={handleSubmit} id={"form"}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">What are my sending ?</label>
                    <select className="form-control" name={"category_id"} id="exampleFormControlSelect1" required>
                        <option defaultChecked={true} disabled={true}>Select Category</option>
                        {
                            Array.from(getCaterogies).map((response, key) => (
                                <option key={key} value={response.id}>{response.title}</option>
                            ))
                        }
                    </select>
                    {/*{ console.log( typeof error.category_id ) }*/}
                    <small className={"text-danger font-11"}>{ typeof error.category_id !== "undefined" ? error.category_id : '' }</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Number of Packages?</label>
                    <select className="form-control" name={"no_of_package"} id="exampleFormControlSelect1" required>
                        {
                            [1,2,3,4,5].map((res, key) => (
                                <option key={key} value={res}>{res}</option>
                            ))
                        }
                    </select>
                    <small className={"text-danger font-11"}>{ error.no_of_package ? error.no_of_package : '' }</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Enter receiver's name</label>
                    <input type="text" className="form-control" name={"receiver_name"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Shivam Rijal" />
                    <small className={"text-danger font-11"}>{ error.receiver_name ? error.receiver_name : '' }</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Receiver's address</label>
                    <input type="text" className="form-control" name={"receiver_address"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Shantinagar, Kathmandu" />
                    <small className={"text-danger font-11"}>{ error.receiver_address ? error.receiver_address : '' }</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone number</label>
                    <input type="text" minLength={8} className="form-control" name={"receiver_phone"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={+977} />
                    <small className={"text-danger font-11"}>{ error.receiver_phone ? error.receiver_phone : '' }</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Product Price</label>
                    <input type="number" className="form-control" name={"product_price"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Rs" />
                    <small className={"text-danger font-11"}>{ error.product_price ? error.product_price : '' }</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Weights in kg</label>

                    <Slider
                        max={10}
                        defaultValue={volume}
                        className={"m-0"}
                        onChange={handleOnChange}
                    />
                    <small className={"text-danger font-11"}>{ error.weight ? error.weight : '' }</small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="" onClick={e => toggle ? setToggle(false) : setToggle(true) }>
                        Additional Info</label>
                    <textarea name="" className="form-control" id="" cols="30" name={"special_instruction"} placeholder={"Write a messages..."}></textarea>
                </div>
                
                <div className="form-group">

                    <Upload
                        listType="picture"
                        beforeUpload={handleChange}
                        onRemove = {deleteFile}
                        accept={'image/*'}
                    >
                        <Button icon={<UploadOutlined />} className={"btn-none"}>Upload Image</Button>
                    </Upload>

                </div>

                <div className={"form-group"}>
                    <p htmlFor="" className={"text-black font-weight-bold"}>Total Amount : Rs.200</p>
                </div>
                <div className="btn-container">
                    <button type="submit" className="btn btn-primary w-100" disabled={disable}>Submit</button>
                </div>
            </form>
        </div>
    </section>)
}

export default SendPackage