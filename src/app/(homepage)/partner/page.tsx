'use client'
import { useAppContext } from "@/components/AppContext"
import Image from "next/image"
export default function Page() {
  const {partners} = useAppContext()
  return (
    <div className="flex justify-center">
    <div className="max-w-[960px] flex flex-col py-2 my-8 justify-evenly items-center">
      {partners.map((company) =>
        <div
          key={company.id}
          className="md:m-2 p-2 h-24 w-full shadow-2xl rounded-md w-48 border border-1 flex flex-row items-center justify-evenly hover:scale-110 hover:-translate-y-1 ease-in-out duration-300 hover:delay-150"
        >
          <div className="w-1/6 flex flex-col flex-wrap items-center">
            <div className="p-2">
              <Image src={company.logo} alt={company.name} height={50} width={50} />
            </div>
            <a href={company.link} className='capitalize self-center hover:underline font-medium text-lg'>{company.name}</a>
          </div>

          <div className='w-5/6 px-1'>{company.intro}</div>

        </div>
      )}

      <div className='fixed w-full bottom-0 left-0 text-center'>
        <p className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </p>
      </div>
    </div>
    </div>

  )
}
