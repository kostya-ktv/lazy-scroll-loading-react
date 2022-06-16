import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./app.css"

export const App = () => {

  const limit = 20
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [photos, setPhotos] = useState<any>([])
  const [isFetch, setIsFetch] = useState<boolean>(false)

  const scrollHandler = (e: any) => {

    const scrollHeight = e.target.documentElement.scrollHeight
    const scrollTop = e.target.documentElement.scrollTop
    const innerHeight = window.innerHeight
    if(scrollHeight - (scrollTop + innerHeight) < 100) {
      setIsFetch(true)
      setCurrentPage(prev => prev + 1)
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function() {
      document.removeEventListener('scroll', scrollHandler)
    } 
  },[])

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`)
    .then(({data}) => setPhotos((prev:any) => [...prev, ...data]))
    .finally(() => setIsFetch(false))
    
  }, [isFetch])

  return (
    <div className='container'>
      {photos.length > 0 &&
        photos.map((el: any, i: number) => 
          <div className='article' key={i}>{i + el.title}</div>
        )
      }
    </div>
  )
}