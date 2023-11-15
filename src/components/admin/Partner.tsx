import React, { useEffect, useState } from 'react'
import { AlertType, NewsType, OppType, PartnerType } from '../../utility/types';
import Swal from 'sweetalert2';
import Loading from '../utility/Loading'
import { DeletePartner, getPartners } from '@/lib/api'
import PartnerDetail from './PartnerDetail';
export default function Partner () {
  const [partners, setPartners] = useState<PartnerType[]>([])
  const [isEdit, toggleEdit] = useState<boolean>(false)
  const [clicked, setClicked] = useState<PartnerType>({id:"", name:"", link:"", logo:"", intro:""})

  const editClicked = (company:PartnerType) =>{
    setClicked(company);
    toggleEdit(true)
  }
  const handleNew = () => {
    setClicked({id:"", name:"", link:"", logo:"", intro:""});
    toggleEdit(true)
  }
  const handleDelete = (company:PartnerType) => {
    Swal.fire({
      title: `删除${company.name}吗?`,
      text:`确认删除合作企业${company.name}？一旦确认无法找回`,
      showCancelButton:true,
      confirmButtonText:'确认删除',
      cancelButtonText:'我再想想'
    }).then((result) => {
      if (result.isConfirmed) {
        DeletePartner(company.id)
        .then((res) => {
          if (res === 'deleted') {
            Swal.fire("删除成功");
            setPartners(partners.filter((p) => p.id !== company.id))
            setClicked({id:"", name:"", link:"", logo:"", intro:""});
          }
        })
      }
    })
  }
  useEffect(() => {
    getPartners()
      .then((res) => {
        if (res) {
          setPartners(res.data)
        }
      })
  },[])
  return (
    <div className="flex flex-col justify-center items-center">
      {isEdit &&
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <PartnerDetail partners={partners} setPartners={setPartners} company={clicked} isEdit={isEdit} toggleEdit={toggleEdit}/>
        </div>
      }
      {!partners.length ? <Loading /> :

      <div className="max-w-[960px] flex flex-row flex-wrap p-2 mb-16">
      {partners.map((company) =>
        <div key={company.id} className='w-36 h-36 flex flex-col justify-evenly items-center shadow-md border-2 p-2 m-2'>
            <div className='text-lg font-medium capitalize'>{company.name}</div>
            <button
            onClick={() => editClicked(company)}
            className='btn hover:bg-black/80 hover:text-white/80'
            >编 辑</button>
            <button
            className='btn text-white bg-black hover:bg-white/80 hover:text-black/80'
            onClick={() => handleDelete(company)}
            >删 除</button>
        </div>
      )
      }
      </div>
    }
    <button
    className="px-8 py-2 text-lg font-light text-slate-50 border w-fit bg-[#0362AA] hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-1 text-m my-2 focus:outline-none focus:ring-2"
    onClick={handleNew}>新增合作企业信息</button>
    </div>
  )
}