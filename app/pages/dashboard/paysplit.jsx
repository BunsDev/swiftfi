import Link from "next/link.js";
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import styles from "../../styles/Home.module.css";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import Image from "next/image.js";
import gc from "../../assets/giftcard.gif";
import gradient from "../../assets/gc.png";

export default function Paysplit() {
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInputField = () => {
    setArr((add) => {
      return [
        ...add,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((add) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  return (
    <DashboardLayout>
      <div className="w-[90%] mx-auto pt-20">
        <div className="flex flex-col items-center justify-center pt-5 pb-10">
          <h1 className="text-3xl font-semibold ml-3 pb-6 text-center">
            Split Payments
          </h1>

          {/* ${styles.gradient} */}
          <div
            className={`
        w-full flex justify-center items-start flex-wrap flex-row `}
          >
            <div className="bg-gray-50 p-4 rounded-md mx-4 my-6 ">
              <div className=" m-4 flex flex-col justify-center items-center text-center sm:mt-5 sm:ml-4  sm:text-left">
                <div className=" max-w-[600px] flex flex-row flex-wrap justify-center items-center p-2 text-sm text-gray-500">
                  <h1 className="text-xl font-medium leading-6 mr-auto mb-4 text-gray-900 ">
                    Enter Details
                  </h1>

                  {/* amount */}
                  <div className="w-full mt-1 flex flex-wrap items-center justify-between ">
                    <label className="py-3" htmlFor="">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter amount to split..."
                      required
                    />
                  </div>

                  {/* wallet address */}
                  <div className="w-full mt-3 flex flex-wrap items-center justify-between ">
                    <label className="py-3 pb-2" htmlFor="">
                      Wallet Address&#40;s&#41;
                    </label>

                    <div className="w-full flex flex-wrap">
                      {arr.map((item, key) => {
                        return (
                          <input
                            className="bg-gray-50 border mt-3 w-[90%] border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter address to split the amount with..."
                            required
                            onChange={handleChange}
                            value={item.value}
                            key={key}
                            type={item.type}
                          />
                        );
                      })}
                      <Button
                        onClick={addInputField}
                        className=" mt-3 ml-auto"
                        type="submit"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* border */}
                  <div className="w-full mt-8 flex flex-wrap items-start justify-between">
                    <span className="border-t-2 w-full border-gray-300"></span>
                  </div>

                  {/* button */}
                  <div className="w-full mt-4 flex flex-wrap items-start justify-between">
                    <Button className="w-full" type="submit">
                      Split
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
