import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Posts from '../components/Posts'
import Footer from '../components/Footer'

function HomePage(props) {
  return (
    <div className='homeParentDiv'>
        <Header/>
        <Banner/>
        <Posts/>
        <Footer/>
    </div>
  )
}

export default HomePage