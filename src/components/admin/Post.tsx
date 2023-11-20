
import { Button } from "@mui/material"
import React, {useEffect, useState} from "react"
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import Image from "next/image";
import 'react-quill/dist/quill.snow.css';
import "./admin.css"
import {useForm, SubmitHandler} from 'react-hook-form';
import { NewsEditPropType, NewsType, OppType, PartnerType } from "@/utility/types";
import { addNews, addOpp, deleteNews, deleteOpp, updateNews, updateOpp } from "@/lib/api";
import Swal from "sweetalert2";
import UploadImage from "./utils/UploadImg";

// import { ImageResize } from 'quill-image-resize-module-ts';

// Quill.register('modules/imageResize', ImageResize);

const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'direction',
  'align',
  'image',
  'video',
  'color',
  'background'
]
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'size': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { 'list': 'ordered' },
      { 'list': 'bullet' },
      { 'indent': '-1' },
      {'indent': '+1' },
    ],
    [{ 'direction': 'rtl' }, { 'align': [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
export default function Post ({list, setList, values, toggleOpen}
  :{list?:Record<string,NewsType[]>, setList(list:Record<string,NewsType[]>):void, values?:NewsEditPropType, toggleOpen(open:boolean):void}) {
  const [postType, setType] = useState(values ? values.type : "");
  const [imgUrl, setImgUrl] = useState<string>(values && values.values&&values.values.img ? values.values.img : "");
  const emptyPost = {title:"", news_date:"", author:"admin", important:false, notified:false, content:""}
  let defaultPost = values && values.values? values.values : emptyPost
  const {register, handleSubmit, reset, setValue, watch, formState:{errors}} = useForm({defaultValues: defaultPost})

  useEffect(() => {
    register("content", { required: true })
  }, [register])
  useEffect(() => {
    if (imgUrl) {
      setValue("img", imgUrl)
    }
  },[imgUrl])
  const handleChange = (quillInput:string) => {
    setValue("content", quillInput);
  }
  const handleDelete = () => {
    if(!values || !values.values || !values.values) return

    const cur_id = values.values.id
    Swal.fire({
      title:'删除？',
      text:`确认删除${values.values.title}吗？`,
      showCancelButton:true,
      confirmButtonText:'确认',
      cancelButtonText:"取消"
    }).then((result) => {
      if (result.isConfirmed) {
        if (!cur_id) return
        return values.type === 'news' ? deleteNews(cur_id) : deleteOpp(cur_id)
      }
    }).then((res) => {

      if (res === 'deleted') {
        Swal.fire("删除成功");
        if (!list) return;
        setList({...list, [values.type]:list[values.type].filter((n) => n.id !== cur_id)})
        toggleOpen(false)
      }
    })
  }
  const onSubmit:SubmitHandler<NewsType> = (data) => {
    //console.log('post data:', data)
    if (!data.content){
      Swal.fire('内容为空',"","warning")
      return;
    }
    data.notified = data.notified === 'yes' ? true : false;
    if (!values) {
      if (postType === 'news') {
        data.important = data.important === 'yes' ? true : false;
        return addNews(data)
        .then(res => {
          if (res === 'added') {
            reset()
            Swal.fire('新闻活动发布成功！')
          }
        })
      } else if (postType === 'opps') {
        // console.log('post opps', data)
        let opp:OppType = {title: data.title, notified:data.notified ? true : false, content:data.content}
        if (imgUrl) {
          opp.img = imgUrl
        }
        return addOpp(opp)
        .then(res => {
          if (res === 'added') {
            reset()
            Swal.fire('合作机会发布成功！')
          }
        })
      }
    } else {
      // console.log('eles with values')
      if (values.values && values.values.id){
        data.id = values.values.id
      } else {
        return;
      }
      if (values.type === 'news') {
        //update news
        //console.log('start updated news')
        data.important = data.important === 'yes' ? true : false;
        updateNews(data, data.id)
         .then((res) => {
            if (res === 'updated') {
              Swal.fire('更新新闻成功！')
              toggleOpen(false)
            }
         })
      } else if (values.type === 'opps'){
        //update opps
        //console.log('start update opp')
        updateOpp({id:data.id, title:data.title, content:data.content, notified:Boolean(data.notified), img:data.img})
        .then((res) => {
          if (res === 'updated') {
            Swal.fire('更新合作机会成功！')
            toggleOpen(false)
          }
         })
      }
    }

  }

  const quillInput = watch("content");
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-10 pt-4  max-w-[960px] flex-center flex-col">
        {!values &&
        <div className="input_box" >
          <label className="flex-center">发布种类: </label>
          {['news', 'opps'].map((b, i) =>
            <div key={i} className="flex-center flex-row justify-center items-center ml-2 cursor-pointer">
              <input type="radio" value={b} className="shadow-none w-auto" checked={b === postType} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}/>
              <label className="m-1">{b === 'news' ? '新闻活动' : '合作机会'}</label>
            </div>
          )}
        </div>
        }
      <form className="flex-center flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_box">
          <label className="post_label">标题： </label>
          <input type="text" placeholder="标题" className="post_input" {...register("title")}/>
        </div>
        {postType === "news" ?
        <>
        <div className="input_box ">
          <div className="flex flex-row justify-basline items-baseline w-1/2">
            <label className="w-auto">新闻日期：</label>
            <input type="date" className="post_input w-3/5" {...register("news_date")}/>
          </div>
          <div className="flex w-1/2 justify-end items-baseline">
            <label className="w-inherit">作者： </label>
           <input type="text" placeholder="作者姓名" className="post_input w-3/5" {...register("author")}/>
          </div>
        </div>

        <div className="input_box mb-0">
          <label className="flex-center">是否标记为重要事件: </label>
          {['yes', 'no'].map((b, i) =>
            <div key={i} className="flex-center flex-row ml-2 cursor-pointer">
              <input id={b === 'yes'? "important" : "noimportant"} type="radio" value={b} className="shadow-none" {...register("important")}/>
              <label className="m-1 ">{b === 'yes' ? '是' : '否'}</label>
            </div>
          )}
        </div>
        <p className="text-xs mb-4">*重要事件会显示在“关于我们”的时间轴上</p>
        </>
        :<>
          <div className="input_box">
            <UploadImage folder="opps" label="请上传合作项目的封面展示图" setImgUrl={setImgUrl}/>
          </div>
          {imgUrl && <><Image src={imgUrl} alt="preview" height={40} width={40} className="w-3/4 h-3/4"/></>}
          </>
        }

        <div className="input_box">
          <label className="flex-center">是否群发: </label>
          {['yes', 'no'].map((b, i) =>
            <div key={i} className="flex-center flex-row ml-2 cursor-pointer ">
              <input id={b === 'yes'? "emailAll" : "noEmail"} type="radio" value={b} className="shadow-none" {...register("notified")}/>
              <label className="m-1">{b === 'yes' ? '是' : '否'}</label>
            </div>
          )}
        </div>
        <ReactQuill
          theme="snow"
          className="h-96 mt-4 mb-10 w-full"
          value={quillInput}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
        <div className="flex flex-row justify-around mt-4 pt-4">
          <Button type="submit" variant="outlined" size="small" sx={{border:2, m:"1rem", px:'6rem'}}>{values?'修改':'发布'}</Button>
          <Button type="reset" variant="contained" size="small" sx={{border:2, m:"1rem", px:'6rem'}}>重置</Button>
          {values && <Button onClick={handleDelete} variant="outlined" size="small" sx={{border:2, m:"1rem", px:'6rem'}}>删除</Button>}
        </div>
      </form>

      </div>
    </div>
  )
}