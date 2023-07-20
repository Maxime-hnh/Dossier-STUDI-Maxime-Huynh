import React from 'react'
import { TiFlashOutline } from 'react-icons/ti'
import './HomeCardItem.css'


export default function HomeCardItem({name, price}) {
    return (
        <>

            <div
                className="card p-0 column is-one-fifth-fullhd is-one-quarter-widescreen is-half-desktop is-half-tablet is-four-fifths-mobile m-3"
                style={{
                    borderRadius: '8px',
                    fontFamily :'Rajdhani'
                }}
            >
                <div style={{padding:'2rem 0'}}>
                        <div className="content p-2">
                            <p className="title is-3 homeCardItem-title has-text-centered">VENTES FLASH !<TiFlashOutline size={30} color='#eee938'/></p>
                            <p className="title is-2 has-text-dark is-uppercase has-text-centered">{name}</p>
                            <p className="title pb-0 mb-0 has-text-dark has-text-centered" style={{fontFamily:'Lato', fontSize:'3.5rem'}}>{price} €</p>

                        </div>
                </div>
                <footer className='is-flex is-justify-content-center'>
                    <button
                        className=" is-success button is-rounded m-5 is-uppercase has-text-weight-bold"
                    >
                        Prendre RDV
                    </button>

                </footer>
            </div>

        </>
    )
}
