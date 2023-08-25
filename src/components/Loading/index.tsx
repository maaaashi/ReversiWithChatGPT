import { loadingAtom } from '@/atoms/LoadingAtom'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Loading = () => {
  const loading = useRecoilValue(loadingAtom)

  if (!loading) return <></>

  return (
    <div className='flex justify-center items-center'>
      ChatGPT考え中... <span className='loading loading-ring loading-lg'></span>
    </div>
  )
}

export default Loading
