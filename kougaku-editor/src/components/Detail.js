import React from 'react'

export default function Detail() {
    return (
        <div className="detail radiusBottomLeft radiusBottomRight">
            <ul className="coordX detailInput">
                <p>x</p>
                <input type="number" />
            </ul>
            <ul className="coordY detailInput">
                <p>y</p>
                <input type="number" />
            </ul>
            <ul className="coordZ detailInput">
                <p>z</p>
                <input type="number" />
            </ul>
            <ul className="angle detailInput">
                <p>角度</p>
                <input type="number"/>
            </ul>
        </div>
    )
}
