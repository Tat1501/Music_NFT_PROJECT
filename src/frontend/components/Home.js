import { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import Identicon from 'identicon.js';
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import '../CSS/App.css';
import { Row } from 'react-bootstrap'
import Audio from './Audio.js'
import img3 from '../Image/giphy.gif'
import Toatify from './Toatify';



const Home = ({ contract }) => {
  const [articles, setArticles] = useState([])
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [marketItems, setMarketItems] = useState(null)
  const loadMarketplaceItems = async () => {
    // Get all unsold items/tokens
    const results = await contract.getAllUnsoldTokens()
    const marketItems = await Promise.all(results.map(async i => {
      // get uri url from contract
      const uri = await contract.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri + ".json")
      const metadata = await response.json()
      const identicon = `data:image/png;base64,${new Identicon(metadata.name + metadata.price, 330).toString()}`
      // define item object
      let item = {
        price: i.price,
        itemId: i.tokenId,
        name: metadata.name,
        audio: metadata.audio,
        identicon
      }
      return item
    }))
    setMarketItems(marketItems)
    setLoading(false)
  }
  const buyMarketItem = async (item) => {
    await (await contract.buyToken(item.itemId, { value: item.price })).wait()
    loadMarketplaceItems()
    // <Toatify/>
  }
  const skipSong = (forwards) => {
    if (forwards) {
      setCurrentItemIndex(() => {
        let index = currentItemIndex
        index++
        if (index > marketItems.length - 1) {
          index = 0;
        }
        return index
      })
    } else {
      setCurrentItemIndex(() => {
        let index = currentItemIndex
        index--
        if (index < 0) {
          index = marketItems.length - 1;
        }
        return index
      })
    }
  }
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else if (isPlaying !== null) {
      audioRef.current.pause()
    }
  })
  useEffect(() => {
    !marketItems && loadMarketplaceItems()
  })

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (

    <div className="container-fluid mt-5">
      {/* <Toatify
      /> */}
      <img src="" alt="" srcset="" />
      {marketItems.length > 0 ?
        <div className="row">
          {/* <Row xs={1} md={2} lg={4} className="g-4 py-5"> */}
          <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="content1 mx-auto">
              <audio src={marketItems[currentItemIndex].audio} ref={audioRef}></audio>
              <Card.Header className='homeHeader'>{currentItemIndex + 1} of {marketItems.length}</Card.Header>
              {/* <div className="mainImg">

                <img src={marketItems[currentItemIndex].identicon} alt="" srcset="No Image" /> */}
              <div className='homecard'>
                {/* {marketItems[currentItemIndex].identicon} */}
                {/* <Card.Img variant="top" src={img3} /> */}
                <div className="Card-Body" color="secondary">
                  <Card.Title as="h2" > {marketItems[currentItemIndex].name}</Card.Title>
                  <div className="">

                    <ButtonGroup size="lg" aria-label="Basic example">
                      <Button variant="secondary" className='homebtn1' onClick={() => skipSong(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi1" viewBox="0 0 16 16">
                          <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
                        </svg>
                      </Button>
                      <Button variant="secondary" className='homebtn2' onClick={() => setIsPlaying(!isPlaying)}>
                        <span className="dot">
                          {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColorwhite" className="bi1" viewBox="0 0 16 16">
                              <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi1" viewBox="0 0 16 16">
                              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                            </svg>

                          )}
                        </span>
                      </Button>
                      <Button variant="secondary" className='homebtn3' onClick={() => skipSong(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi1" viewBox="0 0 16 16">
                          <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
                        </svg>
                      </Button>
                    </ButtonGroup>
                    <div className="Card-Footer">
                      <div className='d-grid my-1'>
                        <Button onClick={() => buyMarketItem(marketItems[currentItemIndex])} className="button1" variant="primary" size="lg">
                          {`Buy for ${ethers.utils.formatEther(marketItems[currentItemIndex].price )} ETH`}
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              {/* </div> */}
            </div>
          </main >
          {/* </Row> */}
        </div >
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}

    </div >
  );
  // </>
}

export default Home
