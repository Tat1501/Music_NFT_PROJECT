import React from 'react'
import one from '../Image/1.png'
import '../CSS/App.css';

const Base = () => {
    return (<>
        <div className="component1">

            <div className="para">
                <h1>RHYTHM</h1>
                <h3>The MUSIC NFT MARKETPLACE</h3>
                <p>An NFT-based music player is a digital music player that utilizes blockchain technology and Non-Fungible Tokens (NFTs) to provide a unique and secure way of buying, selling, and listening to music. NFTs are unique digital assets that are stored on a blockchain, making them tamper-proof and giving them a verifiable and provable ownership. By utilizing NFTs, the NFT-based music player provides a new way for musicians and artists to monetize their music and for fans to own and trade unique and limited-edition digital music assets. Additionally, the use of blockchain technology ensures that each transaction and ownership is transparent, secure, and immutable. The result is a new music ecosystem that offers new opportunities for musicians, fans, and music lovers to engage with music in a decentralized and innovative way.</p>
            </div>
            <div className="img">
                <img src={one} alt="no Image" srcSet="" />
            </div>



        </div>
        <div className="btn1">
            <button className="btn"> Explore Your Music Now</button>
        </div>
    </>
    )
}

export default Base