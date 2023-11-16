'use client'
import { useAppContext } from "@/components/AppContext"
import Loading from "@/components/utility/Loading";
import Title from "@/components/utility/Title";
import Image from "next/image"
export default function Page() {
  const {partners} = useAppContext();

  return (
    <div className="flex justify-center">

    <div className="max-w-[960px] flex flex-col py-2 my-8 justify-evenly items-center">
      {!partners ? <Loading /> :
       !partners.length ? <h1>暂时没有合作会员企业</h1>
       :
      <>
      <Title text="会员企业 ｜ Partners" custom="md:mt-4 md:mb-8 mx-2"/>
      {partners.map((company) =>
        <div
          key={company.id}
          className="md:m-2 md:p-2 h-24 w-full shadow-2xl rounded-md w-48 border border-1 flex flex-col md:flex-row items-center justify-evenly hover:scale-110 hover:-translate-y-1 ease-in-out duration-300 hover:delay-150"
        >
          <div className="md:w-1/6 flex flex-col items-center">
            <div className="p-2 hidden md:block">
              <Image className=' w-auto h-8' unoptimized src={company.logo} alt={company.name} height={50} width={50} />
            </div>
            <a href={company.link} className='capitalize self-center hover:underline font-medium text-lg'>{company.name}</a>
          </div>
          <div className='w-5/6 px-1 text-xs md:text-sm'>{company.intro}</div>
        </div>

      )}
      </>}

      <div className='fixed w-full bottom-0 left-0 text-center'>
        <p className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </p>
      </div>
    </div>
    </div>

  )
}
