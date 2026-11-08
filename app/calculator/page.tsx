"use client";

import { useEffect, useState } from "react";
import "./calculator.css";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";

// ใส่ช่องว่างทุก 3 หลัก
const insertSeparator = (str: string, separator = " ", groupSize = 3) => {
  let resultString = "";
  let counter = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    resultString = str[i] + resultString;
    if (i !== 0 && counter % groupSize === groupSize - 1) {
      resultString = separator + resultString;
    }
    counter++;
  }
  return resultString;
};

// บวก ลบ
const calculate = (a: number, b: number, op: string) => {
  let result = a;
  if (op === "+") {
    result = a + b;
  } else if (op === "-") {
    result = a - b;
  }
  return result;
};

export default function Page() {
    const router = useRouter()
    useEffect(() => checkLogin(router, '/calculator'), [router])
  // state (ตัวแปรที่เปลี่ยนหน้าจอ
  const [state, setState] = useState("first");
  const [display, setDisplay] = useState("0");
  const [first, setFirst] = useState(0);
  const [operator, setOperator] = useState("?");
  const [repeatValue, setRepeatValue] = useState(0);
  const [hasRepeat, setHasRepeat] = useState(false);

  // ปุ่มกดตัวเลข
  const numberClick = (num: number) => {
    switch (state) {
      case "first":
        if (display.length < 9) {
          if (display === "0") {
            setDisplay(String(num));
          } else {
            setDisplay(display + String(num));
          }
        }
        break;
      case "operator":
        setDisplay(String(num));
        setState("second");
        break;
      case "second":
        if (display.length < 9) {
          if (display === "0") {
            setDisplay(String(num));
          } else {
            setDisplay(display + String(num));
          }
        }
        break;
    }
  };

  // กดเครื่องหมาย + -
  const operatorClick = (op: string) => {
    let result = 0;
    switch (state) {
      case "first":
        setFirst(Number(display));
        setOperator(op);
        setRepeatValue(0);
        setHasRepeat(false);
        setState("operator");
        break;
      case "operator":
        setOperator(op);
        break;
      case "second":
        result = calculate(first, Number(display), operator);
        setFirst(result);
        setDisplay(String(result));
        setOperator(op);
        setRepeatValue(0);
        setHasRepeat(false);
        setState("operator");
        break;
    }
  };

  // กดเท่ากับ
  const equalClick = () => {
    let result = 0;
    switch (state) {
      case "second":
        result = calculate(first, Number(display), operator);
        setFirst(result);
        setDisplay(String(result));
        setRepeatValue(Number(display));
        setHasRepeat(true);
        setState("first");
        break;
      case "operator":
        if (!hasRepeat) {
          setRepeatValue(first);
          setHasRepeat(true);
          setDisplay(String(first));
        } else {
          result = calculate(first, repeatValue, operator);
          setFirst(result);
          setDisplay(String(result));
        }
        break;
      case "first":
        if (hasRepeat) {
          result = calculate(first, repeatValue, operator);
          setFirst(result);
          setDisplay(String(result));
        }
        break;
    }
  };

  // กด CE
  const ceClick = () => {
    setState("first");
    setDisplay("0");
    setFirst(0);
    setOperator("?");
    setRepeatValue(0);
    setHasRepeat(false);
  };

  // กดปุ่มบนคีย์บอร์ด
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        numberClick(Number(e.key));
      } else if (e.key === "+") {
        operatorClick("+");
      } else if (e.key === "-") {
        operatorClick("-");
      } else if (e.key === "=" || e.key === "Enter") {
        equalClick();
      } else if (e.key === "Escape") {
        ceClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    // calculator container
    <>
      <div className="calculator-body">
        <div className="calculator">
          <div className="outer">
            <div className="inner">
              <div id="screen" className="screen">
                {insertSeparator(display)}
              </div>
              <div className="btn-row">
                <button className="green" disabled>
                  MC
                </button>
                <button className="green" disabled>
                  MR
                </button>
                <button className="green" disabled>
                  M+
                </button>
                <button className="green" disabled>
                  M-
                </button>
                <button className="red" onClick={() => ceClick()}>
                  CE
                </button>
              </div>
              <div className="btn-row">
                <button className="purple" onClick={() => numberClick(7)}>
                  7
                </button>
                <button className="purple" onClick={() => numberClick(8)}>
                  8
                </button>
                <button className="purple" onClick={() => numberClick(9)}>
                  9
                </button>
                <button className="green" disabled>
                  &divide;
                </button>
                <button className="green" disabled>
                  &radic;
                </button>
              </div>
              <div className="btn-row">
                <button className="purple" onClick={() => numberClick(4)}>
                  4
                </button>
                <button className="purple" onClick={() => numberClick(5)}>
                  5
                </button>
                <button className="purple" onClick={() => numberClick(6)}>
                  6
                </button>
                <button className="green" disabled>
                  &times;
                </button>
                <button className="green" disabled>
                  %
                </button>
              </div>
              <div className="btn-row">
                <button className="purple" onClick={() => numberClick(1)}>
                  1
                </button>
                <button className="purple" onClick={() => numberClick(2)}>
                  2
                </button>
                <button className="purple" onClick={() => numberClick(3)}>
                  3
                </button>
                <button className="green" onClick={() => operatorClick("-")}>
                  &minus;
                </button>
                <button className="green" disabled>
                  1/x
                </button>
              </div>
              <div className="btn-row">
                <button className="purple" onClick={() => numberClick(0)}>
                  0
                </button>
                <button className="purple" disabled>
                  .
                </button>
                <button className="purple" disabled>
                  &plusmn;
                </button>
                <button className="green" onClick={() => operatorClick("+")}>
                  +
                </button>
                <button className="green" onClick={() => equalClick()}>
                  =
                </button>
              </div>
            </div>
            <div className="student">68066986 บุลากร หอมพันธุ์</div>
          </div>
        </div>
      </div>
    </>
  );
}
