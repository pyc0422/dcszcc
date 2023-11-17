import React, {useState} from "react";
import { storage } from "../../../../firebase";
import {ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UploadImage = ({folder, label, setImgUrl}
  :{folder:string,label:string, setImgUrl(imgUrl:string):void}) => {
  const [img, setImg] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const uploadImage = () => {
    if (!img) return;
    const storageRef = ref(storage, `${folder}/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
      setProgress(progress);
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then(downloadURL => setImgUrl(downloadURL))
    })
  }
  return (
    <>
     <div className="flex flex-row items-baseline">
      <label htmlFor="logo" className='min-w-max pl-2'>{label}:</label>
      <input
      type="file" id="logo" name="logo" accept="image/*"
      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setImg(e.target.files ? e.target.files[0] : null)}}
      />
    </div>
    <button className="btn text-xs" onClick={uploadImage}>确认</button>
    {progress === 100 ? <span className="ml-2 text-red-500"> 上传成功！请提交/发布进行保存！</span> : null}
    </>
  )
}

export default UploadImage;