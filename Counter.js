import React, {useEffect, useState,useRef} from "react";
import './App.css';

const Counter = () => {
    const[hour,setHour] = useState(9);
    const[minute,setMinute] = useState(59);
    const[seconds,setSeconds] = useState(59);
    const[isActive,setIsActive] = useState(false);
    const timeOutRef = useRef();

    useEffect(()=>{
        startCountDown();
    },[]);

    useEffect(()=> {
        if(isActive) {
            if(seconds > 0 ) {
                deployTimeout();
            }else {
                setMinute(minute - 1);
            }
        }else {
            if(seconds > 59 || seconds < 0) {
                setSeconds(0);
            }
        }
    },[seconds]);

    useEffect(()=> {
        if(isActive) {
            if(minute > 0) {
                if(seconds == 0) {
                    setSeconds(59);
                }
            }else {
                setHour(hour - 1);
            }
        }else {
            if(minute > 59 || minute < 0) {
                setMinute(0);
            }
        }
    },[minute]);

    useEffect(()=> {
        if(hour > 0 ) {
            setMinute(59);
        }

        if(hour < 0) {
            setHour(0);
        }
    },[hour]);

    const startCountDown = () =>{
        if(seconds) {
            deployTimeout();
        }else {
            setSeconds(59);
            deployTimeout();
        }
    };

    const deployTimeout = () => {
        const timeout = setTimeout(()=> setSeconds(seconds - 1),1000);
        timeOutRef.current = timeout;
        setIsActive(true);
    };

    const removeTimeOut = () => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = null;
        setIsActive(false);
    };

    const toggleTimeOut = () =>{
        if(isActive) {
            removeTimeOut()
        }else {
            startCountDown();
        }
    }
    const changeCountDown = (action,target) => {
        removeTimeOut();

        switch (target) {
            case "hour" :
                action === "increment" ? setHour(hour + 1) : setHour(hour - 1)
                break;
            case "minute" :
                action === "increment" ? setMinute(minute + 1) : setMinute(minute - 1)
                break;
            case "seconds" :
                action === "increment" ? setSeconds(seconds + 1) : setSeconds(seconds - 1)
                break;
        }
    };

    return (
        <div className="container counterBox">
                <div className="time-box">
                    <div className="time">{hour}</div>
                    <div>
                        <button class="timeButton btn btn-success" onClick={()=> changeCountDown("increment","hour")}>+</button>
                        <button class="timeButton btn btn-primary" onClick={()=> changeCountDown("decrement","hour")}>-</button>
                    </div>
                </div>

                <div className="time-box">
                    <div className="time">{minute}</div>
                    <div>
                        <button class="timeButton btn btn-success" onClick={()=> changeCountDown("increment","minute")}>+</button>
                        <button class="timeButton btn btn-primary" onClick={()=> changeCountDown("decrement","minute")}>-</button>
                    </div>
                </div>

                <div className="time-box">
                    <div className="time">{seconds}</div>
                    <div>
                        <button class="timeButton btn btn-success"  onClick={()=> changeCountDown("increment","seconds")}>+</button>
                        <button class="timeButton btn btn-primary" onClick={()=> changeCountDown("decrement","seconds")}>-</button>
                    </div>
                </div>

                <div className="time-box">
                    <button class="btn btn-danger w-100 p-3" onClick={()=> toggleTimeOut()}>
                        {isActive ? "STOP" : "START"}
                    </button>
                </div>
        </div>
    );

}
export default Counter ;