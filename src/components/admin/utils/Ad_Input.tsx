import React from 'react';

const Ad_Input = (
  {title, name, handleChange, value}:
  {title:string, name:string, handleChange(e:React.ChangeEvent<HTMLInputElement>):void, value:string}) => {
  return (
    <div className="flex flex-row items-center p-1 m-2">
      <label className="">{title}：</label>
      <input
        type="text"
        name={name}
        className="post_input"
        onChange={(e) => handleChange(e)}
        value={value}
      />
    </div>
  )
}

export default Ad_Input;