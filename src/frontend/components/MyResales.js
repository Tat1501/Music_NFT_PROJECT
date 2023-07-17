import { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import Identicon from 'identicon.js';
import '../CSS/App.css';


export default function MyResales({ contract, account }) {
  const audioRefs = useRef([]);
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState(null)
  const [soldItems, setSoldItems] = useState([])
  const [isPlaying, setIsPlaying] = useState(null)
  const [selected, setSelected] = useState(0)
  const [previous, setPrevious] = useState(null)
  const loadMyResales = async () => {
    // Fetch resale items from marketplace by quering MarketItemRelisted events with the seller set as the user
    let filter = contract.filters.MarketItemRelisted(null, account, null)
    let results = await contract.queryFilter(filter)
    // Fetch metadata of each nft and add that to item object.
    const listedItems = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await contract.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri + ".json")
      const metadata = await response.json()
      const identicon = `data:image/png;base64,${new Identicon(metadata.name + metadata.price, 330).toString()}`
      // define listed item object
      let purchasedItem = {
        price: i.price,
        itemId: i.tokenId,
        name: metadata.name,
        audio: metadata.audio,
        identicon
      }
      return purchasedItem
    }))
    setListedItems(listedItems)
    // Fetch sold resale items by quering MarketItemBought events with the seller set as the user.
    filter = contract.filters.MarketItemBought(null, account, null, null)
    results = await contract.queryFilter(filter)
    // Filter out the sold items from the listedItems
    const soldItems = listedItems.filter(i => results.some(j => i.itemId.toString() === j.args.tokenId.toString()))
    setSoldItems(soldItems)
    setLoading(false)
  }
  useEffect(() => {
    if (isPlaying) {
      audioRefs.current[selected].play()
      if (selected !== previous) audioRefs.current[previous].pause()
    } else if (isPlaying !== null) {
      audioRefs.current[selected].pause()
    }

  })
  useEffect(() => {
    !listedItems && loadMyResales()
  })

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (

    // <div className="flex justify-center tokencard">
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 container">
          <h2 className='listed'>Listed</h2>
          {/* <div> */}
          <div xs={1} md={2} lg={4} className="g-4 py-3 box ">
            {listedItems.map((item, idx) => (
              <div key={idx} className="maindivResale">
                <audio src={item.audio} ref={el => audioRefs.current[idx] = el}></audio>
                <div className='token2'>
                  <Card.Img variant="top" className='resaleImg' src={item.identicon} />
                  <Card.Body color="secondary">
                    <Card.Title className='resaleItem'>{item.name}</Card.Title>
                    <div className="d-grid px-4">
                      <Button className='resaleBtn' variant="secondary" onClick={() => {
                        setPrevious(selected)
                        setSelected(idx)
                        if (!isPlaying || idx === selected) setIsPlaying(!isPlaying)
                      }}>
                        {isPlaying && selected === idx ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
                            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                          </svg>
                        )}
                      </Button>
                    </div>
                    <Card.Text className=" resaletext  mt-1">
                      {ethers.utils.formatEther(item.price)} ETH
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            ))}
          </div>
          {/* </div> */}
          <div className="main main2">
            <h2>Sold</h2>
            {soldItems.length > 0 ?
              <div xs={1} md={2} lg={4} className="g-4 py-3 ">
                {soldItems.map((item, idx) => (
                  <div key={idx} className="maindiv">
                    <div className='token1'>
                      <Card.Img variant="top" src={item.identicon} />
                      <Card.Body color="secondary">
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text className=" cardtext mt-1">
                          {ethers.utils.formatEther(item.price)} ETH
                        </Card.Text>
                      </Card.Body>
                    </div>
                  </div>
                ))}
              </div>
              : (
                <main style={{ padding: "1rem 0" }}>
                  <h2>No sold assets</h2>
                </main>
              )}
          </div>

        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
    // </div>
    // {/* <footer className="box3">
    //   <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam consectetur facer</p>
    // </footer> */}

  );
}

