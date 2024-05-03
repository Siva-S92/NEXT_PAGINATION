"use client";
import Image from "next/image";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalpages, setTotalPages] = useState(1);

  const fetchApi = async () => {
    try {
      let formData = {
        page,
        search
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/products`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json();
      if(responseData.success){
        setTotalPages(responseData.totalPages);
        setAllProducts(responseData.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApi();
    console.log(allProducts);
  }, [page, search]);

  return (
    <main className="max-w-7xl mx-auto">
      <form className="flex justify-center items-center">
        <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="search" value={search}  className="w-[40%] h-[35px] px-2 my-5 outline-none border border-gray-300 rounded-l-md"/>
        <button type="button" className="w-fit h-[35px] bg-gray-400 rounded-r-md px-2">Search</button>
      </form>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {allProducts.map((product) => (
          <div key={product._id}>
            <Card product={product} />
          </div>
        ))}
      </div>
      <div className="flex justify-center py-4">
        <Stack spacing={2}>
          <Pagination count={totalpages} color="primary" 
            onChange={
              (e, value)=> {
                if(value !== null){
                  setPage(value)
                }
              }
            } 
          />
        </Stack>
      </div>
    </main>
  );
}
