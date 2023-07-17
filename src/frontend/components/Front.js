import React from 'react'
import img1 from '../Image/f2.png'
import img2 from '../Image/div2.jpeg'
import img3 from '../Image/div3.jpeg'
import img4 from '../Image/div4.jpeg'

import '../CSS/App.css'
const Front = () => {
    return (
        <>
            <div className='mainDiv'>
                <div className="div1">
                    <div className="sub1">
                        <h1 >
                            Unlock your music with RHYTHM.
                        </h1>
                        <p className='p1'> Rhythm is the world's first music player powered by blockchain and NFTs. Listen to your favorite music with the utmost confidence in ownership and privacy.</p>
                        <b className='p2'>“I feel confident that my music is secure with Rhythm.”</b>
                    </div>
                    <div className="sub2">
                        <img src={img1} alt="image" srcset="" />
                    </div>
                </div>

                {/* --------------------------- */}
                <div className="div2">
                    <div className="sub21">
                        <img src={img2} alt="" srcset="" />
                    </div>
                    <div className="sub22">
                        <b className='b1'>
                            Access exclusive content.
                        </b>
                        <p className='b2'>
                            With Rhythm, stream your favorite artists and discover new ones with exclusive NFTs. Enjoy unique content and support your favorite artists directly.
                        </p>
                    </div>
                </div>

                {/* ------------- */}
                <div className="div3">
                    <div className="sub31">
                        <b className='b11'>
                            Securely own and trade music assets.
                        </b>
                        <p className='b12'>
                            Owning music assets has never been more secure. On the blockchain, you can securely own and trade digital music assets, allowing for a new level of creativity and monetization for artists.
                        </p>
                    </div>
                    <div className="sub32">
                        <img src={img3} alt="" srcset="" />
                    </div>
                </div>



                {/* --------------------------- */}
                <div className="div4">
                    <div className="sub41">
                        <img src={img4} alt="" srcset="" />
                    </div>
                    <div className="sub42">
                        <b className='b21'>
                            Enjoy uninterrupted music streaming.
                        </b>
                        <p className='b22'>
                            Rhythm offers decentralized music streaming, giving you uninterrupted access to your music library even when traditional providers experience downtimes.
                        </p>
                    </div>
                </div>


                <div className="div5">
                    <p >
                        "Finally, a music streaming platform that rewards artists and fans alike for their creativity and passion for music. Rhythm is truly the future of music,"
                    </p>
                    <b>
                        James Locatellli
                    </b>
                </div>
            </div>
        </>
    )
}

export default Front 