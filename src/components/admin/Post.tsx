
import { Button } from "@mui/material"
import React, {useEffect} from "react"
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import "./admin.css"
import {useForm, SubmitHandler} from 'react-hook-form';
import { NewsType } from "@/utility/types";
import { addNews } from "@/lib/api";

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
export default function Post () {
  const defaultPost = {title:"", news_date:"", author:"admin", important:false, notified:false, content:""}
  const {register, handleSubmit, reset, setValue, watch, formState:{errors}} = useForm({defaultValues: defaultPost})
  useEffect(() => {
    register("content", { required: true })
  }, [register])

  const handleChange = (quillInput:string) => {
    setValue("content", quillInput)
  }

  const onSubmit:SubmitHandler<NewsType> = (data) => {
    console.log('post data:', data)
    data.important = data.important === 'yes' ? true : false;
    data.notified = data.notified === 'yes' ? true : false;
    return addNews(data)
     .then(res => {
      if (res === 'added') {
        reset()
        alert('发布成功！')
      }
     })
  }
  const quillInput = watch("content");
  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-3/4 px-10 pt-4 flex-center flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_box">
          <label className="post_label">标题： </label>
          <input type="text" placeholder="标题" className="post_input" {...register("title")}/>
        </div>

        <div className="input_box ">
          <div className="flex flex-row justify-basline items-center w-1/2">
            <label className="w-inherit">新闻日期：</label>
            <input type="date" className="post_input" {...register("news_date")}/>
          </div>
          <div className="flex w-1/2 justify-end items-center">
            <label className="w-inherit">作者： </label>
           <input type="text" placeholder="作者姓名" className="post_input" {...register("author")}/>
          </div>
        </div>
        {/* <div className="input_box">
          <label>标签： </label>
          <input type="text" placeholder="标签用空格隔开" className="post_input"/>
        </div> */}
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
          <Button type="submit" variant="outlined" size="small" sx={{border:2, m:"1rem", px:'8rem'}}>发布</Button>
          <Button type="reset" variant="contained" size="small" sx={{border:2, m:"1rem", px:'8rem'}}>重置</Button>
        </div>
      </form>


    </div>
  )
}