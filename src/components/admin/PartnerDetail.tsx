import { PartnerType } from "@/utility/types";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Ad_Input from "./utils/Ad_Input";
import { AddPartners, UpdatePartner } from "@/lib/api";
import Swal from "sweetalert2";
import UploadImage from "./utils/UploadImg";

const PartnerDetail = (
  {partners, setPartners, company, isEdit, toggleEdit}:
  { partners:PartnerType[],setPartners(partners:PartnerType[]):void,company:PartnerType,isEdit:boolean,toggleEdit(isEdit:boolean):void,}) => {

  const [imgUrl, setImgUrl] = useState("")
  const [inputs, setInputs] = useState<PartnerType>({id:"", name:"", link:"", logo:"", intro:""})
  const elementArr = [{title:'企业名称',name:'name'}, {title:'官网链接', name:'link'}];

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const tag:string = e.target.name
    const val:string = e.target.value
    setInputs({...inputs, [tag]:val})
  }

  const handleSubmit = (e:React.MouseEvent) => {
    e.preventDefault();
    //check if current partner info changed or not
    if (JSON.stringify(company) === JSON.stringify(inputs)) {
      Swal.fire("",`没有对${company.name}进行任何更改`)
      toggleEdit(false)
    } else if(!company.name.length && !company.link.length && !company.intro.length) {
      AddPartners(inputs)
      .then((res) => {
        if (typeof res === 'string') {
          Swal.fire("",`添加${inputs.name}成功！`)
          setPartners(partners.concat({...inputs,id:res}))
          toggleEdit(false)
        }
      })
    } else {
      //update this changed partner in the db
      UpdatePartner(inputs)
       .then((res) => {
         if (res === 'updated') {
          Swal.fire("",`修改${inputs.name}成功！`);
          //update current state without re-send request to server
          const updated = partners.map((p) => {
            if (p.id === inputs.id) {
              return inputs;
            } else {
              return p;
            }
          })
          setPartners(updated);
          toggleEdit(false)
         }
       })
    }
  }
  const reset = () => {
    if(company) {
      setInputs(company)
    } else {
      setInputs({id:"", name:"", link:"", logo:"", intro:""})
    }
  }
  useEffect(() => {
    if (company) {
      setInputs(company)
    }
  },[company])
  useEffect(() => {
    if (imgUrl !== inputs.logo) {
      setInputs({...inputs, logo:imgUrl})
    }
  }, [imgUrl])
  return (
    <div className="mt-8 md:mt-auto md:relative md:top-36 md:mx-auto p-2 md:border-2 md:w-4/5 max-w-[960px] md:h-[480px] md:shadow-lg md:rounded-md bg-white">
      <div
       className="text-black text-right text-lg mr-2 pr-1 hover:opacity-80 cursor-pointer"
       onClick={() => toggleEdit(!isEdit)}>x</div>

      <div className='px-2 mx-2 border-2 h-[410px] flex flex-col justify-evenly shadow-lg rounded-md'>
        {elementArr.map((elem, i) =>
          <Ad_Input
           key={i}
           title={elem.title}
           name={elem.name}
           handleChange={handleInputChange}
           value={inputs ? inputs[elem.name] : ""}
          />
        )}

        <div className="flex flex-row items-center p-1 m-2">
          <div>企业LOGO：</div>
          <div>
            {inputs && inputs.logo.length ?
            <Image src={inputs.logo} alt={`${inputs.name} logo`} unoptimized height={50} width={50} className='w-auto h-4/5'/>
            : null}
          </div>
          <UploadImage folder="partners" label="请选择上传新LOGO图片" setImgUrl={setImgUrl}/>
        </div>

        <div className="flex flex-col p-1 m-2">
          <label>
            企业简介：已经输入<strong className={inputs.intro.length > 105 ? "text-red-600" : ""}>{inputs && inputs.intro.length ? inputs.intro.length : 0}</strong>个字
            <span className="text-red-500 text-left"> 企业简介应少于 <strong>105</strong> 个字</span>
          </label>
          <textarea
            value={inputs ? inputs.intro : ""}
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
            name="intro"
            className='shadow h-24 border border-gray-400 px-2 py-1 bg-transparent'
          />
        </div>
        <div className="p-2 flex flex-row justify-around items-center" id="ptn_edit_btn_group">
          <button className="btn light px-12" onClick={handleSubmit}>提交</button>
          <button className="btn dark px-12" onClick={reset}>重置</button>
        </div>
      </div>
    </div>
  )
}

export default PartnerDetail;