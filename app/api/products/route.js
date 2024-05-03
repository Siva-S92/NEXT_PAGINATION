import { NextResponse } from "next/server";
import connectMongoDB from "../../../src/utils/mongoConnect";
import Product from "../../../src/models/product";


export async function POST(request) {
  try {
    connectMongoDB();
    const reqObj = await request.json();
    const page = parseInt(reqObj.page) || 1;
    const limit = 2;
    let query = {};

    if (reqObj.search) {
      const search = reqObj.search;
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ],
      };
    }

    

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    return NextResponse.json(
      {
        success: true,
        msg: "Products",
        data: products,
        page,
        nextPage,
        totalProducts,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        page,
      },
      { status: 500 }
    );
  }
}
