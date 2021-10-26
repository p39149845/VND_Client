import React from 'react'

export default function VehicleOutputComponent({ handleTv, handleKaraoke, handleGps, handleFood, optional, useForm }) {
    return (
        <div className="card-body" style={{
            display: "flex",
            flexDirection: "row",
            margin: "1%",
            width:"70%",
            border: "1px solid #CACACA",
            borderRadius: "20px",
            position: "sticky",
            maxHeight: "20vh",
            justifyContent:"space-around"

        }}>
            <h1>Setting</h1>
            <div style={{
                marginRight: "5%"
            }}>

                <p className="card-text">จังหวัด : {useForm.country}</p>
                <p className="card-text">จำนวนผู้โดยสาร : {useForm.numberPeople}</p>
                <p className="card-text">เวลาที่ทำการจอง : {useForm.startDate} ถึง {useForm.stopDate}</p>


            </div>
            <h1>Optional</h1>
            <div style={{
                marginRight: "5%"
            }}>

                <div className="form-check">
                    <input className="form-check-input"
                        type="checkbox"
                        value={optional.tv}
                        onChange={handleTv}
                    />
                    <label className="form-check-label">
                        TV
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                        type="checkbox"
                        value={optional.karaoke}
                        onChange={handleKaraoke}
                    />
                    <label className="form-check-label">
                        Karaoke
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                        type="checkbox"
                        value={optional.gps}
                        onChange={handleGps}
                    />
                    <label className="form-check-label">
                        GPS
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                        type="checkbox"
                        value={optional.foodDrink}
                        onChange={handleFood}
                    />
                    <label className="form-check-label">
                        Food & Drink
                    </label>
                </div></div>

        </div>
    )
}
